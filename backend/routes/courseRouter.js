const router = require("express").Router();
const Course = require("../model/courseModel")

router.get("/:id");

router.get("/most-viewed", async (req, res) => {
    const course = await Course.find({});
    res.json({
        id: course._id,
        title: course.title,
    })
});
module.exports = router