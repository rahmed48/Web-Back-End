const Latihan = require("../models/Latihan");
const Materi = require("../models/Materi");
const Sub = require("../models/Sub");

module.exports = {
  home: async (req, res) => {
    try {
      const materi = await Materi.find().select("_id title");
      res.status(200).json({
        materi,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  detailMateri: async (req, res) => {
    try {
      const { id } = req.params;
      const detail = await Materi.findOne({ _id: id })
        .populate({
          path: "latihanId",
          select: "judul isi",
        })
        .populate({
          path: "subMateriId",
          select: "judul isi",
        });
      res.status(200).json({
        detail,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  isiSub: async (req, res) => {
    try {
      const { id } = req.params;
      const isiSub = await Sub.findOne({ _id: id });
      res.status(200).json({
        isiSub,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  isiLatihan: async (req, res) => {
    try {
      const { id } = req.params;
      const isiLatihan = await Latihan.findOne({ _id: id });
      res.status(200).json({
        isiLatihan,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
