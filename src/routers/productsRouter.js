import express from "express";
import { UPLOADER_PRODUCTS } from "../config/multer.js"
import { productService } from "../services/productService.js";


const PRODUCTS_ROUTER = express.Router();

PRODUCTS_ROUTER.get("/", async (req, res) => {
    try {
        const limit = Number(req.query.limit);
        const page = Number(req.query.page);
        const outofstock = req.query.outofstock
        if (page < 1 || limit < 1) {
            return res.status(400).json({
                status: "error",
                message: "Invalid page or limit",
                answer: null
            });
        }
        const products = await productService.getProducts(page, limit, outofstock);
        return res.status(200).json({
            status: "success",
            mesage: "Products found successfully",
            answer: products
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "error",
            message: "Error getting products",
            answer: null
        });
    }

});

PRODUCTS_ROUTER.get("/:pid", async (req, res) => {
    try {
        const id = req.params.pid
        const product = await productService.getProductById(id)

        if (product) {
            return res.status(200).json({
                status: "success",
                message: "Product found successfully",
                answer: product
            })
        } else {
            return res.status(404).json({
                status: "error",
                message: "Product not found",
                answer: null
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "error",
            message: "Error getting product",
            answer: null
        });
    }

})

PRODUCTS_ROUTER.post("/", UPLOADER_PRODUCTS.single("thumbnail"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: "error",
                message: "No image provided",
                answer: null
            })
        }
        const { title, description, price, code, stock } = req.body;
        const thumbnail = `/images/products/${req.file.filename}`;

        const ADD_PRODUCT = await productService.addProduct(title, description, price, thumbnail, code, stock);
        if (ADD_PRODUCT === "empty_fields") {
            return res.status(400).json({
                status: "error",
                message: "Empty fields",
                answer: null
            })
        }
        if (ADD_PRODUCT === "code_duplicate") {
            return res.status(400).json({ error: "Code duplicate" })
        }
        return res.status(201).json({
            status: "success",
            message: "Product added successfully",
            answer: ADD_PRODUCT
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "error",
            message: "Error getting products",
            answer: null
        });
    }

})

PRODUCTS_ROUTER.put("/:pid", async (req, res) => {
    try {
        const id = req.params.pid
        const UPDATED = await productService.updateProduct(id, req.body);
        if (UPDATED === "code_duplicate") {
            return res.status(500).json({
                status: "error",
                message: "Code duplicate",
                answer: null
            })
        }
        if (!UPDATED) {
            return res.status(404).json({
                status: "error",
                message: "Product not found",
                answer: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Product updated successfully",
            answer: UPDATED
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            answer: null
        });
    }

})

PRODUCTS_ROUTER.delete("/:pid", async (req, res) => {
    try {
        const id = req.params.pid
        const DELETED = await productService.deleteProduct(id);
        if (!DELETED) {
            return res.status(404).json({
                status: "error",
                message: "Product not found",
                answer: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Product deleted successfully",
            answer: DELETED
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "error",
            message: "Error getting products",
            answer: null
        });
    }
})

export default PRODUCTS_ROUTER
