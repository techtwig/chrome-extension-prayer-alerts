const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {path: "/socket.io/"});

// Middleware to attach io to req object
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get('/', function(req, res) {
    const io = req.io;
    io.emit("notification", "hello world")
    res.end("Hello");
});

io.on("connection", (socket) => {
    console.log("connected")
});

httpServer.listen(3000, () => {
    console.log("server started at port 3000");
});