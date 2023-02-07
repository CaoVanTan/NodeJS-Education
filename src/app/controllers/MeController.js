const Course = require('../models/Course');

class MeController {
    // GET /me/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .lean()
            .then((course) => res.render('me/stored_courses', { course }))
            .catch(next);
    }

    // GET /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .lean()
            .then((course) => res.render('me/trash_courses', { course }))
            .catch(next);
    }
}

module.exports = new MeController();
