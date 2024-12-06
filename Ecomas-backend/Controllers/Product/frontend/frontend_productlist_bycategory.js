// const category = require("../../../Models/category");
// const product = require("../../../Models/product");

// const frontendproductlistbycategory = async (req, res) => {
//   const { none, page, max_price, min_price, order, orderby, brand, size, color, weight } =
//     req.query;
//   const filter =
//     req.body;

//   //filter={
//   //   Category: [ 'WOMEN' ],
//   //   Brand: [ 'Zara', 'Asos' ],
//   //   childCategory: [ 'Western Wear' ],
//   //   subChildCategory: [ 'Jumpsuits ' ],
//   //   Color: [ 'black', '#dedcd6' ],
//   //   Size: [ 'L', 'XL', 'XS' ],
//   //   searchText:''
//   //gender:''
//   //productPerPage=4, 'all
//   // Price: ['10000-20000', '5000-10000', '1000-5000']
//   //shortBy
//   // }
//   try {
//     const categoryId = req.params.name;
//     const cat = await category.findOne({ name: categoryId });
//     if (!cat) {
//       return await frontendproductlistWithoutCategory(req, res)
//     }
//     const itemsPerPage = filter.productPerPage != "all" ? filter.productPerPage : 10000 || 5000;
//     const pageNumber = parseInt(page) || 1;
//     const skip = (pageNumber - 1) * itemsPerPage;
//     let sortOptions = {};
//     if (orderby) {
//       if (orderby == "trendingproduct") {
//         sortOptions[orderby] = 1;
//       }
//       if (orderby == "newarrivedproduct") {
//         sortOptions[orderby] = 1;
//       }

//       if (orderby == "selling_price") {
//         sortOptions[orderby] = order === "ASE" ? 1 : -1;
//       }
//     } else {
//       sortOptions['selling_price'] = 1;
//     }

//     if (filter.shortBy == "lowToHigh") {
//       sortOptions["selling_price"] = 1;
//     }
//     else {
//       sortOptions['selling_price'] = -1;
//     }
//     // Build the base query for finding products by category
//     const baseQuery = {
//       $or: [
//         { parent_category: { $in: [cat._id.toString()] } },
//         { child_sub_category: { $in: [cat._id.toString()] } },
//         { child_category: { $in: [cat._id.toString()] } },
//       ],
//     };
//     // Add price filtering to the base query
//     if (min_price || max_price) {
//       baseQuery.selling_price = {};
//       if (min_price) baseQuery.selling_price.$gte = parseInt(min_price);
//       if (max_price) baseQuery.selling_price.$lte = parseInt(max_price);
//     }
//     if (weight) {
//       const [weightnum, weighttype] = weight.split(' ');
//       baseQuery.weight = weightnum;
//       baseQuery.weight_type = weighttype;
//     }
//     // if (color) baseQuery.color = color;
//     if (filter.Color && filter.Color.length > 0) {
//       baseQuery.color = { $in: filter.Color };
//     }
//     if (filter.gender && filter.gender != "all") {
//       baseQuery.gender = filter.gender;
//     }
//     // // if (size) baseQuery.size = size;
//     if (filter.Size && filter.Size.length > 0) {
//       baseQuery.mutipleSize = { $in: filter.Size }; // Ensure filter.Size exists and is not empty
//     }
//     // Add price filtering
//     if (filter.Price && filter.Price.length > 0) {
//       const priceRanges = filter.Price.map((range) => {
//         const [min, max] = range.split("-").map(Number);
//         return { $gte: min, $lte: max };
//       });

//       baseQuery.$or = priceRanges.map((range) => ({
//         selling_price: range,
//       }));
//     }
//     // if (brand) baseQuery.brand = brand;
//     if (filter.Brand && filter.Brand.length > 0) {
//       baseQuery.brand = { $in: filter.Brand };
//     }
//     if (filter.searchText && filter.searchText.trim() !== "") {
//       const searchRegex = new RegExp(filter.searchText.trim(), "i"); // Case-insensitive search
//       baseQuery.$or = [
//         { product_name: { $regex: searchRegex } },
//         { description: { $regex: searchRegex } },
//         { brand: { $regex: searchRegex } },
//       ];
//     }
//     // Get total count before applying filters
//     const totalCountBeforeFilter = await product.countDocuments(baseQuery);
//     // Get products before applying filters
//     const productsBeforeFilter = await product
//       .find(baseQuery)
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(itemsPerPage);

