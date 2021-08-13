const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const materiSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subMateriId: [
    {
      type: ObjectId,
      ref: "Sub",
    },
  ],
  kataKunci: [
    {
      type: String,
      required: true,
    },
  ],
  kompetisiDasar: [
    {
      type: String,
      required: true,
    },
  ],
  pengalamanBelajar: [
    {
      type: String,
      required: true,
    },
  ],
  petaKonsep: {
    type: String,
  },
});

module.exports = mongoose.model("Materi", materiSchema);
