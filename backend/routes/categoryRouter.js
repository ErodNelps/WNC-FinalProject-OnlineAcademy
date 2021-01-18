const router = require('express').Router();
const Category = require('../model/categoryModel');
const Course = require('../model/courseModel');
const subCategoryModel = require('../model/subCategoryModel');
router.post('/add', async (req, res) => {
    const name = req.body.catName;
    try{
      if (!name) {
        return res
          .status(400)
          .json({ msg: 'You must enter a name (must be at least 2 characters long)' });
      }
      if(name.length < 2){
        return res
          .status(400)
          .json({ msg: 'Name must be at least 2 characters long' });
      }
      
      const existingCat = await Category.findOne({category: name})
      
      if(existingCat){
        return res.status(400).json({ msg: 'Category name already exists' });
      }
      const newcategory = new Category({
        category : name
      });
    
      newcategory.save((err, data) => {
        if (err) {
          return res.status(400).json({
            msg: 'Your request could not be processed. Please try again.'
          });
        }
    
        res.status(200).json({
          success: true,
          message: `Category has been added successfully!`,
          category: data
        });
      });
    } catch(err){
      res.status(400).json({msg: err})
    }
  });
  
  // fetch all categories api
router.get("/get-all-category", async (req, res) => {
  await Category.find({}, (err, data) => {
    if (err) {
      return res.status(400).json({
        msg: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json(data);
  });
});
  
router.delete('/delete/:catID', async (req, res) => {
  
  try{
    const existingCourse = await Course.find({cat: req.params.catID})
    if(existingCourse){
      return res.status(400).json({ msg: 'There is still at least 1 course of this category' });
    }
    
    subCategoryModel.deleteMany({catID: req.body.catID})
    Category.deleteOne({ _id: req.body.catID }, (err, data) => {
      if (err) {
        return res.status(400).json({
          msg: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: `Category has been deleted successfully!`,
        brand: data
      });
    });
  } catch(err){
    res.status(400).json({msg: err})
  }
});
  

module.exports = router;