const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  googleid: String,
  email: String,
  ownedWorlds: [String]
})

// compile model from schema
module.exports = mongoose.model('user', UserSchema)
