const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    fullname : String,
    uname : {
      type : String,
      unique : true
    },
    contact: String,
    email : String,
    password : String,
  });

  const USER = mongoose.model("user", userSchema);

module.exports = USER;