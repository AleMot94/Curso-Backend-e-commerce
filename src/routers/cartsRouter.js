import express from "express";
import { CM } from "../DAO/cartManager.js";
import { productService } from "../services/productService.js"

const CARTS_ROUTER = express.Router();

CARTS_ROUTER.post("/", async (req, res) => {
    try {
        const NEW_CART = await CM.addCart();
        return res.status(201).json({
            status: "success",
            message: "Cart added successfully",
            answer: NEW_CART
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            answer: null
        });
    }
});

CARTS_ROUTER.post("/:cid/product/:pid", async (req, res) => {
    try {
        const ID_CART = req.params.cid;
        const ID_PRODUCT = req.params.pid;

        const CART = await CM.getCartById(ID_CART);
        const PRODUCT = await productService.getProductById(ID_PRODUCT);

        if (!CART) {
            return res.status(404).json({
                status: "error",
                message: "Cart not found",
                answer: null
            });
        }
        if (!PRODUCT) {
            return res.status(404).json({
                status: "error",
                message: "Product not found",
                answer: null
            });
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
        return res.status(200).json({
            status: "success",
            message: "Product added to cart successfully",
            answer: null
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            answer: null
        });
    }
});

CARTS_ROUTER.get("/", async (req, res) => {
    try {
        const carts = await CM.getCart();
        return res.status(200).json({
            status: "success",
            message: "Carts found successfully",
            answer: carts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            answer: null
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
                answer: cart.products
            });
        } else {
            return res.status(404).json({
                status: "error",
                message: "Cart not found",
                answer: null
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            answer: null
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
                answer: null
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Cart deleted successfully",
            answer: null
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            answer: null
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
                answer: null
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Cart updated successfully",
            answer: null
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
            answer: null
        });
    }
});
export default CARTS_ROUTER
