const next=(error)=>{
    console.log(error);
    socket.emit("error",error)
}

module.exports=next;