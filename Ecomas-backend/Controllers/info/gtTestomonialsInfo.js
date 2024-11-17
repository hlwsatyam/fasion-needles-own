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
const deleteTesto = async (req, res) => {
   
    const { id } = req.params
    try {
        const contactlisting = await testo.findOneAndRemove(id);
        res.status(200).send(contactlisting)
    } catch (err) {
        res.status(203).send({ status: "faild", errors: err })
    }
}

module.exports = { getTesto, deleteTesto }