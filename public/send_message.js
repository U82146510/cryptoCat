// Send messages to client
async function send() {
    try {
        // Derive the key
        const key = await deriveKey(secretKey, salt);

        // Get the input message
        const messageInput = document.getElementById("messageInput");
        const message = messageInput.value;

        if (!message) {
            console.warn("Message input is empty. Aborting send.");
            return; // Do nothing if the message is empty
        }

        // Encrypt the message
        const encrypted = await encryptString(message, key);

        // Prepare the message object to send
        const sendMSG = {
            ciphertext: encrypted.ciphertext,
            iv: encrypted.iv,
            salt: btoa(String.fromCharCode(...salt)), // Encode salt in Base64
        };

        // Append the message to the user's chat area
        const myMessage = document.getElementById("messages");
        myMessage.innerHTML += `<div class="myMessage">Me: ${message}</div>`; // Use the myMessage class
        myMessage.scrollTop = myMessage.scrollHeight; // Scroll to the bottom

        // Send the message to the server
        socket.emit("message", uid, sendMSG);

        // Clear the input field
        messageInput.value = "";
    } catch (error) {
        console.error("Error sending the message:", error);
        alert("Failed to send the message. Please try again.");
    }
};


// Call the send function when Enter is pressed
function press_enter_to_send_msg(event) {
    if (event.key === 'Enter') {
        send(); 
    }
}


document.getElementById('sendButton').addEventListener('click',send);
document.getElementById('messageInput').addEventListener('keypress', press_enter_to_send_msg);
