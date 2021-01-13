const mongoose = require('mongoose');

// const sub = new Schema({subcategory: String});
const subcategoriesSchema = new mongoose.Schema({
    catID: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true},
});

module.exports = SubCategory = mongoose.model('sub-category', subcategoriesSchema);