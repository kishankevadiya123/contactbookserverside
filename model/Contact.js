const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const contactSchema = new Schema({
    fullname : String,
    contact : String,
    city : String,
    country : String,
    uid : String
  });

  const CONTACT = mongoose.model("contact", contactSchema);

module.exports = CONTACT;