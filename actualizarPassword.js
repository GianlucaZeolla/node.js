// archivo: actualizarPassword.js
require('dotenv').config(); 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./Models/user.model');


mongoose.connect(process.env.MONGODB_URI);

/*
async function actualizarPassword() {
  const users = await User.find({});
  console.log('Usuarios encontrados:', users);

  const user = await User.findOne({ email: 'gian@example.com' });
  if (user) {
    user.password = await bcrypt.hash('password+1', 10);
    await user.save();
    console.log('Contraseña actualizada y hasheada');
  } else {
    console.log('Usuario no encontrado');
  }
  mongoose.disconnect();
}
*/

// actualizarPassword();