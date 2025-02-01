const crypto = require('crypto');
const generateSessionKey = () => crypto.randomBytes(32).toString('hex');
module.exports = generateSessionKey;