const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/f8_education_dev");
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        slug: { type: String, slug: "name", unique: true },
        videoId: { type: String, required: true },
        cost: { type: String },
        level: { type: String },
        details: { type: String },
    },
    {
        timestamps: true,
    }
);

Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model("Course", Course);
