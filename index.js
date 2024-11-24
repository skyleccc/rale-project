const express = require("express");
const app = express();
const port = 3000;

const routes = require("./routes");
const errorHandler = require("./middleware/errorMiddleware");

app.use(express.json());
app.use("/user", routes.userRoutes);
app.use("/product", routes.productRoutes);
app.use("/address", routes.addressRoutes);
app.use("/order", routes.orderRoutes);


app.use(errorHandler);

app.listen(port, () => {
    console.log(`Sever is running on port ${port}`);
});