// Connect to the Socket.IO server
// Ensure input field is focused when the app loads
document.getElementById('messageInput').focus();

// Get the room
function getRoom(){
    const link = window.location.toString().split('/');
    return result = link[link.length-1];
};
const room = getRoom();


// Get Session ID
function sesID(arg){
    let result='';
    const sess = document.cookie.split(';');
    sess.forEach((value)=>{
        const [key,val] = value.split('=');
        if(arg.trim()===key.trim()){           
            return result = val;
        }
    });
    return result;
};

const uid = sesID(room); // keep the session ID

// Allert users when they are disconnected or connected.
function onOF(allert){
    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML += `<div class="allert">• ${allert}</div>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
};

// Allert you that you are connected.
function conn(conn){
    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML += `<div class="conn">• ${conn}</div>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
};

// Using the Socket.IO client library
const socket = io(); 

socket.on("connect", () => {
    socket.emit('sessionID',uid);  // on connect send the session id to the backend.
    const msg = "you are Connected now.";
    conn(msg);
});

// Alert user that the other client disconnected.
socket.on('off',()=>{
    const msg ='He is disconnected now, do not send messages, he won`t see it.';
    onOF(msg);
});

// Alert user that the other client has connected.
socket.on('on',()=>{
    const msg = 'He is connected now, you can send messages';
    onOF(msg);
});


// Handle errors
socket.on("error", (error) => {
    console.log("Socket.IO error:", error);
});
