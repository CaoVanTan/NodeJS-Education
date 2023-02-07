const Course = require("../models/Course");

class CourseController {
    // GET /courses/create
    create(req, res, next) {
        res.render("courses/create");
    }

    // GET /courses/edit/:id
    edit(req, res, next) {
        Course.findById(req.params.id)
            .lean()
            .then((course) => res.render("courses/edit", { course }))
            .catch(next);
    }

    // PUT /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next);
    }

    // DELETE /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // PATCH /courses/restore/:id
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // DELETE /courses/force/:id
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // POST /courses/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/0.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect("/me/stored/courses"))
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
