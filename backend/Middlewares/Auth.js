

const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    // Log the Authorization header for debugging
    console.log('Authorization Header:', req.headers['authorization']);
    
    
    const auth = req.headers['authorization']; // Make sure this is defined correctly
    if (!auth) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
    }

    // Split the token from the header if it's in "Bearer <token>" format
    const token = auth.split(' ')[1]; // Ensure this line is present

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user to the request
        next(); // Call next middleware
    } catch (err) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is wrong or expired' });
    }
};

module.exports = ensureAuthenticated;
