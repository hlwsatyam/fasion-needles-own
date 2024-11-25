const { default: axios } = require("axios");
const category = require("../../Models/category");
const testo = require("../../Models/testomonials");
const Product = require("../../Models/product");
const Usertable = require("../../Models/usertable");
const order = require("../../Models/order");
const getTesto = async (req, res) => {
    try {
        const contactlisting = await testo.find();

        res.status(200).send(contactlisting)

    } catch (err) {
        console.log(`  here is errror ${err}`);
        res.send({ status: "faild", errors: err })

    }


}
const getCateg = async (req, res) => {
    try {
        const contactlisting = await category.find({
            parentcategory: { $size: 0 } // MongoDB query to find documents where parentcategory is an empty array
        });
        
        res.status(200).send(contactlisting);
    } catch (err) {
        console.error(`Error: ${err}`);
        res.status(500).send({ status: "failed", errors: err.message }); // Added a proper HTTP status code and error message
    }
};

const deleteTesto = async (req, res) => {

    const { id } = req.params
    try {
        const contactlisting = await testo.findOneAndRemove(id);
        res.status(200).send(contactlisting)
    } catch (err) {
        res.status(203).send({ status: "faild", errors: err })
    }
}

const countinfo = async (req, res) => {
    try {
        const totalOrder = await order.countDocuments(); // Fixed method name
        const catCount = await category.countDocuments(); // Fixed method name
        const userCount = await Usertable.countDocuments(); // Fixed method name
        const orderLatest = await order.find().sort({ createdAt: -1 }).limit(10); // Corrected variable naming
        const latestCustomer = await Usertable.find().sort({ createdAt: -1 }).limit(10); // Corrected variable naming
         
        res.status(200).send({
            totalOrder,
            catCount,
            userCount,
            orderLatest, 
            latestCustomer // Include all results in response
        });
    } catch (err) {
        res.status(500).send({ status: "failed", errors: err.message }); // Adjusted status code and error handling
    }
};
const delAvailable = async (req, res) => {
    const { id } = req.params;

    const baseURL = 'https://track.delhivery.com';
    try {
        const PincodeServiceability = await axios.get(`${baseURL}/c/api/pin-codes/json/?filter_codes=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 03c3304cc1dcba59dbd45f35f12889fe86c33053'
            }
        });
        if (PincodeServiceability.data.delivery_codes.length === 0) {

            res.status(200).json({ message: "Delevery Not Available" });
        } else {
            res.status(200).json({ message: "Delevery Available" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error?.message || 'Failed to create Delhivery shipment order' });
    }
}

module.exports = { getTesto, countinfo,getCateg, delAvailable, deleteTesto }