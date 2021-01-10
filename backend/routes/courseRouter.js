const router = require("express").Router();
const Course = require("../model/courseModel")
const multer = require("multer")



router.get("/title");

router.post("/add-new-course/img/upload", async(req, res) => {
    const storage = multer.diskStorage({
        destination: "./public/",
        filename: function(req, file, cb){
           cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
        }
     });
     
     const upload = multer({
        storage: storage,
        limits:{fileSize: 1000000},
     }).single("myfile");
})

router.get("/most-viewed", async (req, res) => {
    try{
        const mostViewedCourse = await Course.find({}).sort('-views').limit(10);
        //console.log(mostViewedCourse);
        res.json(mostViewedCourse);
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

router.get("/highlight-this-week", async (req, res) => {
    var highlightCourse = await Course.find({}).sort('-subCount -updatedAt').limit(3);
    //console.log(mostViewedCourse);
    res.send(highlightCourse);
});

module.exports = router