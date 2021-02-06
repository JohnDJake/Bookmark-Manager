if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 2 } // 2 hours
}));

app.use(express.static(__dirname + "/public"));
app.use("/assets/materialize", express.static(__dirname + "/node_modules/materialize-css/dist"));
app.use("/assets/jquery", express.static(__dirname + "/node_modules/jquery/dist"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main", helpers: require("./helpers/colorshelper") }));
app.set("view engine", "handlebars");

// Controllers
app.use(require("./controllers/userController"));
app.use("/api/collections", require("./controllers/collectionController"));
app.use("/api/bookmarks", require("./controllers/bookmarkController"));
// app.use("/api/tags", require("./controllers/tagController"));
app.use(require("./controllers/listRenderer"));
app.use(require("./controllers/modalRenderer"));

db.sequelize.sync({ force: process.env.FORCE_SYNC }).then(() => app.listen(PORT, () => console.log("App listening on PORT " + PORT)));
