import { PM } from "../DAO/productManager.js"

class ProductService {
    constructor() {
        this.PM = PM
    }
    async getProducts() {
        return this.PM.getProduct()
    }
    async getProductById(id) {
        return this.PM.getProductById(id)
    }
    async addProduct(product) {
        return this.PM.addProduct(product)
    }
    async updateProduct(id, product) {
        return this.PM.updateProduct(id, product)
    }
    async deleteProduct(id) {
        return this.PM.deleteProduct(id)
    }
}

export const productService = new ProductService()