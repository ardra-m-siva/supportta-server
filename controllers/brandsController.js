const brands = require('../models/brandModel')

exports.addBrandController = async (req, res) => {
    console.log("inside addBrandController");
    const { brandName, brandLogo, categories } = req.body;
    try {
        const existingBrand = await brands.findOne({ brandName })
        if (existingBrand) {
            res.status(400).json("Brand already exists")
        } else {
            const newBrand = new brands({
                brandName, brandLogo, categories
            })
            await newBrand.save()
            res.status(200).json(newBrand)
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.getAllBrandController = async (req, res) => {
    console.log("inside getAllBrandController");
    try {
        const allBrands = await brands.find()
        res.status(200).json(allBrands)
    } catch (err) {
        res.status(400).json(err)
    }
}

