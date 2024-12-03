
const product = require("../../Models/product");
const productlist = async (req, res) => {
  try {
    const productlisting = await product.find();
    res.send({ status: "sucessfully", data: productlisting })

  } catch (err) {
    console.log(`  here is errror ${err}`);
    res.send({ status: "faild", errors: err })

  }


}
const prevIew = async (req, res) => {
  try {
    const { allId } = req.body;

    if (!allId || !Array.isArray(allId)) {
      return res.status(400).send({ status: "failed", error: "Invalid allId provided" });
    }

   

    // Fetch products using $in
    const productListing = await product.find({ _id: { $in: allId } });

    // Sort the results to match the order of allId
    const sortedProductListing = allId.map(id => productListing.find(product => product._id.toString() === id));

    res.send({ status: "success", data: sortedProductListing });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).send({ status: "failed", error: err.message });
  }
};

const getLuxProduct = async (req, res) => {
  const { subChildCat, parentCat, childCat } = req.body;

  try {
    let productListing;

    if (subChildCat && subChildCat._id) {

      productListing = await product.find({
        child_sub_category: { $in: [subChildCat._id] }, // Filter by subChildCat._id
      })
        .limit(30)
        .exec();


    }

    else if (childCat && childCat._id) {
      productListing = await product.find({
        child_category: { $in: [childCat._id] }, // Filter by childCat._id
      })
        .limit(30)
        .exec();


    }
    else if (parentCat && parentCat._id) {
      productListing = await product.find({
        parent_category
          : { $in: [parentCat._id] }, // Filter by childCat._id
      })
        .limit(30)
        .exec();

     
    }




    else {
      productListing = await product.find({
        selling_price: {
          $gt: 5000
        }, // Filter by price > 5000
      })
        .limit(30)
        .exec();
        
    }
    
    res.status(200).send({ status: "success", data: productListing });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).send({ status: "failed", errors: err.message });
  }
};



module.exports = { productlist,prevIew, getLuxProduct }