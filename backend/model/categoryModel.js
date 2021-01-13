const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category : {type: String,required: true,trim: true, unique :true,minlength: 2}
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;