import express from "express";
import { PM, UPLOADER_PRODUCTS } from "../utils.js"


const PRODUCTS_ROUTER = express.Router();

PRODUCTS_ROUTER.get("/", async (req, res) => {

    const limit = req.query.limit;
    const products = await PM.getProduct();
    if (limit) {
        return res.status(200).json(products.slice(0, limit));
    }
    return res.status(200).json(products);
});

PRODUCTS_ROUTER.get("/:pid", async (req, res) => {
    const id = req.params.pid
    const product = await PM.getProductById(id)

    if (product) {
        return res.status(200).json(product)
    } else {
        return res.status(404).json({ error: "Product not found" })
    }
})

PRODUCTS_ROUTER.post("/", UPLOADER_PRODUCTS.single("thumbnail"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No image provided" })
    }
    const { title, description, price, code, stock } = req.body;
    const thumbnail = req.file.filename;

    const ADD_PRODUCT = await PM.addProduct(title, description, price, thumbnail, code, stock);
    if (ADD_PRODUCT === "empty_fields") {
        return res.status(400).json({ error: "Empty fields" })
    }
    if (ADD_PRODUCT === "code_duplicate") {
        return res.status(400).json({ error: "Code duplicate" })
    }
    return res.status(201).json({ message: "Product added successfully" });
})

PRODUCTS_ROUTER.put("/:pid", async (req, res) => {
    const id = req.params.pid
    const UPDATED = await PM.updateProduct(id, req.body);
    if (UPDATED === "code_duplicate") {
        return res.status(400).json({ error: "Code duplicate" })
    }
    if (!UPDATED) {
        return res.status(404).json({ error: "Product not found" })
    }
    return res.status(200).json({ message: "Product updated successfully" });
})

PRODUCTS_ROUTER.delete("/:pid", async (req, res) => {
    const id = req.params.pid
    const DELETED = await PM.deleteProduct(id);
    if (!DELETED) {
        return res.status(404).json({ error: "Product not found" })
    }
    return res.status(200).json({ message: "Product deleted successfully" });
})

export default PRODUCTS_ROUTER
