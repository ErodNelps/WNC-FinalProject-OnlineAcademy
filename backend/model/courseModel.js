const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    thumbnail: {type: String, required: true},
    title: {type: String, required: true},
    briefDes: {type: String, required: true},
    fullDes: {type: String, required: true},
    rating: {type: Number, required: true},
    rateCount: {type: Number},
    subCount: {type: Number},
    price: {type: Number},
    bonus: {type: Number},
    status: {type: String},
    views: {type: Number},
    createdAt: { type: Date, default: Date().now },
    updatedAt: { type: Date, default: Date().now },
    lecturer: mongoose.Schema.Types.ObjectId,
});

module.exports = Course = mongoose.model("course", courseSchema);