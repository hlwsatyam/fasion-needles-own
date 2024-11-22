const category = require("../../Models/category");

const categorylist_level_one = async (req, res) => {
  try {
    const categories = await category.find({ parentcategory: [] });
    res.send({ status: "successfully", data: categories });
  } catch (err) {
    res.send({ status: "faild", errors: err });
  }
};
const categorylist_level_two = async (req, res) => {
  try {
    const categories = await category.find({ parentcategory: [] });
    res.send({ status: "successfully", data: categories });
  } catch (err) {
    res.send({ status: "faild", errors: err });
  }
};

module.exports = { categorylist_level_one, categorylist_level_two };
