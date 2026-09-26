import Cart from "./models/Cart.js";

class CartManager {

    async getCart() {
        return await Cart.find();
    }

    async addCart() {
        const NEW_CART = await Cart.create({ products: [] });
        return NEW_CART;
    }

    async getCartById(id) {
        const cart = await Cart.findById(id);
        if (!cart) {
            return;
        }
        return cart;
    }

    async deleteCart(id) {
        const DELETED = await Cart.findByIdAndDelete(id);
        return DELETED;
    }

    async updateCart(id, upd) {
        const UPDATED = await Cart.findByIdAndUpdate(id, upd, {
            new: true,
            runValidators: true,
        });
        return UPDATED;
    }
}

export const CM = new CartManager()
