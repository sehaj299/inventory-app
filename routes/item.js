var express = require('express');
var router = express.Router();
var item=require("../controllers/itemController")
/* GET users listing. */
router.get('/item', async (req, res,next)=> {
    var result= await item.getAll()
   res.send(result);
});

router.get("/itm/:id", async (req, res,next)=> {
    console.log("hello")
    var id=req.params.id
    console.log(id)
    var result= await item.getById(id)
    res.send(result);
});

module.exports = router;