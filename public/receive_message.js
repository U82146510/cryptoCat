// get the secret key from server;
let secretKey='';
socket.on('U82146510',(data)=>{
    try {
        if(!data) return console.log('No secret key');
        secretKey = data;
    } catch (error) {
        console.log(error);
    }
});



const salt = crypto.getRandomValues(new Uint8Array(16)); // Generate random salt


// Listen for messages from the server
socket.on("toClient", async (message) => {
    try {
        // Derive the key using the received salt (decoded from Base64)
        const salt = new Uint8Array(
            atob(message.salt)
                .split('')
                .map((char) => char.charCodeAt(0))
        );
        const key = await deriveKey(secretKey, salt);

        // Decrypt the received ciphertext
        const decrypted = await decryptString(
            {
                ciphertext: message.ciphertext,
                iv: message.iv
            },
            key
        );

        // Append the new decrypted message to the message area
        const messagesDiv = document.getElementById("messages");
        messagesDiv.innerHTML += `<div class="message">Him: ${decrypted}</div>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
     } catch (error) {
        console.error("Error receiving or decrypting message:", error);
    }
});