
const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path || "products.json";
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
            console.log("Todos los campos son obligatorios");
            return;
        }
        this.products = this.#readFile();
        const CODE_EXIST = this.products.find(product => product.code === code);
        if (CODE_EXIST) {
            console.log("Code duplicate");
            return;
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
            console.log("Not found");
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

const PM = new ProductManager();

PM.addProduct("producto1", "descripcion1", 10, "thumbnail1", "code1", 0);

PM.addProduct("producto2", "descripcion2", 20, "thumbnail2", "code2", 20);

PM.addProduct("producto3", "descripcion3", 20, "thumbnail3", "code3", 40);

console.log(PM.products)
PM.getProductById(2);

PM.updateProduct(2, { price: 30, code: "code1" });
console.log(PM.getProductById(2));
PM.deleteProduct(2);
console.log(PM.products);
