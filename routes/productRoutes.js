const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middlewares/upload"); // Multer middleware for file uploads
// Advanced API endpoints: pagination, filtering, sorting
router.get("/", productController.getProducts);
router.post("/", productController.createProduct);
// File upload endpoint: uploads a single file under field name 'image'
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ message: "File uploaded successfully", file: req.file });
});
module.exports = router;
