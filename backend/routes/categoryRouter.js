const router = require('express').Router();
let Category = require('../model/categoryModel');

router.post('/add', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
  
    if (!description || !name) {
      return res
        .status(400)
        .json({ error: 'You must enter description & name.' });
    }
  
    const category = new Category({
      name,
      description,
      products
    });
  
    category.save((err, data) => {
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
  });
  
  // fetch all categories api
router.get("/get-all-category", async (req, res) => {
  await Category.find({}, (err, data) => {
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