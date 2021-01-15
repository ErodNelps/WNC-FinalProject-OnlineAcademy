const router = require('express').Router();
const subCategory = require("../model/subCategoryModel");


router.get("/get-subcategory/:catID", async (req, res) => {
  await subCategory.find({catID: req.params.catID}, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
    res.status(200).json(data);
  });
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