
const product = require("../../Models/product");
const productlist = async (req, res) => { 
try{
  const productlisting = await product.find();
    res.send({status:"sucessfully",data:productlisting})

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err})

}


}
const getLuxProduct = async (req, res) => {
  try {
    const productListing = await product
      .find({ selling_price: { $gt: 5000 } }) // Filtering products with price > 10
      .limit(30) // Limit to 30 products
      .exec(); // Executes the query

    res.status(200).send({ status: "success", data: productListing });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).send({ status: "failed", errors: err.message });
  }
};


module.exports = {productlist,getLuxProduct}