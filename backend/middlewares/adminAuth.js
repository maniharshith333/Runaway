import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No Authorization. Login again." });
    }

    const token = authHeader.split(" ")[1]; // Remove "Bearer "
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure it's the admin email
    if (decoded.email !== process.env.ADMIN_MAIL) {
      return res.status(403).json({ success: false, message: "Access denied. Not an admin." });
    }

    req.admin = decoded; // optional: attach decoded data to request
    next();
    
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;
