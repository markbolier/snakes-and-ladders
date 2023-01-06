const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 3001
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000"
  }
});

app.use(cors())
let users = []

io.on('connection', socket => {
  console.log(`connect: ${socket.id}`);

  // define all your events here

  socket.on('hello!', () => {
    console.log(`hello from ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

setInterval(() => {
  io.emit('message', new Date().toISOString());
}, 1000);
