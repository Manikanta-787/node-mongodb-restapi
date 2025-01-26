const express = require('express');
const router = express.Router();
const Product = require('../models/product.js');
express.Promise=global.Promise;
/* GET ALL PRODUCTS */
router.get('/', async function (req, res, next) {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        return next(error);
    }
});

/* GET SINGLE PRODUCT BY ID */
router.get('/:id', async function (req, res, next) {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        return next(error);
    }
});

/* SAVE PRODUCT */
router.post('/', function (req, res, next) {
    console.log("POST request received at /api/v1/products");
    console.log("Request Body:", req.body);
    try {
        console.log("post request recieved")
        console.log(req.body)
        const newProduct = new Product(req.body);
        newProduct.save().then((prod) => res.json(prod));
    } catch (error) {
        res.send('error')
        console.log("error occured")
        return next(error);
    }
});

/* UPDATE PRODUCT */
router.put('/:id', async function (req, res, next) {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        res.json(product);
    } catch (error) {
        return next(error);
    }
});

/* DELETE PRODUCT */
router.delete('/:id', async function (req, res, next) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json(product);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;