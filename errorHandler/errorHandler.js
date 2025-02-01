const errorHandler = (err,req,res,next)=>{
    console.log(err.stack);
    res.status(err.status || 500).json({message:'Internal Server Error',error:err.message});
};

module.exports = errorHandler;