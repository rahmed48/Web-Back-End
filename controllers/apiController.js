const Materi = require("../models/Materi");

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
      const detail = await Materi.findOne({ _id: id });
      res.status(200).json({
        detail,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
