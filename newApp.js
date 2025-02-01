const https = require("https");
const fs = require("fs");
const express = require("express");
const path = require("path");
const cors = require("cors");
const socketIo = require("socket.io");
const socket_handler = require("./socket/socket");
const index_handler = require("./routes/index");
const cookieParser = require("cookie-parser");
const errorHandler = require('./errorHandler/errorHandler');

const app = express();
const httpsPort = 443; // HTTPS Port
const httpPort = 80;  // HTTP Port for redirection

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.use("/", index_handler); // Index page

// HTTPS Server Configuration
const options = {
    key: fs.readFileSync("/etc/letsencrypt/live/cryptnode.ddns.net/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/cryptnode.ddns.net/fullchain.pem"),
};

const httpsServer = https.createServer(options, app);

// Socket.IO Server
const io = socketIo(httpsServer);

// Handle Socket.IO connections
socket_handler(io);

//Error Handler
app.use(errorHandler);

// Start HTTPS Server
httpsServer.listen(httpsPort, "0.0.0.0", () => {
    console.log(`HTTPS server is running on https://cryptnode.ddns.net`);
});

// Redirect HTTP to HTTPS
const httpApp = express();
httpApp.use((req, res) => {
    res.redirect(`https://${req.headers.host}${req.url}`);
});

httpApp.listen(httpPort, "0.0.0.0", () => {
    console.log("HTTP to HTTPS redirection is enabled on http://cryptnode.ddns.net");
});
