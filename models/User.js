const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  googleId: { type: String, unique: true, sparse: true },
  progress: { type: Object, default: {} },
  chatHistory: { type: Array, default: [] }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

module.exports = (req, res, next) => {
  // Теперь проверяем isAdmin вместо role
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403).json({ 
    error: 'Требуются права администратора',
    code: 'ADMIN_ACCESS_DENIED'
  });
};