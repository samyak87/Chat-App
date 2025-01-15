import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({message: "Unauthorized-no token provided"});
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({message: "Unauthorized-token verification failed"});
        }   

        const user = await User.findById(decoded.userId);

        if(!user) {
            return res.status(401).json({message: "Unauthorized-user not found"});
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export default protectRoute;