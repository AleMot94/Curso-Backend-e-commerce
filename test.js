
class ProductManager {
    constructor() {
        this.products = []
    }

    #generateId() {
        const ID = this.products.reduce((maxId/*ACUMULADOR*/, product/*ELEMENTO ACTUAL - (INDEX, ARRAY*/) => {
            return product.id > maxId ? product.id : maxId;
        }, 0/*VALOS INICIAL ACUMULADOR*/) + 1
        return ID
    }

    getProduct() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || price === undefined || !thumbnail || !code || stock === undefined) {
            console.log("Todos los campos son obligatorios");
            return;
        }
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
    }
    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.log("Not foun");
            return;
        }
        return product;
    }

}

const PM = new ProductManager();

PM.addProduct("producto1", "descripcion1", 10, "thumbnail1", "", 0);

PM.addProduct("producto2", "descripcion2", 20, "thumbnail2", "code2", 20);

console.log(PM.products)
console.log(PM.getProductById(5));