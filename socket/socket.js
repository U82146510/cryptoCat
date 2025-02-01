const roomDB = new Map(); // A DB of all rooms.
const dotenv = require('dotenv');
const {verifyToken} = require('../utils/jwt.js');
const generateKey = require('../utils/generate_a_secret_key.js');
const {get_address} = require('../utils/set_get_room_address.js');
const next = require('../errorHandler/socket_error_handler.js');
const secretKey = generateKey();
dotenv.config();



module.exports = function(io){
    io.on("connection", (socket) => {
        try {
            const address = get_address();
            if(!address) return next('address was not provided');
            socket.emit('U82146510',secretKey+address);
            console.log(`User Connected: ${socket.id}`);            
        } catch (error) {
            next(error);
        }

        // check if the socket belong to that room.
        function check_room(arg){
            const isPartOfRoom = Array.from(socket.rooms).includes(arg);
            if(!isPartOfRoom){
                socket.join(arg);
            }
        };
        

        // join the room if there is less than 2 people.
        function join_room(arg,room){    

            // check if the room exist if not create one.       
            if(!roomDB.get(room)){ 
                roomDB.set(room,[]);
            }
            // Emit an event once you are connected back.
            io.to(room).emit('on'); 
            const participants = roomDB.get(room);
            if(participants.length < 2){
                roomDB.get(room).push(arg);
                socket.join(room);            
            }

            // join the room if you are a part of room and got disconnected.
            if(roomDB.get(room).includes(arg)){
                socket.join(room);
            }
        };

        // Get the session ID
        socket.on('sessionID',(data)=>{
            try {
                socket.the_room_address = verifyToken(data);
                if(!socket.the_room_address) throw new Error("Invalid Token");
                join_room(data,socket.the_room_address);                
            } catch (error) {
                console.error("Error in join_room:", err.message);
            }
        });

        
        // Handle incoming messages
        socket.on("message", (sessionID,message) => {
            try {
                if (typeof message !== "object" || !sessionID) return;
                
                const its = verifyToken(sessionID);
                if(!its) throw new Error("Invalid Token");

                const isPartOfTheRoom = roomDB.get(its)?.includes(sessionID);
                const size = io.sockets.adapter.rooms.get(its)?.size || 0;
                
                if(isPartOfTheRoom && size<=2){
                    check_room(its);
                    if(message.ciphertext&&message.iv&&message.salt){
                        socket.to(its).emit('toClient',{ciphertext:message.ciphertext,iv:message.iv,salt:message.salt});
                    }
                }else{
                    console.error("Invalid message format:", message);
                }
                
            } catch (error) {
                console.error("Error in message handler:", error.message);
            }
        });
    
        // Handle disconnected connections.
        socket.on("disconnect", () => {
            io.to(socket.the_room_address).emit('off');
            socket.leave(socket.the_room_address);
        });

    });
};