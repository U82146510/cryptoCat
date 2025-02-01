
const {createToken} = require('../utils/jwt');
const {get_address} = require('../utils/set_get_room_address');
const dotenv = require('dotenv');
dotenv.config();


const chat_controller = (req, res, next) => {
    try {
        const room = get_address();
        const myCookie = req.cookies[room];
    
        if(!myCookie){
            const token = createToken(room);
            res.cookie(room,token,{expires:new Date(Date.now() + 3600000)});
        }
        res.render('chat');
    } catch (error) {
        next(error);
    }
};

module.exports={chat_controller};