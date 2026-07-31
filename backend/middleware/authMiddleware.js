const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {



    try {

        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id);


            if (!user) {
                return res.status(401).json({
                    message: "User not found",
                });
            }

            if (user.isBlocked) {
                return res.status(403).json({
                    message: "Your account has been blocked. Please contact the administrator."
                });
            }

            req.user = user;

            next();

        } else {
            return res.status(401).json({
                message: "Not authorized, no token"
            });
        }

    } catch (error) {
        return res.status(401).json({
            message: "Not authorized, token failed"
        });
    }

}


const adminOnly = async (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admin only."
        });
    }

    next();

}



module.exports = { protect, adminOnly }