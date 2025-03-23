const Product = require("../models/Product");
// GET /products?category=books&page=2&limit=5&sortBy=price&order=-1
async function getProducts(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Filtering by category if provided
  const filter = {};
  if (req.query.category) {
    filter.category = req.query.category;
  }

  // Sorting
  const sort = {};
  if (req.query.sortBy && req.query.order) {
    sort[req.query.sortBy] = parseInt(req.query.order); // 1 for asc, -1 for desc
  } else {
    sort.createdAt = -1; // default: newest first
  }

  try {
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const total = await Product.countDocuments(filter);
    res.json({
      page,
      limit,
      total,
      products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /products: Create a new product
async function createProduct(req, res) {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports = {
  getProducts,
  createProduct,
};
