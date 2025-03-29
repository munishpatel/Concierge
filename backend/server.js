const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const cors = require('cors');
const http = require('http'); // Import HTTP module
const WebSocket = require('ws'); // Import WebSocket module

const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));

// SQLite Database Connection
const db = new sqlite3.Database('./concierge.db', (err) => {
  if (err) console.error('Error opening database:', err.message);
  else console.log('Connected to SQLite database.'); 
});

// Create users table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

// Hardcoded restaurant data
let restaurants = [
  { id: 1, name: "Restaurant A", image: "/images/image1.jpeg", reserved: false },
  { id: 2, name: "Restaurant B", image: "/images/image2.jpeg", reserved: false },
  { id: 3, name: "Restaurant C", image: "/images/image3.jpeg", reserved: false },
  { id: 4, name: "Restaurant D", image: "/images/image4.jpeg", reserved: false },
  { id: 5, name: "Restaurant E", image: "/images/image5.jpeg", reserved: false },
  { id: 6, name: "Restaurant F", image: "/images/image6.jpeg", reserved: false },
];

// Register Route
app.post('/register', async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, existingUser) => {
      if (existingUser) return res.status(400).json({ message: 'Email already exists' });

      db.run(
        'INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)',
        [name, phone, email, hashedPassword],
        (insertErr) => {
          if (insertErr) {
            console.error('Error inserting user:', insertErr);
            return res.status(500).json({ message: 'Internal server error' });
          }
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  });
});

// Fetch available restaurants
app.get("/api/restaurants", (req, res) => {
  const updatedRestaurants = restaurants.map(restaurant => ({
      ...restaurant,
      image: `http://localhost:${port}${restaurant.image}`, // Ensure full URL
  }));
  res.json(updatedRestaurants);
});

// Create HTTP server and WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server }); // Attach WebSocket server to HTTP server

// WebSocket connection
wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    const { type, restaurantName } = JSON.parse(message);

    if (type === "RESERVE") {
      // Update restaurant reservation status
      restaurants = restaurants.map((restaurant) =>
        restaurant.name === restaurantName
          ? { ...restaurant, reserved: true }
          : restaurant
      );

      // Broadcast updated restaurant list to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(restaurants));
        }
      });
    }
  });

  // Send initial restaurant list to the client
  ws.send(JSON.stringify(restaurants));

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});