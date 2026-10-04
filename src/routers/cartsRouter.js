import express from "express";
import { CM } from "../DAO/cartManager.js";
import { cartService } from "../services/cartService.js"

const CARTS_ROUTER = express.Router();

CARTS_ROUTER.post("/", async (req, res) => {
    try {
        const NEW_CART = await CM.addCart();
        return res.status(201).json({
            status: "success",
            message: "Cart added successfully",
            payload: NEW_CART
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            payload: null
        });
    }
});

CARTS_ROUTER.post("/:cid/product/:pid", async (req, res) => {
    try {
        const result = await cartService.addProductToCart(req.params.cid, req.params.pid);

        if (result === "cart_not_found") {
            return res.status(404).json({
                status: "error",
                message: "Cart not found",
                payload: null
            });
        }
        if (result === "product_not_found") {
            return res.status(404).json({
                status: "error",
                message: "Product not found",
                payload: null
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Product added to cart successfully",
            payload: null
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            payload: null
        });
    }
});

CARTS_ROUTER.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const result = await cartService.removeProductFromCart(req.params.cid, req.params.pid);

        if (result === "cart_not_found") {
            return res.status(404).json({
                status: "error",
                message: "Cart not found",
                payload: null
            });
        }
        if (result === "product_not_in_cart") {
            return res.status(404).json({
                status: "error",
                message: "Product not found in cart",
                payload: null
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Product removed from cart successfully",
            payload: null
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            payload: null
        });
    }
});

CARTS_ROUTER.delete("/:cid/products", async (req, res) => {
    try {
        const result = await cartService.clearCart(req.params.cid);

        if (result === "cart_not_found") {
            return res.status(404).json({
                status: "error",
                message: "Cart not found",
                payload: null
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Cart emptied successfully",
            payload: null
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            payload: null
        });
    }
});

CARTS_ROUTER.get("/", async (req, res) => {
    try {
        const carts = await CM.getCart();
        return res.status(200).json({
            status: "success",
            message: "Carts found successfully",
            payload: carts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            payload: null
        });
    }
});

CARTS_ROUTER.get("/:cid", async (req, res) => {
    try {
        const id = req.params.cid;
        const cart = await CM.getCartById(id);
        if (cart) {
            return res.status(200).json({
                status: "success",
                message: "Cart found successfully",
                payload: cart.products
            });
        } else {
            return res.status(404).json({
                status: "error",
                message: "Cart not found",
                payload: null
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            payload: null
        });
    }
});


CARTS_ROUTER.delete("/:cid", async (req, res) => {
    try {
        const id = req.params.cid;
        const CART = await CM.deleteCart(id);
        if (!CART) {
            return res.status(404).json({
                status: "error",
                message: "Cart not found",
                payload: null
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Cart deleted successfully",
            payload: null
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            payload: null
        });
    }
});

CARTS_ROUTER.put("/:cid/product/:pid", async (req, res) => {
    try {
        const result = await cartService.updateProductQuantity(req.params.cid, req.params.pid, req.body?.quantity);

        if (result === "invalid_quantity") {
            return res.status(400).json({
                status: "error",
                message: "Quantity must be a positive integer",
                payload: null
            });
        }
        if (result === "cart_not_found") {
            return res.status(404).json({
                status: "error",
                message: "Cart not found",
                payload: null
            });
        }
        if (result === "product_not_in_cart") {
            return res.status(404).json({
                status: "error",
                message: "Product not found in cart",
                payload: null
            });
        }
        if (result.error === "insufficient_stock") {
            return res.status(409).json({
                status: "error",
                message: "Quantity exceeds available stock",
                payload: { stock: result.stock }
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Product quantity updated successfully",
            payload: null
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            payload: null
        });
    }
});

CARTS_ROUTER.put("/:cid", async (req, res) => {
    try {
        const id = req.params.cid;
        const { products } = req.body;
        const CART = await CM.updateCart(id, { products });
        if (!CART) {
            return res.status(404).json({
                status: "error",
                message: "Cart not found",
                payload: null
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Cart updated successfully",
            payload: null
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            payload: null
        });
    }
});
export default CARTS_ROUTER
