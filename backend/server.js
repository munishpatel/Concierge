// backend/server.js
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());

// MySQL Connection Configuration
const pool = mysql.createPool({
  host: 'localhost', // or your MySQL host
  user: 'root',
  password: 'admin@2024',
  database: 'Concierge',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Register Route
app.post('/register', async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    await pool.query('INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)', [
      name,
      phone,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

