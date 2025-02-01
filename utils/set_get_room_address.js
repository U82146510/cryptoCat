let roomID = '';

module.exports = {
    get_address: () => roomID,
    set_address: (newAddress) => { roomID = newAddress; },
};