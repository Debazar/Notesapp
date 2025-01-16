import jwt from "jsonwebtoken";
import User from "../models/User.js";

const middleware = async (req, res, next) => {
  try {
    // Extract token from the authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Unauthorized access: No token provided",
        });
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, "secretkeyofnoteapp@123");
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }

    // Find the user in the database
    let user;
    try {
      user = await User.findById(decoded.id);
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    // Attach user info to the request object
    req.user = { name: user.name, id: user._id };

    // Pass control to the next middleware
    next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return res.status(500).json({ success: false, message: "Please Login" });
  }
};

export default middleware;
