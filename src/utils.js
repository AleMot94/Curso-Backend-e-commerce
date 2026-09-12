import fs from "fs";
import multer from "multer"
import path from "path";

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

class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path || "src/products.json";
    }

    #generateId() {
        const ID = this.products.reduce((maxId/*ACUMULADOR*/, product/*ELEMENTO ACTUAL - (INDEX, ARRAY*/) => {
            return product.id > maxId ? product.id : maxId;
        }, 0/*VALOS INICIAL ACUMULADOR*/) + 1
        return ID
    }
    #readFile() {
        try {
            const data = fs.readFileSync(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    #writeFile(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }

    getProduct() {
        return this.#readFile();
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || price === undefined || !thumbnail || !code || stock === undefined) {
            return "empty_fields";
        }
        this.products = this.#readFile();
        const CODE_EXIST = this.products.find(product => product.code === code);
        if (CODE_EXIST) {
            return "code_duplicate";
        }
        this.products.push({
            id: this.#generateId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        });
        this.#writeFile(this.products);

    }
    getProductById(id) {
        this.products = this.#readFile();
        const product = this.products.find(product => product.id === id);
        if (!product) {
            return;
        }
        return product;
    }

    updateProduct(id, upd) {
        this.products = this.#readFile();
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            console.log("Not found");
            return;
        }
        if (upd.code && this.products.some(product => product.code === upd.code && product.id !== id)) {
            console.log("Error: existing code");
            return;
        }
        this.products[index] = { ...this.products[index], ...upd, id: this.products[index].id };
        this.#writeFile(this.products);
    }

    deleteProduct(id) {
        this.products = this.#readFile();
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            console.log("Not found");
            return;
        }
        this.products.splice(index, 1);
        this.#writeFile(this.products);
    }
}

class CartManager {
    constructor(path) {
        this.carts = []
        this.path = path || "src/carts.json";
    }

    #generateId() {
        const ID = this.carts.reduce((maxId/*ACUMULADOR*/, cart/*ELEMENTO ACTUAL - (INDEX, ARRAY*/) => {
            return cart.id > maxId ? cart.id : maxId;
        }, 0/*VALOS INICIAL ACUMULADOR*/) + 1
        return ID
    }
    #readFile() {
        try {
            const data = fs.readFileSync(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    #writeFile(carts) {
        fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
    }

    getCart() {
        return this.#readFile();
    }

    addCart(product) {
        this.carts = this.#readFile();

        this.carts.push({
            id: this.#generateId(),
            products: [],
        });
        this.#writeFile(this.carts);

    }
    getCartById(id) {
        this.carts = this.#readFile();
        const cart = this.carts.find(cart => cart.id === id);
        if (!cart) {
            return;
        }
        return cart;
    }

    deleteCart(id) {
        this.carts = this.#readFile();
        const index = this.carts.findIndex(cart => cart.id === id);
        if (index === -1) {
            console.log("Not found");
            return;
        }
        this.carts.splice(index, 1);
        this.#writeFile(this.carts);
    }

    updateCart(id, upd) {
        // this.carts = this.#readFile();
        // const index = this.carts.findIndex(cart => cart.id === id);
        // if (index === -1) {
        //     console.log("Not found");
        //     return;
        // }
        // this.carts[index] = { ...this.carts[index], ...upd, id: this.carts[index].id };
        // this.#writeFile(this.carts);
    }

}

export const PM = new ProductManager();
export const CM = new CartManager()

