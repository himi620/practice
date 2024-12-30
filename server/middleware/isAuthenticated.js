import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthenticated",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthenticated",
      });
    }

    req.Id = decoded.userId;
    next();
  } catch (error) {
    console.error("Error in authentication:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default isAuthenticated;
