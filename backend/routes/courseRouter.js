const router = require("express").Router();
const Course = require("../model/courseModel")
const multer = require("multer")
const fs = require('fs');
const { encode } = require("punycode");
var currentImg = null;
var mimetype = null;
const videoStorage = multer.diskStorage({
    destination: "media/video/",
    filename: function(req, file, cb){
       cb(null,"VIDEO-" + Date.now() + file.originalname);
    }
 });
 
 const videoUpload = multer({
    storage: videoStorage
 });

 const imageStorage = multer.diskStorage({
    destination: "media/image/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + file.originalname);
    }
 });

 const imageUpload = multer({
    storage: imageStorage
 });

router.post("/testFile", videoUpload.single("chap_1"), async(req, res) => {
    const file = req.file

    try {
        res.json(file.path)
    } catch (error) {
        res.status(500).json({ error: err.message });
    } 
})

router.post("/upload-image", imageUpload.single("thumbnail"), async(req, res) => {
    const file = req.file
    mimetype = file.mimetype;
    currentImg = file;
    res.json(currentImg)
     //console.log(finalImg);
})

router.post("/add-new-course/:lect_id", async (req, res) => {
    try{
        let { title, briefDes, price, bonus} = req.body;
        var img = fs.readFileSync(currentImg.path);
        var encodeImage = "data:" + mimetype + ";base64," + img.toString('base64');
        const lect_id = req.params.lect_id;
        
        const newCourse = new Course({thumbnail: encodeImage, title, briefDes, fullDes: " ", rating: 0.0, rateCount: 0, subCount: 0, price, bonus,status: "On going", views: 0, createdAt: Date.now(), updatedAt: Date.now(), lecturer: lect_id});
        const savedCourse = await newCourse.save();
        res.json(savedCourse);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  
})
  
router.get("/most-viewed", async (req, res) => {
    try{
        const mostViewedCourse = await Course.find({}).sort('-views').limit(10);
        res.json(mostViewedCourse);
    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/highlight-this-week", async (req, res) => {
    try{
        var highlightCourse = await Course.find({}).sort('-subCount').limit(3);
        //console.log(mostViewedCourse);
        res.send(highlightCourse);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/latest", async (req, res) => {
    try{
        var latest = await Course.find({}).sort('-createdAt').limit(10);
        //console.log(mostViewedCourse);
        res.send(latest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/get-courses-list", async (req, res) => {
    try{
        const courses = await Course.find({});
        res.json(courses);
    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async(req, res) => {
    try{
        const course = await Course.findById(req.params.id)
        //console.log(course)
        res.json(course)
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
});

router.put("/view-count-increment/:id", async(req, res) => {
    try{
        await Course.updateOne({_id: req.params.id}, {$inc: {views: 1}})
        //console.log(course)
        res.json(course)
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
});



module.exports = router