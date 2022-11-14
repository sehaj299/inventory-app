var express = require('express');
var router = express.Router();
var item=require('../models/item')
var category = require("../controllers/categoryController");

/* GET home page. */
router.get('/', async function(req, res, next) {
  var result = await category.getAll();
  res.redirect("/Category"
)
 
});


module.exports = router;
