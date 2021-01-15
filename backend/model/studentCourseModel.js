const mongoose = require("mongoose")

const watchListSchema = new mongoose.Schema({
    courseID: mongoose.Schema.Types.ObjectId,
    studentID: mongoose.Schema.Types.ObjectId,
    action: {type: String, require: true}
})
  
module.exports = WatchList = mongoose.model("student-watchlist", watchListSchema);