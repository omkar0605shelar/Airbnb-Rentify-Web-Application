require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const multer = require("multer");
const MongoDBStore = require("connect-mongodb-session")(session);

const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const randomString = (length) => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") cb(null, "uploads/");
    else if (file.fieldname === "rulesFile") cb(null, "rules-files/");
    else cb(new Error("Invalid upload field"));
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.fieldname === "image" &&
    ["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype)
  ) {
    cb(null, true);
  } else if (
    file.fieldname === "rulesFile" &&
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage, fileFilter }).fields([
    { name: "image", maxCount: 1 },
    { name: "rulesFile", maxCount: 1 },
  ])
);

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/rules-files", express.static(path.join(__dirname, "rules-files")));

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "AirbnbProjectSecret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/", authRouter);
app.use("/", storeRouter);

app.use("/host", (req, res, next) => {
  if (req.session.isLoggedIn) next();
  else res.redirect("/login");
});
app.use("/host", hostRouter);

app.use(errorController.get404);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 3000, () =>
      console.log("Server running...")
    );
  })
  .catch((err) => console.log(err));
