var express = require("express");
var router = express.Router();
var category = require("../controllers/categoryController");
var item = require("../controllers/itemController");
/* GET users listing. */
router.get("/", async (req, res, next) => {
  var result = await category.getAll();
  res.render("index",{ title:"grocories",
  category:result});
});

router.get("/cat/:id", async (req, res, next) => {
  console.log("hello");
  var id = req.params.id;
  console.log(id);
  var result = await category.getById(id);
  res.send(result);
});

router.get("/item", async (req, res, next) => {
  var result = await item.getAll();
  res.send(result);
});

router.get("/itm/:id", async (req, res, next) => {
  console.log("hello");
  var id = req.params.id;
  console.log(id);
  var result = await item.getById(id);
  res.send(result);
});

router.get("/createItem",async function (req, res, next) {
  var result = await category.getAll();
  res.render("create",{
       category:result
  });
});
router.get("/displayItem",async function (req, res, next) {
  var result = await item.getAll();
  console.log(result)
  res.render("diaplay",{item:result});
});
router.get("/category/:id",async function (req, res, next) {
  console.log("dom")
  var result = await category.getById( req.params.id);
  console.log(result)
  res.render("diaplay",{item:result});
});
module.exports = router;