//     const totalItems = totalCountBeforeFilter;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     res.status(200).json({
//       status: "success",
//       data: productsBeforeFilter,
//       totalPages,
//       itemsPerPage,
//       totalItems,
//       pageNumber,
//     });

//   } catch (error) {
//     res.status(500).json({ status: "failed", error: error.message });
//   }
// };

// module.exports = frontendproductlistbycategory;




// async function frontendproductlistWithoutCategory(req, res) {
//   const filter =
//     req.body;

//   const itemsPerPage = filter.productPerPage != "all" ? filter.productPerPage : 10000 || 5000;
//   const pageNumber = parseInt(page) || 1;
//   const skip = (pageNumber - 1) * itemsPerPage;
//   let sortOptions = {};
  

//   if (filter.shortBy == "lowToHigh") {
//     sortOptions["selling_price"] = 1;
//   }
//   else {
//     sortOptions['selling_price'] = -1;
//   }
   
//   // if (color) baseQuery.color = color;
//   if (filter.Color && filter.Color.length > 0) {
//     baseQuery.color = { $in: filter.Color };
//   }
//   if (filter.gender && filter.gender != "all") {
//     baseQuery.gender = filter.gender;
//   }
//   // // if (size) baseQuery.size = size;
//   if (filter.Size && filter.Size.length > 0) {
//     baseQuery.mutipleSize = { $in: filter.Size }; // Ensure filter.Size exists and is not empty
//   }
//   // Add price filtering
//   if (filter.Price && filter.Price.length > 0) {
//     const priceRanges = filter.Price.map((range) => {
//       const [min, max] = range.split("-").map(Number);
//       return { $gte: min, $lte: max };
//     });

//     baseQuery.$or = priceRanges.map((range) => ({
//       selling_price: range,
//     }));
//   }
//   // if (brand) baseQuery.brand = brand;
//   if (filter.Brand && filter.Brand.length > 0) {
//     baseQuery.brand = { $in: filter.Brand };
//   }
//   if (filter.searchText && filter.searchText.trim() !== "") {
//     const searchRegex = new RegExp(filter.searchText.trim(), "i"); // Case-insensitive search
//     baseQuery.$or = [
//       { product_name: { $regex: searchRegex } },
//       { description: { $regex: searchRegex } },
//       { brand: { $regex: searchRegex } },
//     ];
//   }else {
//     const searchRegex = new RegExp(req.params.name, "i"); // Case-insensitive search
//     baseQuery.$or = [
//       { product_name: { $regex: searchRegex } },
//       { description: { $regex: searchRegex } },
//       { brand: { $regex: searchRegex } },
//     ];
//   }
//   // Get total count before applying filters
//   const totalCountBeforeFilter = await product.countDocuments(baseQuery);
//   // Get products before applying filters
//   const productsBeforeFilter = await product
//     .find(baseQuery)
//     .sort(sortOptions)
//     .skip(skip)
//     .limit(itemsPerPage);

//   const totalItems = totalCountBeforeFilter;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   console.log("jhh")
//   res.status(200).json({
//     status: "success",
//     data: productsBeforeFilter,
//     totalPages,
//     itemsPerPage,
//     totalItems,
//     pageNumber,
//   });
// }






const category = require("../../../Models/category");
const product = require("../../../Models/product");

