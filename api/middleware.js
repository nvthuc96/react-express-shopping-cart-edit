const jwt = require('jsonwebtoken');

const JWT_SECRET = "jwt_secret_password";

module.exports = (req, res, next) => {
    //check header parameter or url parameter or post parameter for token
    var token = req.body['x-access-token'] || req.query['x-access-token'] || req.header['x-access-token'];

    //decode token
    if(token) {
        //verifeies secret and check exp
        jwt.verify(token, JWT_SECRET, function(err, decoded) {
            if(err) {
                return res.status(403).send({
                    success: false,
                    message: "Fail to authentication token"
                });
            } else {
                //if everything good, save to request for user in route other
                req.decoded = decoded;
                next();
            }
        });
    } else {
        //if no token, return error
        return res.status(401).send({
            success: false,
            message:"no token provided"
        });
    }
};
