const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Защищаем все роуты авторизацией
router.use(authMiddleware);

// Получение профиля
router.get('/profile', userController.getProfile);

// Обновление профиля
router.patch('/profile', userController.updateProfile);

module.exports = router;