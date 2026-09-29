import { faker } from "@faker-js/faker";
import Product from "../DAO/models/Product.js";

export async function crearProductos() {

    const productos = [];
    for (let i = 0; i < 10000; i++) {
        productos.push({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            thumbnail: faker.image.url(),
            code: faker.string.uuid(),
            stock: faker.number.int({ min: 0, max: 100 }),
        });
    }

    try {
        await Product.insertMany(productos);
        console.log(`Se crearon ${productos.length} productos`);
    } catch (error) {
        console.error("Error al insertar los productos", error);
    }

}
