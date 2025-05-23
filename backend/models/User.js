const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email est requis'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Mot de passe est requis'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  phone: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
