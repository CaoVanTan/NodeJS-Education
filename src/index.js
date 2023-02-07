const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");

const routes = require("./routes");
const db = require("./config/db/index");

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

// Method-Override
app.use(methodOverride("_method"));

// Template engine
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
            splitString: (str) => {
                const newStr = str.split("\n");
                const itemsAsHtml = newStr.map(
                    (item) => "<li>" + item + "</li>"
                );
                return "<ul>\n" + itemsAsHtml.join("\n") + "\n</ul>";
            },
        },
    })
);
app.set("view engine", "hbs");

// Set path
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
routes(app);

// Connect DB
db.connect();

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