const frontendproductlistbycategory = async (req, res) => {
  const filter = req.body || {}; // Use `req.body` for input.

  try {
    const categoryId = req.params.name;
    const cat = await category.findOne({ name: categoryId });

    if (!cat) {
      return await frontendproductlistWithoutCategory(req, res);
    }

    const itemsPerPage = filter.productPerPage && filter.productPerPage !== "all" 
      ? parseInt(filter.productPerPage) 
      : 10000; // Default to 10,000 if "all" or not provided.
    const pageNumber = parseInt(filter.page) || 1;
    const skip = (pageNumber - 1) * itemsPerPage;

    let sortOptions = {};
    if (filter.orderby) {
      sortOptions[filter.orderby] = filter.order === "ASC" ? 1 : -1;
    } else if (filter.shortBy === "lowToHigh") {
      sortOptions["selling_price"] = 1;
    } else {
      sortOptions["selling_price"] = -1;
    }

    const baseQuery = buildBaseQuery(cat._id, filter);

    // Get total count before applying filters
    const totalCountBeforeFilter = await product.countDocuments(baseQuery);
    // Get products after applying filters
    const productsBeforeFilter = await product
      .find(baseQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(itemsPerPage);

    const totalItems = totalCountBeforeFilter;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    res.status(200).json({
      status: "success",
      data: productsBeforeFilter,
      totalPages,
      itemsPerPage,
      totalItems,
      pageNumber,
    });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

async function frontendproductlistWithoutCategory(req, res) {
  const filter = req.body || {}; // Use `req.body` for input.

  try {
    const itemsPerPage = filter.productPerPage && filter.productPerPage !== "all" 
      ? parseInt(filter.productPerPage) 
      : 10000; // Default to 10,000 if "all" or not provided.
    const pageNumber = parseInt(filter.page) || 1;
    const skip = (pageNumber - 1) * itemsPerPage;

    let sortOptions = {};
    if (filter.shortBy === "lowToHigh") {
      sortOptions["selling_price"] = 1;
    } else {
      sortOptions["selling_price"] = -1;
    }

    const baseQuery = buildBaseQuery(null, filter); // Pass null for category ID.

    // Get total count before applying filters
    const totalCountBeforeFilter = await product.countDocuments(baseQuery);
    // Get products after applying filters
    const productsBeforeFilter = await product
      .find(baseQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(itemsPerPage);

    const totalItems = totalCountBeforeFilter;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    res.status(200).json({
      status: "success",
      data: productsBeforeFilter,
      totalPages,
      itemsPerPage,
      totalItems,
      pageNumber,
    });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
}

// Helper function to build the base query
function buildBaseQuery(categoryId, filter) {
  const baseQuery = {};

  if (categoryId) {
    baseQuery.$or = [
      { parent_category: { $in: [categoryId.toString()] } },
      { child_sub_category: { $in: [categoryId.toString()] } },
      { child_category: { $in: [categoryId.toString()] } },
    ];
  }

  if (filter.min_price || filter.max_price) {
    baseQuery.selling_price = {};
    if (filter.min_price) baseQuery.selling_price.$gte = parseInt(filter.min_price);
    if (filter.max_price) baseQuery.selling_price.$lte = parseInt(filter.max_price);
  }

  if (filter.Color && filter.Color.length > 0) {
    baseQuery.color = { $in: filter.Color };
  }

  if (filter.gender && filter.gender !== "all") {
    baseQuery.gender = filter.gender;
  }

  if (filter.Size && filter.Size.length > 0) {
    baseQuery.mutipleSize = { $in: filter.Size };
  }

  if (filter.Price && filter.Price.length > 0) {
    const priceRanges = filter.Price.map((range) => {
      const [min, max] = range.split("-").map(Number);
      return { $gte: min, $lte: max };
    });

    baseQuery.$or = priceRanges.map((range) => ({
      selling_price: range,
    }));
  }

  if (filter.Brand && filter.Brand.length > 0) {
    baseQuery.brand = { $in: filter.Brand };
  }

  if (filter.searchText && filter.searchText.trim() !== "") {
    const searchRegex = new RegExp(filter.searchText.trim(), "i");
    baseQuery.$or = [
      { product_name: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
      { brand: { $regex: searchRegex } },
    ];
  }

  return baseQuery;
}

module.exports = frontendproductlistbycategory;
