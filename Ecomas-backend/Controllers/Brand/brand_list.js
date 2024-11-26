const brand = require("../../Models/brand");
const product = require("../../Models/product");
const brandlist = async (req, res) => { 
try{
  const brandlist = await product.distinct("brand");
    res.send({status:"sucessfully",data:brandlist})
}catch(err){
    
    res.send({status:"faild",errors:err})
}}
const list = async (req, res) => { 
try{
  const brandlist = await brand.find()
 return res.status(200).json({status:"sucessfully",data:brandlist})
}catch(err){
 return res.status(500).json({status:"faild",errors:err})
}}

module.exports = {brandlist,list}