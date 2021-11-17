const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pokemon = new Schema({
  name: String, 
});

module.exports = mongoose.model("Pokemon", Pokemon);
