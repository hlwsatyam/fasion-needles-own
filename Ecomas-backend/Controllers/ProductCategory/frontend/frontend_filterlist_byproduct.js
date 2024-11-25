const product = require("../../../Models/product");
const category = require("../../../Models/category");
const login = require("../../user/login");

const frontendattributelistbyproduct = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const categorydata = await category
      .findById(req.params.id)



    let parentcategoryname = "";
    if (categorydata.parentcategory && categorydata.parentcategory.length > 0) {
      parentcategoryname = await category.findById(categorydata.parentcategory[0]).select("name -_id");
    }

    const colors = await product.distinct("color", {
      $or: [
        { parent_category: categoryId },
        { child_category: categoryId },
      ],
    });
    const brands = await product.distinct("brand", {
      $or: [
        { parent_category: categoryId },
        { child_category: categoryId },
      ],
    });
    const childCatoryData = await category.find({ parentcategory: categoryId })

    // const subCategory = await Promise.all(
    //   childCatoryData.flatMap(child =>
    //     child.parentsubcategory.map(subCatId => {
    //       const data=category.findById(subCatId).select("name _id")
    //       return data && data
    //     } )
    //   )
    // );
    
    const filteredSubCategory  = await Promise.all(
      childCatoryData.flatMap(child =>
        child.parentsubcategory.map(async subCatId => {
          const data = await category.findById(subCatId).select("name _id");
          return data || null; // Return null if category is not found
        })
      )
    );
    
    // Filter out null values (skip unavailable categories)
      subCategory = filteredSubCategory .filter(Boolean);
    




    const uniqueSizes = await product.distinct("mutipleSize", {
      child_category: { $in: categorydata.parentsubcategory }, // Match categories in parentsubcategory
    });

    // Normalize and remove duplicates
    const sizes = [...new Set(uniqueSizes.map(size => size.trim().toUpperCase()))];

    const weights = await product.distinct("weight", {
      $or: [
        { parent_category: categoryId },
        { child_category: categoryId },
      ], weight: { $gt: 0 }
    });
    const weightTypes = await product.distinct("weight_type", {
      $or: [
        { parent_category: categoryId },
        { child_category: categoryId },
      ],
    });
    // Repeat the process for other filters

    const combinedWeights = weights.map((weight, index) => ({
      weight,
      weightType: weightTypes[index],
    }));

    // Calculate min and max prices
    const minPrice = await product
      .findOne({}, { selling_price: 1 })
      .sort("selling_price");
    const maxPrice = await product
      .findOne({}, { selling_price: 1 })
      .sort("-selling_price");
    // console.log("first", minPrice, maxPrice);
    // Create an object containing available filters and their values
    const availableFilters = {
      color: colors,
      brand: brands,
      size: sizes,
      combinedWeight: combinedWeights,
      minPrice,
      maxPrice,
      childCatoryData,
      subCategory,
      // Add other filters here
    };

    res.status(200).json({
      status: "success",
      availableFilters,
      categorydata,
    
      parentcategoryname
    });
  } catch (error) {
    console.log("dkdkdd", error);
    res.status(500).json({ status: "failed", error: error.message });
  }
};

module.exports = frontendattributelistbyproduct;
