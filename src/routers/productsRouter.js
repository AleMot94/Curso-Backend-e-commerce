import express from "express";
import PM from "../utils.js"


const Router = express.Router();

Router.get("/", async (req, res) => {

    const limit = req.query.limit;
    if (limit) {
        return res.status(200).json(PM.getProduct().slice(0, limit));
    }
    return res.status(200).json(PM.getProduct());
});

Router.get("/:pid", (req, res) => {
    const id = Number(req.params.pid)
    const product = PM.getProductById(id)

    if (product) {
        return res.status(200).json(product)
    } else {
        return res.status(404).json({ error: "Product not found" })
    }
})

Router.post("/", (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    PM.addProduct(title, description, price, thumbnail, code, stock);
    return res.status(201).json({ message: "Product added successfully" });
})

Router.put("/:pid", (req, res) => {
    const id = Number(req.params.pid)
    PM.updateProduct(id, req.body);
    return res.status(200).json({ message: "Product updated successfully" });
})

Router.delete("/:pid", (req, res) => {
    const id = Number(req.params.pid)
    PM.deleteProduct(id);
    return res.status(200).json({ message: "Product deleted successfully" });
})

export default Router