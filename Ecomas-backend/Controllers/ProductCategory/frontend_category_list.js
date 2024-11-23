// Import necessary modules
const category = require('../../Models/category');

// Create a route for fetching all categories with subcategories
// const frontendcategorylist = async (req, res) => {
//   try {
//     // Fetch all categories from the database
//     const categories = await category.find({ status: 'Active' });

//     // Organize categories into main and subcategories
//     const mainCategories = [];
//     const categoriesMap = new Map();

//     // Populate the categoriesMap with categories
//     categories.forEach((cat) => {
//       categoriesMap.set(cat._id.toString(), { ...cat._doc, subcategories: [], parentsubcategory: [] });
//     });

//     var mainCatArr = []
//     // Identify main categories 
//     categories.forEach((cat) => {

//       if (cat.parentcategory.length === 0) {
//         mainCatArr.push(cat._id.toString())
//         mainCategories.push(categoriesMap.get(cat._id.toString()));
//       }


//       // else {
//       //   const parentCategory = categoriesMap.get(cat.parentcategory[0].toString());
//       //   if (parentCategory) {
//       //     parentCategory.subcategories.push(cat);
//       //   }
//       // }
//     });
//     // Identify main categories' sub category
//     categories.forEach((cat) => {

//       if (mainCatArr.includes(cat.parentcategory[0])) {
//         console.log(cat)

//       }


//     });

//     // Send the organized categories as a response
//     res.status(200).json({ status: 'success', data: mainCategories });
//   } catch (error) {
//     res.status(500).json({ status: 'failed', error: error.message });
//   }
// };
// const frontendcategorylist = async (req, res) => {
//   try {
//     // Fetch all categories from the database
//     const categories = await category.find({ status: 'Active' });
//     console.log(categories)
//     // Organize categories into main and subcategories
//     const mainCategories = [];
//     const parentSubCategory = [];
//     const lastCategory = [];



//     var mainCatArr = []
//     // Identify main categories 
//     categories.forEach((cat) => {
//       if (cat.parentcategory.length === 0) {
//         mainCatArr.push(cat._id.toString())
//       }
//     });
//     // Identify main categories' sub category
//     var subCatArr = []
//     categories.forEach((cat) => {
//       if (mainCatArr.includes(cat.parentcategory[0])) {
//         subCatArr.push(cat._id.toString())
//         parentSubCategory.push({
//           myId: cat._id.toString(),
//           parentId: mainCatArr[mainCatArr.indexOf(cat.parentcategory[0])]

//         });
//       }
//     });
//     // Identify main categories' sub category'S category

//     categories.forEach((cat) => {
//       if (subCatArr.includes(cat.parentcategory[0])) {

//         lastCategory.push({
//           myId: cat._id.toString(),
//           parentId: subCatArr[subCatArr.indexOf(cat.parentcategory[0])]

//         });
//       }
//     });



//     // Send the organized categories as a response
//     res.status(200).json({ status: 'success', data: mainCategories });
//   } catch (error) {
//     res.status(500).json({ status: 'failed', error: error.message });
//   }
// };

// const frontendcategorylist = async (req, res) => {
//   try {
//     // Fetch all categories from the database
//     const categories = await category.find({ status: 'Active' });

//     // Helper function to build hierarchy recursively
//     const buildHierarchy = (parentId, parentType) => {
//       return categories
//         .filter((cat) => (parentType === 'parentcategory' ? cat.parentcategory.includes(parentId) : cat.parentsubcategory.includes(parentId)))
//         .map((cat) => ({
//           id: cat._id.toString(),
//           name: cat.name,
//           url: cat.url,
//           desc: cat.desc,
//           banner: cat.banner,
//           subcategories: buildHierarchy(cat._id.toString(), 'parentcategory'),
//           subsubcategories: buildHierarchy(cat._id.toString(), 'parentsubcategory'),
//         }));
//     };

//     // Start building hierarchy from main categories (those with no parentcategory)
//     const mainCategories = categories
//       .filter((cat) => cat.parentcategory.length === 0)
//       .map((cat) => ({
//         id: cat._id.toString(),
//         name: cat.name,
//         url: cat.url,
//         desc: cat.desc,
//         banner: cat.banner,
//         subcategories: buildHierarchy(cat._id.toString(), 'parentcategory'),
//       }));
// console.log(mainCategories)
//     // Send the organized categories as a response
//     res.status(200).json({ status: 'success', data: mainCategories });
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ status: 'failed', error: error.message });
//   }
// };

const frontendcategorylist = async (req, res) => {
  try {
    const categories = await category.find({ status: 'Active' });

    // Helper function to build hierarchy recursively
    const buildHierarchy = (parentId, parentType, visited = new Set()) => {
      // Prevent infinite recursion due to circular references
      if (visited.has(parentId)) return [];
      visited.add(parentId);

      return categories
        .filter((cat) => (parentType === 'parentcategory' ? cat.parentcategory.includes(parentId) : cat.parentsubcategory.includes(parentId)))
        .map((cat) => ({
          id: cat._id.toString(),
          name: cat.name,
          url: cat.url,
          desc: cat.desc,
          banner: cat.banner,
          subcategories: buildHierarchy(cat._id.toString(), 'parentcategory', visited),
          subsubcategories: buildHierarchy(cat._id.toString(), 'parentsubcategory', visited),
        }));
    };

    // Build hierarchy starting from main categories
    const mainCategories = categories
      .filter((cat) => cat.parentcategory.length === 0)
      .map((cat) => ({
        id: cat._id.toString(),
        name: cat.name,
        url: cat.url,
        desc: cat.desc,
        banner: cat.banner,
        subcategories: buildHierarchy(cat._id.toString(), 'parentcategory'),
      }));

    res.status(200).json({ status: 'success', data: mainCategories });
  } catch (error) {
    res.status(500).json({ status: 'failed', error: error.message });
  }
};





// Export the router
module.exports = frontendcategorylist;
