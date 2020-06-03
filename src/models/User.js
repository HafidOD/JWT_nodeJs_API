const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  userName: String,
  email: String,
  password: String
});

userSchema.methods.encryptPassword = async (password) => {
  let salt = await bcrypt.genSalt(10); //aplicacion de las veces del algoritmo
  return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = function(password){
  return bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);