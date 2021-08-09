const Materi = require("../models/Materi")


module.exports = {
  home: async (req, res) => {
    try {
      const materi = await Materi.find();
      res.status(200).json({
        materi,
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },  
}