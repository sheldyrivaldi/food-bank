const jwt = require('jsonwebtoken');

const checkRole = (role) => {
    return (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (decoded.role === role || role.includes(decoded.role)) {
        // Role user sesuai, lanjutkan ke endpoint
        next();
      } else {
        // Role user tidak sesuai, kirim response error
        res.status(403).json({
            message: 'Not Authorized'
        });
      }
    };
  };


  module.exports = checkRole;