module.exports.home = function(req,res,next){
    return res.end('<h1>Express is ready</h1>');
    next();
}