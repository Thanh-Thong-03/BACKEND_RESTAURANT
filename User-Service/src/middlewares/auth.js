const jwt = require("jsonwebtoken");

const authMiddleware = {

    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if(err){
                    return res.status(403).json("Token is not valid")
                }
                req.user = user;
                console.log(req.user)
                next();
            })
        }
        else {
            res.status(401).json("You are not authenticated")
        }
    },

    verifyTokenAndAdminAuth: (req, res, next) => {
        authMiddleware.verifyToken(req, res, () => {
            const role = req.user.role;
            console.log('Role:' + role)
            if(role == "Admin"){
                next();
            }
            else {
                res.status(403).json("You are not Admin")
            }
        })
    }
}

module.exports = authMiddleware;