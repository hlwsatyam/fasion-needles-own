const { default: axios } = require("axios");
const category = require("../../Models/category");
const testo = require("../../Models/testomonials");
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

module.exports = { getTesto, getCateg, delAvailable, deleteTesto }