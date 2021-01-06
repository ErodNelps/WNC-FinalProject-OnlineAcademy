const router = require("express").Router();
const Course = require("../model/courseModel")

router.get("/:id");

router.get("/title");

router.get("/most-viewed", async (req, res) => {
    var mostViewedCourse = await Course.find({}).sort('-views').limit(2);
    //console.log(mostViewedCourse);
    res.send(mostViewedCourse);
});

module.exports = router