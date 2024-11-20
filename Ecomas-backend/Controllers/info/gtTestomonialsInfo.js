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
console.log(contactlisting)
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

module.exports = { getTesto,getCateg, deleteTesto }