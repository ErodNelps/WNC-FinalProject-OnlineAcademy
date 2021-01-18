const mongoose = require('mongoose');

// const sub = new Schema({subcategory: String});
const commentSchema = new mongoose.Schema({
    courseID: mongoose.Schema.Types.ObjectId,
    userID: mongoose.Schema.Types.ObjectId,
    comment: {type: String},
    rating: {type: Number},
});

module.exports = Comment = mongoose.model('comment', commentSchema);