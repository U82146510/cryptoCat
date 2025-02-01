const express = require("express");
const path = require("path");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const socketHandler = require('./socket/socket');
const indexHandler = require('./routes/index');
const cookieParser = require('cookie-parser');
const errorHandler = require('./errorHandler/errorHandler');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server
const io = socketIo(server);

// Handle Socket.IO connections
socketHandler(io);

// Handle Routes
app.use('/',indexHandler); // Index page

//Error Handler
app.use(errorHandler);

// Listen on the same server instance
server.listen(port,'0.0.0.0',() => {
    console.log(`Server is running on http://localhost:${port}`);
});