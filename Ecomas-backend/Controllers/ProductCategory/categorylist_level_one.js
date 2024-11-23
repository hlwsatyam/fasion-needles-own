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
    // Ensure the parentCategory and parentsubcategory are properly accessed
    const subcategoryIds = req.body.parentCategory?.parentsubcategory || [];

    // Fetch categories with matching _id
    const categories = await category.find({ _id: { $in: subcategoryIds } });


    res.send({ status: "successfully", data: categories });
  } catch (err) {
    console.log(err);
    res.send({ status: "failed", errors: err });
  }
};


module.exports = { categorylist_level_one, categorylist_level_two };
