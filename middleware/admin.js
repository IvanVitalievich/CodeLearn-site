module.exports = (req, res, next) => {
  // Изменили проверку на isAdmin
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403).json({ 
    error: 'Требуются права администратора',
    code: 'ADMIN_ACCESS_DENIED'
  });
};