const product = require("../../Models/product");
const category = require("../../Models/category");
const mongoose = require("mongoose");
const brand = require("../../Models/brand");

const singleproduct = async (req, res) => {
  try {
    const data = await product.findById(req.params.id);

    if (!data) {
      return res.status(404).send({ error: "product not found" });
    }
    let parentcategory = await fetchchildcategory(data.parent_category);
    let childcategory = await fetchchildcategory(data.child_category);
    res.send({ status: "successfully", data, parentcategory, childcategory, slug: data.product_url.replace(/-/g, ' ') });
  } catch (err) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching data" });
  }
};
const BrandListproduct = async (req, res) => {

  try {
    // Fetch distinct colors and ensure uniqueness
    const allColors = await product.distinct("color", { brand: req.params.name });
    const uniqueColors = [...new Set(allColors.map(color => color ))];
console.log(allColors)
    // Fetch and normalize unique sizes
    const uniqueSizes = await product.distinct("mutipleSize", { brand: req.params.name });
    const sizes = [...new Set(uniqueSizes.map(size => size))];

    // Fetch unique parent categories
    const allCat = await product.distinct("parent_category", { brand: req.params.name });
    let uniqueCategories = [];

    if (allCat.length > 0) {
      try {
        const categoryIds = [...new Set(allCat[0].split(",").map(id => id.trim()))];
        const objectIdArray = categoryIds.map(id => new mongoose.Types.ObjectId(id));
        const categories = await category.find({ _id: { $in: objectIdArray } });
        uniqueCategories = categories.filter((cat, index, self) =>
          index === self.findIndex((c) => c._id.toString() === cat._id.toString())
        );
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    // Fetch unique child categories
    const allChildCat = await product.distinct("child_category", { brand: req.params.name });
    let uniqueChildCategories = [];

    if (allChildCat.length > 0) {
      try {
        const categoryIds = [...new Set(allChildCat[0].split(",").map(id => id.trim()))];
        const objectIdArray = categoryIds.map(id => new mongoose.Types.ObjectId(id));
        const categories = await category.find({ _id: { $in: objectIdArray } });
        uniqueChildCategories = categories.filter((cat, index, self) =>
          index === self.findIndex((c) => c._id.toString() === cat._id.toString())
        );
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    // Fetch unique subchild categories
    const allChildSubCat = await product.distinct("child_sub_category", { brand: req.params.name });
    let uniqueChildSubCategories = [];

    if (allChildSubCat.length > 0) {
      try {
        const categoryIds = [...new Set(allChildSubCat[0].split(",").map(id => id.trim()))];
        const objectIdArray = categoryIds.map(id => new mongoose.Types.ObjectId(id));
        const categories = await category.find({ _id: { $in: objectIdArray } });
        uniqueChildSubCategories = categories.filter((cat, index, self) =>
          index === self.findIndex((c) => c._id.toString() === cat._id.toString())
        );
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }

    // Send the response
    res.status(200).send({
      colors: uniqueColors,
      sizes,

      categories: uniqueCategories,
      cildCategories: uniqueChildCategories,
      childSubCategories: uniqueChildSubCategories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "An error occurred while fetching data" });
  }
};
const CategoryListproduct = async (req, res) => {

  try {
    const upcomingCat = await category.findOne({ name: req.params.name })

    // Fetch distinct colors and ensure uniqueness
    const allColors = await product.distinct("color", {
      $or: [
        { parent_category: { $in: [upcomingCat._id.toString()] } },
        { child_category: { $in: [upcomingCat._id.toString()] } },
        { child_sub_category: { $in: [upcomingCat._id.toString()] } }
      ]
    });
    

    const uniqueColors = [...new Set(allColors.map(color => color.trim().toLowerCase()))];

    // Fetch and normalize unique sizes
    const uniqueSizes = await product.distinct("mutipleSize", {
      $or: [
        { parent_category: { $in: [upcomingCat._id.toString()] } },
        { child_category: { $in: [upcomingCat._id.toString()] } },
        { child_sub_category: { $in: [upcomingCat._id.toString()] } }
      ]
    });
    const sizes = [...new Set(uniqueSizes.map(size => size))];

    // Fetch unique parent categories
    const allCat = await product.distinct("parent_category",{
      $or: [
        { parent_category: { $in: [upcomingCat._id.toString()] } },
        { child_category: { $in: [upcomingCat._id.toString()] } },
        { child_sub_category: { $in: [upcomingCat._id.toString()] } }
      ]
    });
    let uniqueCategories = [];

    if (allCat.length > 0) {
      try {
        const categoryIds = [...new Set(allCat[0].split(",").map(id => id.trim()))];
        const objectIdArray = categoryIds.map(id => new mongoose.Types.ObjectId(id));
        const categories = await category.find({ _id: { $in: objectIdArray } });
        uniqueCategories = categories.filter((cat, index, self) =>
          index === self.findIndex((c) => c._id.toString() === cat._id.toString())
        );
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    // Fetch unique child categories
    const allChildCat = await product.distinct("child_category", {
      $or: [
        { parent_category: { $in: [upcomingCat._id.toString()] } },
        { child_category: { $in: [upcomingCat._id.toString()] } },
        { child_sub_category: { $in: [upcomingCat._id.toString()] } }
      ]
    });
    let uniqueChildCategories = [];

    if (allChildCat.length > 0) {
      try {
        const categoryIds = [...new Set(allChildCat[0].split(",").map(id => id.trim()))];
        const objectIdArray = categoryIds.map(id => new mongoose.Types.ObjectId(id));
        const categories = await category.find({ _id: { $in: objectIdArray } });
        uniqueChildCategories = categories.filter((cat, index, self) =>
          index === self.findIndex((c) => c._id.toString() === cat._id.toString())
        );
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    // Fetch unique subchild categories
    const allChildSubCat = await product.distinct("child_sub_category", {
      $or: [
        { parent_category: { $in: [upcomingCat._id.toString()] } },
        { child_category: { $in: [upcomingCat._id.toString()] } },
        { child_sub_category: { $in: [upcomingCat._id.toString()] } }
      ]
    });
    let uniqueChildSubCategories = [];

    if (allChildSubCat.length > 0) {
      try {
        const categoryIds = [...new Set(allChildSubCat[0].split(",").map(id => id.trim()))];
        const objectIdArray = categoryIds.map(id => new mongoose.Types.ObjectId(id));
        const categories = await category.find({ _id: { $in: objectIdArray } });
        uniqueChildSubCategories = categories.filter((cat, index, self) =>
          index === self.findIndex((c) => c._id.toString() === cat._id.toString())
        );
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    // Fetch unique brand categories
    const allBrand = await product.distinct("brand",{
      $or: [
        { parent_category: { $in: [upcomingCat._id.toString()] } },
        { child_category: { $in: [upcomingCat._id.toString()] } },
        { child_sub_category: { $in: [upcomingCat._id.toString()] } }
      ]
    });
    let uniqueAllBrand = [];

    if (allBrand.length > 0) {
      try {

        const s = await brand.find({ brand_name: { $in: allBrand } });

        uniqueAllBrand = s.filter((cat, index, self) =>
          index === self.findIndex((c) => c._id.toString() === cat._id.toString())
        );
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }

    // Send the response
    res.status(200).send({
      colors: uniqueColors,
      sizes,
      brands: uniqueAllBrand,
      categories: uniqueCategories,
      cildCategories: uniqueChildCategories,
      childSubCategories: uniqueChildSubCategories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "An error occurred while fetching data" });
  }
};




module.exports = { singleproduct, CategoryListproduct, BrandListproduct };


const fetchchildcategory = async (categoryarray) => {
  if (categoryarray[0]) {
    try {
      const categoryIds = categoryarray[0].split(",");
      const objectIdArray = categoryIds.map(
        (id) => new mongoose.Types.ObjectId(id)
      );
      const categories = await category.find({ _id: { $in: objectIdArray } });
      return categories;
    } catch (error) { }
  } else {
    return [];
  }
};