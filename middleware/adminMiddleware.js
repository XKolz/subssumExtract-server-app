// const User = require('../models/User');

// module.exports = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
    
//     if (user && user.role === 'admin') { // Assuming there's a role field to check admin status
//       return next();
//     }
    
//     res.status(403).json({ msg: 'Access denied' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };


const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
