const products = require('../models/productModel')
const brands = require('../models/brandModel');
const users = require('../models/userModel');

exports.addProductController = async (req, res) => {
    console.log("inside addProductController");
    const { productName, description, price, category, brand, productImage } = req.body;
    const userId = req.userId;
    try {
        const existingBrand = await brands.findOne({ brandName: brand })
        if (existingBrand) {
            if (existingBrand.categories.includes(category)) {
                const newProduct = new products({
                    productName, description, price, category, brand, productImage, userId: userId
                })
                await newProduct.save()
                res.status(200).json(newProduct)
            } else {
                res.status(400).json("Category not found in the brand's category list")
            }
        } else {
            res.status(401).json("Brand does not exist")
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.updateProductController = async (req, res) => {
    console.log("inside updateProductController");
    const { productName, description, price, category, brand, productImage } = req.body;
    const userId = req.userId;
    const { id } = req.params;
    try {
        const existingProduct = await products.findById(id);
        if (existingProduct) {
            if (existingProduct.userId == userId) {
                const updatedProduct = await products.findByIdAndUpdate({ _id: id }, {
                    productName, description, price, category, brand, productImage, userId
                }, { new: true })
                await updatedProduct.save()
                res.status(200).json(updatedProduct)
            } else {
                res.status(403).json("Forbidden request")
            }
        } else {
            res.status(404).json("Product Not Found")
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.deleteProductController = async (req, res) => {
    console.log("inside deleteProductController");
    const userId = req.userId;
    const { id } = req.params;
    try {
        const existingProduct = await products.findById(id);
        if (existingProduct) {
            if (existingProduct.userId == userId) {
                const deletedProduct = await products.findByIdAndDelete({ _id: id })
                res.status(200).json(deletedProduct)
            } else {
                res.status(403).json("Forbidden request")
            }
        } else {
            res.status(404).json("Product Not Found")
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.getAllProductsController = async (req, res) => {
    const { sort="createdAt ", order="asc", brand, category } = req.query;
    const userId = req.userId
    try {
        // Get IDs of users who blocked the current user
        const blockedBy = await users.find({ blockedUsers: userId }).distinct('_id');
        const filtered = { addedBy: { $nin: blockedBy } };
        if (brand) filtered.brand = brand;
        if (category) filtered.category = category;
        const allProducts = await products.find(filtered).sort({ [sort]: order === "asc" ? 1 : -1 })
        res.status(200).json(allProducts)
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.getMyProductsController = async (req, res) => {
    const userId = req.userId;
    try {
      const myProducts = await products.find({ userId }); 
      res.status(200).json(myProducts);
    } catch (err) {
      res.status(400).json(err);
    }
  };