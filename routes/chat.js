const express = require('express');
const {chat_controller} = require('../controllers/chat_controller'); 
const router = express.Router();


router.get('/', chat_controller);
module.exports = router;