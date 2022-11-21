const category = require("../models/category");
const Category = require("../models/category");
const item = require("../models/item");
const async = require("async");

exports.getAll = (req, res) => {
  item
    .find()
    .then((data) => {
;      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      res.send(result);
    });
}
exports.getById = (req, res) => {
  var id = req.params.id;
  item
    .findById(id)
    .then((data) => {
      console.log(data);
      res.render("details", { item: data });
    })
    .catch((error) => {
      res.render("error");
    });
};
exports.update = (req, res) => {
  var id = req.params.id;
  console.log(id);
  item
    .findById(id)
    .populate("category")
    .then((data) => {
      res.render("edit", { item: data });
    });
};
exports.delete = (req, res) => {
  var id = req.params.id;
  console.log(id);
  item
    .findById(id)
    .populate("category")
    .then((data) => {
      res.render("delete", { item: data });
    });
};
exports.postupdate = [
  (req, res, next) => {
    console.log("postupd");
    console.log(req.body);
    var newitem = new item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stockQuantity: req.body.stockQuantity,
      src: req.body.src,
      _id: req.params.id,
    });
    item.findByIdAndUpdate(req.params.id, newitem, {}, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
];
exports.postdelete = (req, res, next) => {
  item.findByIdAndRemove(req.params.id, function deletepost(err) {
    if (err) {
      return next(err);
    }
    res.redirect("/category/");
  });
};
exports.create_item_get = function (req, res, next) {
  async.parallel(
    {
      item: function (callback) {
        item
          .findById(req.params.id)

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
exports.create_item_post = (req, res) => {
    var id=req.params.id
    console.log(id)
  var newitem = new item({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    stockQuantity: req.body.stockQuantity,
    src: req.body.url,
  });
  console.log(newitem);

  newitem.save(function (err,data) {
    if (err) throw err;
    console.log(data);
    res.render("details",{item:data});
  });
};
