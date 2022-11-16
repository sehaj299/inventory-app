var express = require("express");
var router = express.Router();
var category = require("../controllers/categoryController");
var item = require("../controllers/itemController");
var itemSchema=require("../models/item")
var multer=require('multer');
const { findOneAndUpdate } = require("../models/item");
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads"); //important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });
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

router.get("/item/:id", async (req, res, next) => {
  console.log("hello");
  var id = req.params.id;
  console.log(id);
  var result = await item.getById(id);
  console.log(result)
  res.render("details",{item:result});
});
router.get("/item/:id/delete", async (req, res, next) => {
  var result=await item.delete(req.params.id)
  console.log(result)
  res.render('delete',{item:result})
});
router.get("/item/:id/update", async(req, res, next) => {
  console.log("update")
  console.log(req.params.id)
  var result=await item.update(req.params.id)
  console.log(result)
  res.render('edit',{item:result})
  
});
router.post("/item/:id/delete", item.postdelete);
router.post("/item/:id/update", item.postupdate);
router.get("/createItem",category.createitem);



// Single File Route Handler
router.post("/createItem", upload.single("image"),async(req, res) => {
  console.log("createitem")
  var newitem= new itemSchema(
    {
        name:req.body.name,
        description:req.body.description,
        category:req.body.category,
        price:req.body.price,
        stockQuantity:req.body.stockQuantity,
        src:req.body.src


    }
)
console.log(newitem)

       newitem.save(function(err){
        if(err) throw err
        res.redirect('/')
       })

})
router.get("/displayItem",async function (req, res, next) {
  var result = await item.getAll();
  console.log(result)
  res.render("diaplay",{item:result});
});
router.get("/category/:id",async function (req, res, next) {

  
  var result = await category.getById( req.params.id);
  res.render("diaplay",{item:result});

});
module.exports = router;
