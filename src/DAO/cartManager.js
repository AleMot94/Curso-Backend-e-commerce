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
        try {
            const cart = await Cart.findById(id);
            if (!cart) {
                return;
            }
            return cart;
        } catch (error) {
            return;
        }
    }

    async deleteCart(id) {
        try {
            const DELETED = await Cart.findByIdAndDelete(id);
            return DELETED;
        } catch (error) {
            return;
        }
    }

    async updateCart(id, upd) {
        try {
            const UPDATED = await Cart.findByIdAndUpdate(id, upd, {
                new: true,
                runValidators: true,
            });
            return UPDATED;
        } catch (error) {
            return;
        }
    }
}

export const CM = new CartManager()