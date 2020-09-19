module.exports = function(req,res,next){
    if(req.cookies.usuarioAvalon != undefined){
        req.session.user = req.cookies.usuarioAvalon;
        next()
    }else{
        next()
    }
}