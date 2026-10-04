import { CM } from "../DAO/cartManager.js"
import { PM } from "../DAO/productManager.js"

class CartService {
    constructor() {
        this.CM = CM
        this.PM = PM
    }
    async getCart() {
        return this.CM.getCart()
    }
    async addCart() {
        return this.CM.addCart()
    }
    async getCartById(id) {
        return this.CM.getCartById(id)
    }
    async deleteCart(id) {
        return this.CM.deleteCart(id)
    }
    async updateCart(id, cart) {
        return this.CM.updateCart(id, cart)
    }
    async addProductToCart(cid, pid, quantity) {
        const product = await this.PM.getProductById(pid)
        if (!product) {
            return "not_found"
        }
        const cart = await this.CM.getCartById(cid)
        if (!cart) {
            return "not_found"
        }
        return this.CM.addProductToCart(cid, pid, quantity)
    }
    async removeProductFromCart(cid, pid) {
        const cart = await this.CM.getCartById(cid)
        if (!cart) {
            return "cart_not_found"
        }
        const exists = cart.products.some(item => item.product.toString() === pid)
        if (!exists) {
            return "product_not_in_cart"
        }
        const products = cart.products.filter(item => item.product.toString() !== pid)
        return this.CM.updateCart(cid, { products })
    }
    async updateProductQuantity(cid, pid, quantity) {
        if (!Number.isInteger(quantity) || quantity < 1) {
            return "invalid_quantity"
        }
        const cart = await this.CM.getCartById(cid)
        if (!cart) {
            return "cart_not_found"
        }
        const item = cart.products.find(item => item.product.toString() === pid)
        if (!item) {
            return "product_not_in_cart"
        }
        const product = await this.PM.getProductById(pid)
        if (!product) {
            return "product_not_in_cart"
        }
        if (quantity > product.stock) {
            return { error: "insufficient_stock", stock: product.stock }
        }
        item.quantity = quantity
        return this.CM.updateCart(cid, { products: cart.products })
    }
}

export const cartService = new CartService()