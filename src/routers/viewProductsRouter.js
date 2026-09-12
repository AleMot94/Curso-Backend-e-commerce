import express from "express";
import { PM } from "../utils.js"

const PRODUCTS_VIEW_ROUTER = express.Router()

PRODUCTS_VIEW_ROUTER.get("/", (req, res) => {
    const products = PM.getProduct()
    return res.render("products", { products })

})

export default PRODUCTS_VIEW_ROUTER
