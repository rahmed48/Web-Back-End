const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { upload } = require("../middlewares/multer");
const auth = require("../middlewares/auth");
// const roleAkses = require("../controllers/adminController");

router.get("/signin", adminController.viewSignin);
router.post("/signin", adminController.actionSignin);
router.use(auth);
router.put("/logout", adminController.actionLogout);
router.get("/dashboard", adminController.viewDashboard);

router.get("/materi", adminController.viewMateri);
router.post("/materi", adminController.addMateri);
router.delete("/materi/:id", adminController.deleteMateri);

router.get("/latihan", adminController.viewLatihan);
router.post("/latihan", adminController.addLatihan);
router.delete("/latihan/:id", adminController.deleteLatihan);

router.get("/quiz", adminController.viewQuiz);
router.post("/quiz", adminController.addQuiz);
router.delete("/quiz/:id", adminController.deleteQuiz);
// router.get("/category", adminController.viewCategory);
// router.post("/category", adminController.addCategory);
// router.put("/category", adminController.editCategory);
// router.delete("/category/:id", adminController.deleteCategory);

// // // ENDPOINT TOKO
// router.get("/toko", adminController.viewToko);
// router.put("/toko", adminController.editToko);

// // ENDPOINT ITEM
// router.get("/item", adminController.viewItem);
// router.post("/item", upload, adminController.addItem);
// router.put("/item", upload, adminController.editItem);
// router.delete("/item/:id", adminController.deleteItem);

// ENDPOINT USER
router.get("/user", adminController.viewUser);
router.post("/user", adminController.addUser);
router.delete("/user/:id", adminController.deleteUser);
// router.put("/user", adminController.editUser);

// ENDPOINT STOK
// router.get("/stok", adminController.viewStok);
// router.delete("/stok/ada/:id", adminController.setStokAda);
// router.delete("/stok/kosong/:id", adminController.setStokKosong);

// ENDPOINT STOK
// router.get("/pesanan", adminController.viewPesanan);
// router.delete("/stok/ada/:id", adminController.setStokAda);
// router.delete("/stok/kosong/:id", adminController.setStokKosong);

module.exports = router;
