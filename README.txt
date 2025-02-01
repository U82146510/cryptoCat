# Cryptocat

Cryptocat is a peer-to-peer (P2P) synchronous web-based crypto chat application. It allows users to generate a unique link and share it with someone else for a private, text-based, real-time chat. Cryptocat is designed to be used alongside other social media apps to enhance private communication.

## Features

- **P2P Synchronous Chat:** Quickly generate a unique chat link and share it to start a private conversation.
- **Real-Time Messaging:** Enjoy seamless text-based communication without delays.
- **Flexible Deployment:**  
  - **Local Deployment:** Use `app.js` for development and local testing.
  - **Production Deployment:** Use `newApp.js` for a secure, production-ready setup.
- **Customizable Security:** Replace the default HTTPS certificates with your own for production deployments.

## Prerequisites

- [Node.js](https://nodejs.org/) (v10 or later recommended)
- npm (Node Package Manager, comes with Node.js)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/U82146510/cryptocat.git
   cd cryptocat
2.Install Dependencies:
npm install

3.Usage
-Local Deployment

For local development or testing, start the application using app.js:
node app.js

Open your browser and navigate to http://localhost:3000 (or the configured port) to start chatting.

-Production Deployment

    For production, use newApp.js to enable HTTPS support:

    Configure HTTPS Certificates:
    In newApp.js, replace the placeholder "key" and "cert" with your own HTTPS certificate and private key.

    Start the Application:
    node newApp.js

-Configuration

    Port:
    The default port is set to 3000. You can modify this setting within your configuration files if needed.

    HTTPS Certificates (Production):
    Ensure that in newApp.js you have updated the "key" and "cert" fields with your actual certificate files to run Cryptocat over HTTPS.
