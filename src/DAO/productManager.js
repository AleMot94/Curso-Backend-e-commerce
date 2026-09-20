import Product from "./models/Product.js";


class ProductManager {

    async getProduct() {
        return await Product.find();
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const NEW_PRODUCT = await Product.create({
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            });
            return NEW_PRODUCT;
        } catch (error) {
            if (error.code === 11000) {
                return "code_duplicate";
            }
            if (error.name === "ValidationError") {
                return "empty_fields";
            }
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const product = await Product.findById(id);
            if (!product) {
                return;
            }
            return product;
        } catch (error) {
            return;
        }
    }

    async updateProduct(id, upd) {
        try {
            const UPDATED = await Product.findByIdAndUpdate(id, upd, {
                new: true,
                runValidators: true,
            });
            return UPDATED;
        } catch (error) {
            if (error.code === 11000) {
                return "code_duplicate";
            }
            return;
        }
    }

    async deleteProduct(id) {
        try {
            const DELETED = await Product.findByIdAndDelete(id);
            return DELETED;
        } catch (error) {
            return;
        }
    }
}

export const PM = new ProductManager();