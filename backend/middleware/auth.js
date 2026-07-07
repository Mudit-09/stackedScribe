const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Look for the token in the request headers
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    try {
        // Verify the token using our secret key from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the user object data to the request so routes can see WHO is logged in
        req.user = decoded;
        
        next(); // Move to the next function/route
    } catch (err) {
        res.status(401).json({ message: 'Token is invalid or expired.' });
    }
};

module.exports = authMiddleware;