const wildLife = require('../services/wildLife');
module.exports =() => (req,res, next) => {
    req.storage = {
        ...wildLife
     };
     next();
}