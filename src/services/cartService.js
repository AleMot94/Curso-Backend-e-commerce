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
}

export const cartService = new CartService()