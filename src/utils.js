import multer from "multer"
import path from "path";
import Product from "./DAO/models/Product.js";
import Cart from "./DAO/models/Cart.js";

export const __DIRNAME = import.meta.dirname;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__DIRNAME, "..", "public", "images", "products"))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
export const UPLOADER_PRODUCTS = multer({ storage });

// class ProductManager {

//     async getProduct() {
//         return await Product.find();
//     }

//     async addProduct(title, description, price, thumbnail, code, stock) {
//         try {
//             const NEW_PRODUCT = await Product.create({
//                 title,
//                 description,
//                 price,
//                 thumbnail,
//                 code,
//                 stock,
//             });
//             return NEW_PRODUCT;
//         } catch (error) {
//             if (error.code === 11000) {
//                 return "code_duplicate";
//             }
//             if (error.name === "ValidationError") {
//                 return "empty_fields";
//             }
//             throw error;
//         }
//     }

//     async getProductById(id) {
//         try {
//             const product = await Product.findById(id);
//             if (!product) {
//                 return;
//             }
//             return product;
//         } catch (error) {
//             return;
//         }
//     }

//     async updateProduct(id, upd) {
//         try {
//             const UPDATED = await Product.findByIdAndUpdate(id, upd, {
//                 new: true,
//                 runValidators: true,
//             });
//             return UPDATED;
//         } catch (error) {
//             if (error.code === 11000) {
//                 return "code_duplicate";
//             }
//             return;
//         }
//     }

//     async deleteProduct(id) {
//         try {
//             const DELETED = await Product.findByIdAndDelete(id);
//             return DELETED;
//         } catch (error) {
//             return;
//         }
//     }
// }

// class CartManager {

//     async getCart() {
//         return await Cart.find();
//     }

//     async addCart() {
//         const NEW_CART = await Cart.create({ products: [] });
//         return NEW_CART;
//     }

//     async getCartById(id) {
//         try {
//             const cart = await Cart.findById(id);
//             if (!cart) {
//                 return;
//             }
//             return cart;
//         } catch (error) {
//             return;
//         }
//     }

//     async deleteCart(id) {
//         try {
//             const DELETED = await Cart.findByIdAndDelete(id);
//             return DELETED;
//         } catch (error) {
//             return;
//         }
//     }

//     async updateCart(id, upd) {
//         try {
//             const UPDATED = await Cart.findByIdAndUpdate(id, upd, {
//                 new: true,
//                 runValidators: true,
//             });
//             return UPDATED;
//         } catch (error) {
//             return;
//         }
//     }
// }

// export const PM = new ProductManager();
// export const CM = new CartManager()
