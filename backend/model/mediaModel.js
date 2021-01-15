const mongoose = require("mongoose")

const mediaSchema = new mongoose.Schema({
    courseID: mongoose.Schema.Types.ObjectId,
    url: {type: String, require: true},
    name: {type: String, require: true},
})
  
module.exports = Media = mongoose.model("media", mediaSchema);