// controllers/adminController.js
exports.getDashboard = (req, res) => {
    res.json({ message: 'Admin dashboard' });
  };
  
  exports.adminAction = (req, res) => {
    res.json({ message: 'Admin action performed' });
  };