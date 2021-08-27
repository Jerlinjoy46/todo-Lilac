const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const limiter = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const port = process.env.PORT || 3002;
//route
const taskRoute = require("./routes/task");
//db connections
const mongoose = require("mongoose");
mongoose.connect(
  process.env.DB_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) return console.log("Fail to Connect...! 🌇 ");
    console.log("Connection Success....! 🌅 ");
  }
);
//NODE_ENV set-up
if (process.env.NODE_ENV === "development") return app.use(morgan("dev"));
//security
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(express.json({ limit: 50000 }));
app.use(express.urlencoded({ extended: false, limit: 50000 }));
//route set-up
app.use("/api", taskRoute);
//port set-up
app.listen(port, (err) => {
  if (err) throw err;
  console.log(
    `🚀 Running ON ${process.env.NODE_ENV} MODE on https://localhost:${port} 🚀`
  );
});
