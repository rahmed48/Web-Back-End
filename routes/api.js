const router = require("express").Router();
const apiController = require("../controllers/apiController");
// const { upload } = require("../middlewares/multer");

// router.get("/item", apiController.item);
// router.get("/detail-item/:id", apiController.detailItem);
// router.get("/select-category/:id", apiController.selectCategory);
// router.get("/toko", apiController.toko);
// router.get("/pesanan", apiController.pesanan);
// router.get("/detail-page/:id", apiController.detailPage);
// router.post("/booking-page", upload, apiController.bookingPage);
router.get("/home", apiController.home);
router.get("/isi-sub-materi/:id", apiController.isiSub);
router.get("/isi-latihan/:id", apiController.isiLatihan);
router.get("/detail-materi/:id", apiController.detailMateri);
router.get("/quiz/:id", apiController.quiz);

module.exports = router;
