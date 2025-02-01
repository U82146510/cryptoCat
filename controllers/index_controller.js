const {set_address} = require('../utils/set_get_room_address');

const index_page = (req, res) => {
    res.render('index');
};

const create_and_id=(req,res,next)=>{
    try {
        const address = Math.round(Math.random()*100000000).toString();
        set_address(address);
        res.redirect(`chat/${address}`);
    } catch (error) {
        next(error);
    }
};

module.exports = {index_page,create_and_id};
