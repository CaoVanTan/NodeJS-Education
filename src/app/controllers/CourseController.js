const Course = require("../models/Course");

class CourseController {
    // GET /courses/create
    create(req, res, next) {
        res.render("courses/create");
    }

    // POST /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/0.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect("/"))
            .catch((err) => {});
    }

    // GET /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .lean()
            .then((course) => {
                res.render("courses/show", { course });
            })
            .catch(next);
    }
}

module.exports = new CourseController();
