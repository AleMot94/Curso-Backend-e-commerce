import express from "express"
import PRODUCTS_ROUTER from "./src/routers/productsRouter.js"
import CARTS_ROUTER from "./src/routers/cartsRouter.js"
import PRODUCTS_VIEW_ROUTER from "./src/routers/viewProductsRouter.js"
import { engine } from 'express-handlebars';


const APP = express()
const PORT = 8080
const __DIRNAME = import.meta.dirname

APP.use(express.json())
APP.use(express.urlencoded({ extended: true }))
APP.use(express.static(__DIRNAME + '/public'))


APP.use("/api/products", PRODUCTS_ROUTER)
APP.use("/api/carts", CARTS_ROUTER)

APP.engine('handlebars', engine());
APP.set('view engine', 'handlebars');
APP.set('views', __DIRNAME + '/src/views');

APP.use("/view/products", PRODUCTS_VIEW_ROUTER)
//APP.use("/view/carts", CARTS_VIEW_ROUTER)

APP.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})