const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

// const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.use("/assets/d3", express.static(__dirname + "/node_modules/d3/dist"));
app.use("/assets/materialize", express.static(__dirname + "/node_modules/materialize-css/dist"));

// db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
// });