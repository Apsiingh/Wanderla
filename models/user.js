const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

// hashing algo used in passport PBKDF2
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
