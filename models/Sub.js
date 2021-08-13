const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
  },
  isi: {
    type: String,
    required: true,
  },
  materiId: {
    type: ObjectId,
    ref: "Materi",
  },
});

module.exports = mongoose.model("Sub", subSchema);
