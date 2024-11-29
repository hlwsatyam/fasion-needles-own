
const product = require("../../../Models/product");
const productbybrand = async (req, res) => { 
  const filter = req.body;

try{
  const query={}
  if(req.params.name){
    
    query.brand = req.params.name
  }

    // if (color) baseQuery.color = color;
    if (filter.Color && filter.Color.length > 0) {
      query.color = { $in: filter.Color };
    }
    // // if (size) baseQuery.size = size;
    if (filter.Size && filter.Size.length > 0) {
      query.mutipleSize = { $in: filter.Size }; // Ensure filter.Size exists and is not empty
    }







  console.log(query)
  const productbybrandlist = await product.find(query).select('product_name _id selling_price brand mrp_price product_image1');
    res.send({status:"sucessfully",data:productbybrandlist})

}catch(err){
    console.log(`  here is errror ${err}`);
    res.send({status:"faild",errors:err})

}}

module.exports = productbybrand