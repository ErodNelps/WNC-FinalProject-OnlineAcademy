const mongoose = require('mongoose');
const Category = require('./categoryModel');

// const sub = new Schema({subcategory: String});
const categoryCourseSchema = new mongoose.Schema({
    courseID: mongoose.Schema.Types.ObjectId,
    cat: {type: String, required: true, unique: true},
    subcat: {type: String, required: true, unique: true},
});

module.exports = CategoryCourse = mongoose.model('category-course', categoryCourseSchema);