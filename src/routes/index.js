const newsRouter = require("./news");
const coursesRouter = require("./courses");
const meRouter = require("./me");
const siteRouter = require("./site");

function routes(app) {
    app.use("/news", newsRouter);
    app.use("/courses", coursesRouter);
    app.use("/me", meRouter);
    app.use("/", siteRouter);
}

module.exports = routes;
