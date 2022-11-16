const category = require("../models/category")
const Category = require("../models/category")
const item = require("../models/item")


exports.getAll = function () {
    return new Promise((resolve) => {

        item.find()
        .then((data) => {
            console.log(data)
            resolve(data)
        }).catch((error) => {
            resolve("error")
        })
    })

    
    }
exports.getById = function (id) {
    return new Promise((resolve) => {
    
        item.findById(id).then((data) => {
            console.log(data)
            resolve(data)
        }).catch((error) => {
            resolve("error")
        }) 
    })
    
    
        
}
exports.update = function (id) {
    return new Promise((resolve) => {
        console.log(id)
        item.findById(id)
        .populate('category')
        .then((data)=>{
            resolve(data)
        })
    })
}
exports.delete = function (id) {
    return new Promise((resolve) => {
        console.log(id)
        item.findById(id)
        .populate('category')
        .then((data)=>{
            resolve(data)
        })
    })
}
exports.postupdate = [
    (req,res,next)=>{
        console.log("postupd")
        console.log(req.body)
        var newitem= new item(
            {
                name:req.body.name,
                description:req.body.description,
                category:req.body.category,
                price:req.body.price,
                stockQuantity:req.body.stockQuantity,
                src:req.body.src,
                _id:req.params.id


            }
        )
        item.findByIdAndUpdate(req.params.id,newitem,{},function(err){
            if(err) {return next(err)}
            res.redirect('/')
        })
    }
]
exports.postdelete=(req,res,next)=>{
    item.findByIdAndRemove(req.params.id,function deletepost(err){
        if(err) {return next(err)}
        res.redirect('/category/')
    })
}