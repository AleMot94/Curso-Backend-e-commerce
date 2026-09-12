import express from "express";
import { PM, UPLOADER_PRODUCTS } from "../utils.js"


const PRODUCTS_ROUTER = express.Router();

PRODUCTS_ROUTER.get("/", async (req, res) => {

    const limit = req.query.limit;
    if (limit) {
        return res.status(200).json(PM.getProduct().slice(0, limit));
    }
    return res.status(200).json(PM.getProduct());
});

PRODUCTS_ROUTER.get("/:pid", (req, res) => {
    const id = Number(req.params.pid)
    const product = PM.getProductById(id)

    if (product) {
        return res.status(200).json(product)
    } else {
        return res.status(404).json({ error: "Product not found" })
    }
})

PRODUCTS_ROUTER.post("/", UPLOADER_PRODUCTS.single("thumbnail"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No image provided" })
    }
    const { title, description, price, code, stock } = req.body;
    const thumbnail = req.file.filename;

    const ADD_PRODUCT = PM.addProduct(title, description, price, thumbnail, code, stock);
    if (ADD_PRODUCT === "empty_fields") {
        return res.status(400).json({ error: "Empty fields" })
    }
    if (ADD_PRODUCT === "code_duplicate") {
        return res.status(400).json({ error: "Code duplicate" })
    }
    return res.status(201).json({ message: "Product added successfully" });
})

PRODUCTS_ROUTER.put("/:pid", (req, res) => {
    const id = Number(req.params.pid)
    PM.updateProduct(id, req.body);
    return res.status(200).json({ message: "Product updated successfully" });
})

PRODUCTS_ROUTER.delete("/:pid", (req, res) => {
    const id = Number(req.params.pid)
    PM.deleteProduct(id);
    return res.status(200).json({ message: "Product deleted successfully" });
})

export default PRODUCTS_ROUTER