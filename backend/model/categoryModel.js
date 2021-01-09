const mongoose = require('mongoose');

// const sub = new Schema({subcategory: String});
const subcats = new mongoose.Schema({name: String});

const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category : {type: String,required: true,trim: true, unique :true,minlength: 2},
    subCategories: [subcats],
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;