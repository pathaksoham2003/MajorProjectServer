const {Op} = require("sequelize");
const {Product, Shop, Inventory} = require("../models");
const {uploadToCloudinary} = require("../utils/cloudinary");

exports.createProduct = async (req, res) => {
  try {
    const uploadResults = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.path))
    );

    const imageUrls = uploadResults.map((result) => result.secure_url);

    const product = await Product.create({...req.body, imageUrls}); // Assuming imageUrls is an array column in Sequelize
    res.json(product);
  } catch (err) {
    console.error("Create Product Error:", err);
    res.status(500).json({error: err.message});
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    const {count, rows: products} = await Product.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalProducts: count,
    });
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.getFilterOptions = async (req, res) => {
  try {
    const brands = await Product.aggregate("brand", "DISTINCT", {plain: false});
    res.json({
      categories: [
        "Electronics",
        "Clothing",
        "Home & Kitchen",
        "Sports",
        "Beauty",
        "Stationary",
        "Toys",
        "Other",
      ],
      genders: ["male", "female", "unisex", "other"],
      brands: brands.map((b) => b.DISTINCT),
      sortOptions: ["price_low_high", "price_high_low", "rating", "popularity"],
      discount: [10, 20, 30, 40, 50],
    });
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.filterProducts = async (req, res) => {
  try {
    const {
      category,
      brand,
      gender,
      minRating,
      maxPrice,
      discount,
      sortBy,
      search,
    } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    let where = {};

    if (category) where.category = category;
    if (brand) where.brand = brand;
    if (gender) where.gender = gender;
    if (minRating) where.rating = {[Op.gte]: minRating};
    if (maxPrice) where.price = {[Op.lte]: maxPrice};
    if (discount) where.discount = {[Op.gte]: discount};
    if (search) where.name = {[Op.iLike]: `%${search}%`};

    let order = [];
    if (sortBy === "price_low_high") order.push(["price", "ASC"]);
    else if (sortBy === "price_high_low") order.push(["price", "DESC"]);
    else if (sortBy === "rating") order.push(["rating", "DESC"]);
    else if (sortBy === "popularity") order.push(["rate", "DESC"]);

    const {count, rows: products} = await Product.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalProducts: count,
    });
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const {name, description, price, stock, discount, category, brand, gender} =
      req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({error: "Product not found"});
    }

    await product.update({
      name,
      description,
      price,
      stock,
      discount,
      category,
      brand,
      gender,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
