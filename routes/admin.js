const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/admin');
const User = require('../models/User');

// Применяем ко всем роутам
router.use(isAdmin);

// Тестовый эндпоинт
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Вы администратор!',
    user: {
      id: req.user._id,
      email: req.user.email,
      isAdmin: req.user.isAdmin
    }
  });
});

module.exports = router;