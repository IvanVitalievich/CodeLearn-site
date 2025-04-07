// controllers/userController.js
exports.getProfile = (req, res) => {
  res.json({
    user: req.user,
    message: "Профиль пользователя"
  });
};

exports.updateProfile = (req, res) => {
  res.json({ message: "Профиль обновлён" });
};