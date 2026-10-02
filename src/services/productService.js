import { PM } from "../DAO/productManager.js"

class ProductService {
    constructor() {
        this.PM = PM
    }
    async getProducts(page, limit) {
        // Los valores llegan como string desde la query; si no son enteros positivos, se usan los defaults
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const validPage = Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1
        const validLimit = Number.isInteger(limitNumber) && limitNumber > 0 ? limitNumber : 10
        return this.PM.getProduct(validPage, validLimit)
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