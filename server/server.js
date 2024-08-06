const express = require("express");
var cors = require("cors");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// MongoDB connection URL and database name
const url = process.env.MONGODB_URI; // Connection string from MongoDB Atlas
const dbName = process.env.MONGODB_DATABASE; // Replace with your database name

let db;

// Middleware to parse JSON bodies
app.use(express.json());

const corsOptions = {
  origin: process.env.CORS_ORIGIN_URI, // your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // allow session cookies from browser to pass through
  optionsSuccessStatus: 204,
};
app.use(cors());

// Connect to MongoDB
MongoClient.connect(url, {})
  .then((client) => {
    console.log("MongoDB connected successfully.");
    db = client.db(dbName);
  })
  .catch((error) => console.error(error));

// GET endpoint
app.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

// GET endpoint to retrieve projects
app.get("/projects", async (req, res) => {
  try {
    const projectsCollection = db.collection("projects");
    const projects = await projectsCollection.find().toArray();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
// POST endpoint to add a new project
app.post("/projects", async (req, res) => {
  try {
    const newProject = req.body;
    const projectsCollection = db.collection("projects");
    const result = await projectsCollection.insertOne(newProject);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Dummy user data
const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

// GET endpoint to retrieve users
app.get("/users", (req, res) => {
  res.json(users);
});

// POST endpoint to add a new user
app.post("/users", (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1; // Simple ID generation
  users.push(newUser);
  res.status(200).json(newUser);
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // Serve the React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}

// Error Handling for Uncaught Exceptions
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

// Node.js server without express.js
// const { createServer } = require("node:http");

// const hostname = "127.0.0.1";
// const port = 5000;

// const server = createServer((req, res) => {
// res.statusCode = 200;
// res.setHeader("Content-Type", "text/plain");
// res.end("Hello World");
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
