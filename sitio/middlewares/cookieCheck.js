const dbUsers = require('../data/databaseUsuarios');

module.exports = function(req,res,next){
    if(req.cookies.userAvalon){
        req.session.user = req.cookies.userAvalon;
        next()
    }else{
        next()
    }
}