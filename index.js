const express = require("express");
const cors = require("cors");
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;

const routes = require("./routes");
const errorHandler = require("./middleware/errorMiddleware");

app.use(cors());

app.use(express.json());
app.use("/user", routes.userRoutes);
app.use("/product", routes.productRoutes);
app.use("/address", routes.addressRoutes);
app.use("/order", routes.orderRoutes);
app.use("/size", routes.sizeRoutes);
app.use("/productInventory", routes.productInventoryRoutes);
app.use("/orderItem", routes.orderItemRoutes);
app.use("/shoppingCart", routes.shoppingCartRoutes);
app.use("/cartItem", routes.cartItemRoutes);
app.use("/productReview", routes.productReviewRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Sever is running on port ${port}`);
});