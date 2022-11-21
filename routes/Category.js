var express = require("express");
var router = express.Router();
var categorycontroller = require("../controllers/categoryController");
var itemcontroller = require("../controllers/itemController");



/* GET users listing. */
router.get("/",categorycontroller.getAll);

router.get("/displayItem", itemcontroller.getAll)

router.get("/item/:id", itemcontroller.getById)

router.get("/item/:id/delete", itemcontroller.delete)


router.get("/item/:id/update", itemcontroller.update)
  
router.post("/item/:id/delete", itemcontroller.postdelete);

router.post("/item/:id/update", itemcontroller.postupdate);

router.get("/createItem",itemcontroller.create_item_get);

router.get("/category/:id",categorycontroller.getById)


router.post("/createItem", itemcontroller.create_item_post)
  
module.exports = router;
