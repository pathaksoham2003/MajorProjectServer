const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const sequelize = require('./database/sequelize');

// Import all models and associations through the index file
require('./models');

// Import routes
const userRouter = require("./routes/userRoute.js");
const ownerRoutes = require('./routes/ownerRoutes.js');
const shopRouter = require('./routes/shopRoute.js');
const productRoute = require('./routes/product.js');
const inventoryRouter = require('./routes/inventory.js');
const favoriteRouter = require('./routes/favorite.js');
const cartRoutes = require('./routes/cart');
const addressRoutes = require('./routes/address');
const couponRoutes = require('./routes/coupon');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes setup
app.use("/api/user", userRouter);
app.use('/api/owner', ownerRoutes);
app.use('/api/shop', shopRouter);
app.use('/api/pro', productRoute);
app.use('/api/inventory', inventoryRouter);
app.use('/api/favorite', favoriteRouter);
app.use('/api/cart', cartRoutes); 
app.use('/api/address', addressRoutes);
app.use('/api/coupon', couponRoutes);

app.get("/", (req, res) => {
    res.status(200).json("<h1>Hello</h1>")
});
 
// Only when we need to sync the database
sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('DB connection error:', err));

// sequelize.sync({ alter: true }) 
//     .then(() => console.log('Database synced'))
//     .catch(err => console.error('Sync failed:', err));

app.listen(8002, () => {
    console.log("Server started at port number 8002");
}); 