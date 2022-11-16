const Category = require("../models/category")
const item = require("../models/item")
const async=require("async")
exports.getAll = function () {
    return new Promise((resolve) => {

        Category.find().then((data) => {
            console.log(data)
            resolve(data)
        }).catch((error) => {
            resolve("error")
        })
    })

    
    }
exports.getById = function (id) {
    return new Promise((resolve) => {
        var result=[]
        item.find().then((data)=>{
            for(var i=0;i<data.length;i++){
               
                if(data[i].category==id){
                    result.push(data[i])
                }
            }
            console.log(result)
            resolve(result)
        })
        
        
           
        
    })
    
        
        }
exports.createitem= function (req, res, next) {

    async.parallel(
  
      {
  
        item: function (callback) {
  
          item.findById(req.params.id)
  
            .populate("item")
  
            .populate("category")
  
            .exec(callback);
  
        },
  
        categories: function (callback) {
  
          Category.find()
  
            .sort([["name", "ascending"]])
  
            .exec(callback);
  
        },
  
      },
  
      function (err, results) {
  
        if (err) {
  
          return next(err);
  
        }
  
        // Successful, so render
  
        res.render("create", {
  
          title: "Create Weapon",
  
          category: results.categories,
  
        });
  
      }
  
    );
  
  };
  
  
  