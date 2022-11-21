const Category = require("../models/category");
const item = require("../models/item");

exports.getAll = (req, res) => {
  Category.find()
    .then((data) => {
      console.log(data);
      res.render("index", { title: "grocories", category: data });
    })
    .catch((error) => {
      res.render("error");
    });
};
exports.getById = (req, res) => {
  var id = req.params.id;
  var result = [];
  item.find().then((data) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].category == id) {
        result.push(data[i]);
      }
    }
    console.log(result);
    res.render("diaplay", { item: result });
  });
};
