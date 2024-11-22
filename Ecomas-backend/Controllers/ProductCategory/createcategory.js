const category = require("../../Models/category");
const slugify = require("slugify");
const createcategory = async (req, res) => {
  try {

    const {
      category_name,
      category_url,
      editor,
      meta_description,
      meta_title,
      meta_keywords,
      parent_category,
      parent_sub_category,
      status,
    } = req.body;

    var condition = {}

    if (parent_category == '' && parent_sub_category == '') {
      console.log('ff')
      condition = {
        parentcategory: [],
        parentsubcategory: [],
      }
    }
    if (parent_category != '' && parent_sub_category == '') {
      console.log('ffyy')
      condition = {
        parentcategory: [parent_category],
        parentsubcategory: []
      }
    }
    if (parent_category != '' && parent_sub_category != '') {

      condition = {
        parentcategory: [parent_category],
        parentsubcategory: []

      }
      const addcategory = new category({
        name: category_name,
        url: slugify(category_url),
        desc: editor,
        metatitle: meta_title,
        metadesc: meta_description,
        status,
        meta_keywords: meta_keywords,
        ...condition,
        banner: req.files.category_image[0].filename,
      });

      const rel = await addcategory.save();

      await category.findByIdAndUpdate(
        parent_category,
        { $push: { parentsubcategory: rel._id } },
        { new: true, useFindAndModify: false }
      );



      return res.status(201).json({ status: "successfull", data: rel });

    }


    const addcategory = new category({
      name: category_name,
      url: slugify(category_url),
      desc: editor,
      metatitle: meta_title,
      metadesc: meta_description,
      status,
      meta_keywords: meta_keywords,
      ...condition,
      banner: req.files.category_image[0].filename,
    });

    const rel = await addcategory.save();



    await category.findByIdAndUpdate(
      parent_category,
      { $push: { parentsubcategory: rel._id } },
      { new: true, useFindAndModify: false }
    );



    return res.status(201).json({ status: "successfull", data: rel });








  } catch (error) {
    console.log(error)
    res.send({ status: "faild", error: error.errors });
  }
};

async function checkIfCategoryExists(keyvalue, name) {
  let category_response;
  if (keyvalue == 'name') {
    category_response = await category.findOne({ name: name });
  } else {
    category_response = await category.findOne({ url: name });
  }
  if (category_response == null) {
    return true;
  } else {
    return false;
  }
}

module.exports = createcategory;
