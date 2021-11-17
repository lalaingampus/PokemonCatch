require('dotenv').config({path: ".env"})

const express = require("express"),
  app = express(),
  cors = require("cors"),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  compression = require("compression"),
  helmet = require("helmet"),
  { finalError } = require("./middlewares/errorHandler");
router = require("./routes/pokemon-router");

app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "https://mypokedexs.netlify.app/"}));
app.use(morgan("dev"));
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/index.html");
})

//Mongo Atlas/Mlab Configuration
mongoose.connect(
  process.env.MONGO_URI, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 450000
},
function (err) {
  if (err) return console.log("Error: ", err);
  console.log(
    "MongoDB Connection -- Ready state is:",
    mongoose.connection.readyState
  );
 }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Connection Error"));
db.once("open", () => console.log("MongoDB Connected!"));

app.use("/api", router);
// app.use('/api')

//Error Handler
finalError.forEach((handler) => app.use(handler));

module.exports = app;
