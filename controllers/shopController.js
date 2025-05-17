const { Shop, Owner, Product, Inventory } = require('../models');
const {Op} = require("sequelize"); // For advanced query operators

// Create a new shop
const createShop = async (req, res) => {
  try {
    const {name, description, gst, categories, location} = req.body;
    console.log(req.body);
    const seller_id = req.id; // Assuming the seller's ID is in the decoded token

    const shop = await Shop.create({
      name,
      description,
      gst,
      categories,
      location,
      seller_id,
    });

    res.status(201).json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error creating shop", error});
  }
};

// Update shop details
const updateShop = async (req, res) => {
  try {
    const shopId = req.params.id;
    const {name, description, gst, categories, location} = req.body;
    const seller_id = req.id; // Assuming the seller's ID is in the decoded token

    // Find the shop
    const shop = await Shop.findOne({where: {id: shopId, seller_id}});

    if (!shop) {
      return res.status(404).json({message: "Shop not found or unauthorized"});
    }

    // Update the shop details
    shop.name = name || shop.name;
    shop.description = description || shop.description;
    shop.gst = gst || shop.gst;
    shop.categories = categories || shop.categories;
    shop.location = location || shop.location;

    await shop.save();

    res.json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error updating shop", error});
  }
};

const getShopBySeller = async (req, res) => {
  try {
    const seller_id = req.id;
    const shop = await Shop.findOne({
      where: {
        seller_id: seller_id,
      },
      include: [
        {
          model: Owner,
          as: "owner",
          attributes: ["id", "name", "email", "phoneNumber"],
        },
      ],
    });

    if (!shop) {
      return res.status(404).json({message: "Shop not found or unauthorized"});
    }

    res.json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error fetching shop details", error});
  }
};

const getShopProducts = async (req,res) => {
  try{
    const seller_id = req.id;
    const shop = await Shop.findOne({
      where: {
        seller_id: seller_id,
      }
    });

    if (!shop) {
      return res.status(404).json({message: "Shop not found or unauthorized"});
    }
    const productsOfShop = await Product.findAll({
      where:{
        shopId:shop.id
      }
    })
    res.json(productsOfShop)
  }catch(err) {
    console.error(error);
    res.status(500).json({message: "Error fetching shop details", error});
  }
}

const filterProducts = async (req, res) => {
  try {
    const { category, brand, gender, minRating, maxPrice, discount, sortBy, search } = req.body;
    
    const seller_id = req.id;
    const shop = await Shop.findOne({
      where: {
        seller_id: seller_id,
      }
    });
    if (!shop) {
      return res.status(404).json({message: "Shop not found or unauthorized"});
    }

    let where = {};

    if (shop) where.shopId = shop.id; 
    if (category) where.category = category;
    if (brand) where.brand = brand;
    if (gender) where.gender = gender;
    if (minRating) where.rating = { [Op.gte]: minRating };
    if (maxPrice) where.price = { [Op.lte]: maxPrice };
    if (discount) where.discount = { [Op.gte]: discount };
    if (search) where.name = { [Op.iLike]: `%${search}%` };

    let order = [];
    if (sortBy === "price_low_high") order.push(["price", "ASC"]);
    else if (sortBy === "price_high_low") order.push(["price", "DESC"]);
    else if (sortBy === "rating") order.push(["rating", "DESC"]);
    else if (sortBy === "popularity") order.push(["rate", "DESC"]);

    const products = await Product.findAll({ where, order });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFilterOptions = async (req, res) => {
  try {
    const brands = await Product.aggregate("brand", "DISTINCT", { plain: false });
    res.json({
      categories: ["Electronics", "Clothing", "Home & Kitchen", "Sports", "Beauty", "Stationary", "Toys", "Other"],
      genders: ["male", "female", "unisex", "other"],
      brands: brands.map((b) => b.DISTINCT),
      sortOptions: ["price_low_high", "price_high_low", "rating", "popularity"],
      discount: [10, 20, 30, 40, 50],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createShop,
  updateShop,
  getShopBySeller,
  getShopProducts,
  filterProducts,
  getFilterOptions
};


