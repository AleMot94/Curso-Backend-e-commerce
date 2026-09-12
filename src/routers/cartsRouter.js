import express from "express";
import { CM, PM } from "../utils.js"

const CARTS_ROUTER = express.Router();

CARTS_ROUTER.post("/", (req, res) => {
    const { products } = req.body;
    CM.addCart(products);
    return res.status(201).json({ message: "Cart added successfully" });
});

CARTS_ROUTER.post("/:cid/product/:pid", (req, res) => {
    const ID_CART = Number(req.params.cid);
    const ID_PRODUCT = Number(req.params.pid);

    const CART = CM.getCartById(ID_CART);
    const PRODUCT = PM.getProductById(ID_PRODUCT);

    const productIndex = CART.products.findIndex(product => product.product_id === ID_PRODUCT);

    if (PRODUCT && CART) {
        if (productIndex === -1) {
            CART.products.push({
                product_id: PRODUCT.id,
                quantity: 1,
            });
        } else {
            CART.products[productIndex].quantity++;
        }
        CM.updateCart(ID_CART, { products: CART.products });
        return res.status(200).json({ message: "Product added to cart successfully" });
    }
});

CARTS_ROUTER.get("/", (req, res) => {
    const carts = CM.getCart();
    return res.status(200).json(carts);
});

CARTS_ROUTER.get("/:cid", (req, res) => {
    const id = Number(req.params.cid);
    const cart = CM.getCartById(id);
    if (cart) {
        return res.status(200).json(cart.products);
    } else {
        return res.status(404).json({ error: "Cart not found" });
    }
});


CARTS_ROUTER.delete("/:cid", (req, res) => {
    const id = Number(req.params.cid);
    CM.deleteCart(id);
    return res.status(200).json({ message: "Cart deleted successfully" });
});

CARTS_ROUTER.put("/:cid", (req, res) => {
    const id = Number(req.params.cid);
    const { products } = req.body;
    CM.updateCart(id, products);
    return res.status(200).json({ message: "Cart updated successfully" });
});
export default CARTS_ROUTER