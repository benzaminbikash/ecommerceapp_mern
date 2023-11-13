require("dotenv").config();
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const { notFound, errorMiddleware } = require("./middleware/errorMiddleware");
const router = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const authRoute = require("./routes/authRoute");
const cart = require("./routes/addCartRoute");

//middleware
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

// router
server.use("/api/category", router);
server.use("/api/product", productRoute);
server.use("/api/auth", authRoute);
server.use("/api/cart", cart);

//error middleware
server.use(notFound);
server.use(errorMiddleware);

// db connection
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(colors.bgMagenta("Server listening on", process.env.PORT));
    });
  })
  .catch((err) => {
    console.log(err);
  });
