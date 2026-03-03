import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const db = new Database("robotics.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    name TEXT,
    password TEXT,
    subscription TEXT DEFAULT 'free'
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    category TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS code_listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT,
    description TEXT,
    price REAL,
    category TEXT,
    code_content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    item_id INTEGER,
    item_type TEXT, -- 'product' or 'code'
    amount REAL,
    status TEXT DEFAULT 'completed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS ai_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    prompt TEXT,
    response TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Seed Products
  INSERT OR IGNORE INTO products (id, name, description, price, category, image_url) VALUES 
  (1, 'Alvyon Core ESP32 Kit', 'Advanced robotics controller with built-in AI debugging support.', 49.99, 'Controllers', 'https://picsum.photos/seed/esp32/400/300'),
  (2, 'Lidar Pro Scanner', 'High-precision 360-degree laser range scanner for SLAM.', 129.99, 'Sensors', 'https://picsum.photos/seed/lidar/400/300'),
  (3, 'Titan Servo Motor', 'High-torque digital servo for heavy-duty robotic arms.', 24.99, 'Actuators', 'https://picsum.photos/seed/servo/400/300'),
  (4, 'AI Vision Module', 'Neural network powered camera module for object detection.', 79.99, 'Sensors', 'https://picsum.photos/seed/camera/400/300'),
  (5, 'Mecanum Wheel Set', 'Professional omnidirectional wheels for mobile robots.', 59.99, 'Mechanical', 'https://picsum.photos/seed/wheel/400/300'),
  (6, '6-DOF Robotic Arm Kit', 'Complete aluminum robotic arm with 6 high-torque servos.', 199.99, 'Kits', 'https://picsum.photos/seed/arm/400/300');

  -- Seed Code Listings
  INSERT OR IGNORE INTO code_listings (id, title, description, price, category, code_content) VALUES
  (1, 'Autonomous Maze Solver', 'Complete PID-based maze solving algorithm for Arduino.', 9.99, 'Arduino', '// Maze solver code...'),
  (2, 'ESP32 Web Server Control', 'Futuristic web interface for controlling robots over WiFi.', 14.99, 'ESP32', '// Web server code...'),
  (3, 'Computer Vision Object Tracking', 'Python/OpenCV script for tracking objects with a robotic arm.', 19.99, 'Raspberry Pi', '# CV tracking code...'),
  (4, 'Voice Controlled Robot BD', 'Bangla voice command integration for robotics projects.', 24.99, 'Raspberry Pi', '# Voice control code...');
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Auth API
  app.post("/api/auth/signup", (req, res) => {
    const { name, email, password } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
      const result = stmt.run(name, email, password);
      res.json({ success: true, userId: result.lastInsertRowid });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password) as any;
    if (user) {
      res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Marketplace API
  app.get("/api/marketplace/code", (req, res) => {
    const listings = db.prepare("SELECT * FROM code_listings").all();
    res.json(listings);
  });

  app.post("/api/marketplace/purchase", (req, res) => {
    const { itemId, itemType, userId, amount } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO orders (user_id, item_id, item_type, amount) VALUES (?, ?, ?, ?)");
      const result = stmt.run(userId || 1, itemId, itemType, amount);
      res.json({ success: true, orderId: result.lastInsertRowid });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Products API
  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
