const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    thumnail: {type: String, required: true},
    title: {type: String, required: true},
    briefDes: {type: String, required: true},
    fullDes: {type: String, required: true},
    rating: {type: Number, required: true},
    rateCount: {type: Number},
    subCount: {type: Number},
    price: {type: Number},
    bonus: {type: Number},
    syllabus: {type: String},
    status: {type: String},
});

module.exports = Course = mongoose.model("course", courseSchema);