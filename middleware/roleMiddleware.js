const User = require('../models/user');

exports.requireEmployerRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'employer') {
      return res.status(403).json({ msg: 'Access denied: Employer role required' });
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.requirePlacementOfficerRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'placementOfficer') {
      return res.status(403).json({ msg: 'Access denied: Placement Officer role required' });
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
