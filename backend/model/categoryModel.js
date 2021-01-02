const mongoose = require('mongoose');

// const sub = new Schema({subcategory: String});
const subcats = new mongoose.Schema({name: String});

const Category = new mongoose.Schema({
    category : {
        type: String,
        required: true,
        trim: true,
        unique :true,
        minlength: 2
    },

    subCategories: [subcats],

    description: {
        type: String,
        trim: true,
    }

});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;