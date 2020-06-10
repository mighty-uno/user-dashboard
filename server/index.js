/****************************************************/
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { MONGODB, PORT } = require("./app/config/keys");

/************************MongoDB DATABASE****************************/
mongoose
  .connect(MONGODB.uri, MONGODB.options)
  .then((msg) => console.log("Database Connected"))
  .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

/************************MongoDB DATABASE****************************/

/**************EXPRESS MIDDLEWARES**********/
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

const helmet = require("helmet");
app.use(helmet());

/*************ROUTES**************/
require("./app/routes")(app);

/*****STATIC FILES*******/
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "client/build")));
  //serve routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
/*****STATIC FILES*******/

app.listen(PORT, function () {
  console.log(`Listening on port`, PORT);
});
