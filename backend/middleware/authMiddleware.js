import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";

// Protect routes. Check if there's a JWT, if yes, auth the user by populate req.user
const protect = asyncHandler( async (req, res, next) => {
    
    const token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized. Token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized. Token not detected");
    }
})

// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403);
        throw new Error("Admin access required!");
    }
}

export { protect, admin };