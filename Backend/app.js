const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const app = express();
app.use(express.json());
app.use(cookieParser());


const product = require("./routes/productRoutes");
app.use("/api/v1", product);

const user = require("./routes/userRoutes");
app.use("/api/v1", user);

const order = require("./routes/orderRoutes");
app.use("/api/v1",order);


// MiddleWare For error
app.use(errorMiddleware);

module.exports = app;
