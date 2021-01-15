const router = require("express").Router();
const Course = require("../model/courseModel")
const Media = require("../model/mediaModel")
const multer = require("multer")
const fs = require('fs')

router.get("/vid/:id", async (req, res) => {
    console.log(req.params.id)
    try{
        const media = await Media.findOne({_id: req.params.id})
        let stream = fs.createReadStream(media.url, { bufferSize: 64 * 1024 });
        stream.pipe(res);
    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:courseid", async (req, res) => {
    try{
        const media = await Media.find({courseID: req.params.courseid})

        res.json(media);
    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router