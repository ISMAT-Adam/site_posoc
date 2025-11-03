// createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Modèle simplifié (on ne veut pas charger tout le projet)
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, default: 'admin' }
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
const User = mongoose.model('User', userSchema);

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const adminEmail = 'posoc@gmail.com';
  const adminPassword = 'jerry@6632';

  const existing = await User.findOne({ email: adminEmail });
  if (existing) {
    console.log('✅ Admin existe déjà.');
  } else {
    const admin = new User({ email: adminEmail, password: adminPassword, role: 'admin' });
    await admin.save();
    console.log('✅ Compte admin créé :');
    console.log('   Email : posoc@gmail.com');
    console.log('   Mot de passe : jerry@6632');
  }

  await mongoose.disconnect();
}

createAdmin().catch(console.error);