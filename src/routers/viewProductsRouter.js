import express from "express";
import { productService } from "../services/productService.js";

const PRODUCTS_VIEW_ROUTER = express.Router()

PRODUCTS_VIEW_ROUTER.get("/", async (req, res) => {
    const products = await productService.getProducts(req.query.page)
    return res.render("products", {
        products: products.docs,
        page: products.page,
        pages: products.totalPages,
        hasNextPage: products.hasNextPage,
        hasPrevPage: products.hasPrevPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage
    })

})

export default PRODUCTS_VIEW_ROUTER
