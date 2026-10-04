import express from "express";
import { cartService } from "../services/cartService.js";

const VIEW_CART_ROUTER = express.Router()

VIEW_CART_ROUTER.get("/:cid", async (req, res) => {
    try {
        const cart = await cartService.getCartDetail(req.params.cid)
        if (!cart) {
            return res.status(404).render("cart", { notFound: true })
        }
        return res.render("cart", cart)
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).render("cart", { notFound: true })
        }
        console.error(error)
        return res.status(500).send("Internal server error")
    }
})

export default VIEW_CART_ROUTER
