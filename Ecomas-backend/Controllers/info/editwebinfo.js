const website_info = require("../../Models/website_info");
const testomonials = require("../../Models/testomonials");
const editwebinfo = async (req, res) => {

  try {
    const {
      name, subject, description, noOfStar
    } = req.body;

    let img;
    for (let i = 1; i <= 1; i++) {
      const imageFieldName = `logo`;
      if (req.files[imageFieldName]) {
        img = req.files[imageFieldName][0].filename;
      }
    }

    const data = new testomonials({
      name: name,
      subject: subject,
      description: description,
      noOfStar: noOfStar,
      logo: img
    })
    await data.save();

    if (!data) {
      return res
        .status(404)
        .json({ status: "failed", message: "no Record found" });
    }

    res.status(200).send({ status: "successfully added", data: data });
  } catch (err) {
    console.log(`  here is errror ${err}`);
    res.send({ status: "faild", errors: err });
  }
};

module.exports = editwebinfo;
