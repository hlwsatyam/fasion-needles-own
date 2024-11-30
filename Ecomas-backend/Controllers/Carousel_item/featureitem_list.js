const product = require("../../Models/product");

const featureitem = async (req, res) => {
  try {
    // Set the number of random items you want to return
    const randomLimit = 40; // Change this to the number of random products you need

    const featureitemlist = await product.aggregate([
      { $match: { featuredproduct: 'Active' } }, // Filter featured products
      { $sample: { size: randomLimit } }, // Randomly sample 'randomLimit' products
      { $project: { product_name: 1, _id: 1, selling_price: 1, mrp_price: 1, product_image1: 1 } } // Select required fields
    ]);

    res.send({ status: "successfully", data: featureitemlist });
  } catch (err) {
    console.log(`Here is the error: ${err}`);
    res.send({ status: "failed", errors: err });
  }
};

module.exports = featureitem;
