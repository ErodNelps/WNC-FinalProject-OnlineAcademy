const router = require('express').Router();
const SubCategory = require("../model/subCategoryModel");


router.get("/get-subcategory/:catID", async (req, res) => {
  await SubCategory.find({catID: req.params.catID}, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json(data);
  });
});

router.post('/add', async (req, res) => {
  const name = req.body.subcatName;
  const catID = req.body.catID
  try{
    if (!name) {
      return res
        .status(400)
        .json({ error: 'You must enter a name (must be at least 2 characters long)' });
    }
    if(name.length < 2){
      return res
        .status(400)
        .json({ error: 'Name must be at least 2 characters long' });
    }
    
    const existingSubCat = await SubCategory.findOne({name: name})
    
    if(existingSubCat){
      console.log(existingSubCat)
      return res.status(400).json({ error: 'Sub-category already exists' });
    }
    const newsubcategory = new SubCategory({
      catID,
      name
    });
  
    newsubcategory.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }
  
      res.status(200).json({
        success: true,
        message: `Category has been added successfully!`,
        category: data
      });
    });
  } catch(err){
    res.status(400).json({error: err})
  }
});

router.delete('/delete/:id',(req, res) => {
    Category.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

      res.status(200).json({
        success: true,
        message: `Category has been deleted successfully!`,
        brand: data
      });
    });
  }
);
  

module.exports = router;