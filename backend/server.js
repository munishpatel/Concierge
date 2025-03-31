const express = require('express');
const { Pool } = require('pg'); // Changed from sqlite3 to pg
const bcrypt = require('bcrypt');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));

// PostgreSQL Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false, require: true } : false, 
});

// Test database connection
pool.query('SELECT NOW()', (err) => {
  if (err) console.error('Error connecting to PostgreSQL:', err);
  else console.log('Connected to PostgreSQL database');
});

// Hardcoded restaurant data
let restaurants = [
  { id: 1, name: "Restaurant A", image: "/images/image1.jpeg", reserved: false },
  { id: 2, name: "Restaurant B", image: "/images/image2.jpeg", reserved: false },
  { id: 3, name: "Restaurant C", image: "/images/image3.jpeg", reserved: false },
  { id: 4, name: "Restaurant D", image: "/images/image4.jpeg", reserved: false },
  { id: 5, name: "Restaurant E", image: "/images/image5.jpeg", reserved: false },
  { id: 6, name: "Restaurant F", image: "/images/image6.jpeg", reserved: false },
];

// Register Route (Updated for PostgreSQL)
app.post('/register', async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user exists
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE email = $1', 
      [email]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Insert new user
    await pool.query(
      'INSERT INTO users (name, phone, email, password) VALUES ($1, $2, $3, $4)',
      [name, phone, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route (Updated for PostgreSQL)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ 
      message: 'Login successful', 
      user: { id: user.id, name: user.name, email: user.email } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch available restaurants (Updated URL construction)
app.get("/api/restaurants", (req, res) => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.headers['x-forwarded-host'] || req.get('host');
  const updatedRestaurants = restaurants.map(restaurant => ({
    ...restaurant,
    image: `${protocol}://${host}${restaurant.image}`,
  }));
  res.json(updatedRestaurants);
});

// Create HTTP server and WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ 
  server,
  path: "/ws" // Explicit WebSocket path
});

// WebSocket connection
wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    try {
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
    } catch (err) {
      console.error('WebSocket message error:', err);
    }
  });

  // Send initial restaurant list to the client
  ws.send(JSON.stringify(restaurants));

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`HTTP: http://localhost:${PORT}`);
    console.log(`WebSocket: ws://localhost:${PORT}/ws`);
  }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    pool.end();
    console.log('Server closed');
    process.exit(0);
  });
});