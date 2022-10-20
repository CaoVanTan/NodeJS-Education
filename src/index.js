const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;

// Config static file
app.use(express.static(path.join(__dirname, "public")));

// Xu ly du lieu dang form
app.use(express.urlencoded({ extended: true }));

// Xu ly du lieu dang javascript
app.use(express.json());

// HTTP logger
app.use(morgan("dev"));

// Template engine
app.engine("hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

// Set path
app.set("views", path.join(__dirname, "resources/views"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/news", (req, res) => {
    res.render("news");
});

app.get("/search", (req, res) => {
    res.render("search");
});

app.post("/search", (req, res) => {
    console.log(req.body);
    res.send("");
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
