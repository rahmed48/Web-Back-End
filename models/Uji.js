const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ujiSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [],
  correct_option: {
    type: String,
    required: true,
  },
  materiId: {
    type: ObjectId,
    ref: "Materi",
  },
});

module.exports = mongoose.model("Uji", ujiSchema);
