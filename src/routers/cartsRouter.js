import express from "express";
import { CM, PM } from "../utils.js"

const CARTS_ROUTER = express.Router();

CARTS_ROUTER.post("/", async (req, res) => {
    const NEW_CART = await CM.addCart();
    return res.status(201).json({ message: "Cart added successfully", cart: NEW_CART });
});

CARTS_ROUTER.post("/:cid/product/:pid", async (req, res) => {
    const ID_CART = req.params.cid;
    const ID_PRODUCT = req.params.pid;

    const CART = await CM.getCartById(ID_CART);
    const PRODUCT = await PM.getProductById(ID_PRODUCT);

    if (!CART) {
        return res.status(404).json({ error: "Cart not found" });
    }
    if (!PRODUCT) {
        return res.status(404).json({ error: "Product not found" });
    }

    const productIndex = CART.products.findIndex(item => item.product.toString() === ID_PRODUCT);

    if (productIndex === -1) {
        CART.products.push({
            product: PRODUCT._id,
            quantity: 1,
        });
    } else {
        CART.products[productIndex].quantity++;
    }
    await CM.updateCart(ID_CART, { products: CART.products });
    return res.status(200).json({ message: "Product added to cart successfully" });
});

CARTS_ROUTER.get("/", async (req, res) => {
    const carts = await CM.getCart();
    return res.status(200).json(carts);
});

CARTS_ROUTER.get("/:cid", async (req, res) => {
    const id = req.params.cid;
    const cart = await CM.getCartById(id);
    if (cart) {
        return res.status(200).json(cart.products);
    } else {
        return res.status(404).json({ error: "Cart not found" });
    }
});


CARTS_ROUTER.delete("/:cid", async (req, res) => {
    const id = req.params.cid;
    const CART = await CM.deleteCart(id);
    if (!CART) {
        return res.status(404).json({ error: "Cart not found" });
    }
    return res.status(200).json({ message: "Cart deleted successfully" });
});

CARTS_ROUTER.put("/:cid", async (req, res) => {
    const id = req.params.cid;
    const { products } = req.body;
    const CART = await CM.updateCart(id, { products });
    if (!CART) {
        return res.status(404).json({ error: "Cart not found" });
    }
    return res.status(200).json({ message: "Cart updated successfully" });
});
export default CARTS_ROUTER
