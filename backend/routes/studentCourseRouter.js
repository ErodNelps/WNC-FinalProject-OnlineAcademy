const router = require('express').Router();
const User = require('../model/userModel');
const WatchList = require('../model/studentCourseModel');
const Course = require('../model/courseModel');
const mongoose = require('mongoose');

router.post("/addToWishList", (req, res) => {
    User.findOne({_id: req.body.id}, (err, user) => {
  
        let duplicate = false;
  
        user.WishList.forEach((wishList) => {
            if(wishList.id === req.body.courseid){
                duplicate = true;
            }
        });
  
        if(!duplicate){
            User.findOneAndUpdate({_id: req.body.userId},
                {
                    $push : {
                        WishList: {
                            id : req.body.productId,
                            name : req.body.name,
                            price : req.body.price,
                            description : req.body.description,
                            discount : req.body.discount,
                            material : req.body.material
                        }
                    }
                },
                {new:true},
                (err, user) => {
                    if(err) return res.json({success:false, err});
                    res.status(200).json(user.WishList)
                }
            )
        }
  
    })
  });
  
router.get("/:id/get-student-watchlist", async(req, res) => {
    const studentID = req.params.id;
    var watchListID = [];
    var idList = [];
    try {
        await WatchList.find({studentID: studentID, action: "watchlist"}).select('courseID -_id').then((res) =>{
            watchListID = res;
        })
        
        watchListID.forEach(element => {
            idList.push(element.courseID);
        });
        var obj_ids = idList.map(function(id) { return mongoose.Types.ObjectId(id); });
        const watchListCourse = await Course.find({_id: {$in: obj_ids}})
        res.json(watchListCourse)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get("/:id/get-student-subcription", async(req, res) => {
    const studentID = req.params.id;
    var subListID = [];
    var idList = [];
    try {
        await WatchList.find({studentID: studentID, action: "subscribed"}).select('courseID -_id').then((res) =>{
            subListID = res;
        })
        
        subListID.forEach(element => {
            idList.push(element.courseID);
        });
        var obj_ids = idList.map(function(id) { return mongoose.Types.ObjectId(id); });
        const subListCourse = await Course.find({_id: {$in: obj_ids}})
        res.json(subListCourse)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get("/:id/get-lecturer-course", async(req, res) => {
    try {
        const lecturerCourse = await Course.find({lecturer: req.params.id})
        
        res.json(lecturerCourse)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/removeWishList', (req, res) => {

User.findOneAndUpdate(
    {_id: req.query.userId},
    {
        "$pull":
            {"WishList" : {"id" : req.query.productId}}
    },
    {new : true},
    (err, userInfo) => {
        if(err) return res.json({success:false, err});
        res.status(200).json(userInfo.WishList)
    }
)
});

module.exports = router;