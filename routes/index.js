var express = require('express');
var router = express.Router();
var item=require('../models/item')

/* GET home page. */
router.get('/', function(req, res, next) {
  item.find().then((data)=>{
    console.log(data)
    res.send(data)
  }).catch((error)=>{
    res.send("eroor")
  })
 
});

module.exports = router;
