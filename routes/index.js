const express = require('express');
const router = express.Router();
const chatApp = require('../routes/chat');
const {index_page,create_and_id} = require('../controllers/index_controller');


router.get('/',index_page);
router.post('/',create_and_id);
router.use('/chat/:address',chatApp);

module.exports = router;