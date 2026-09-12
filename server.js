import express from "express"
import PRODUCTS_ROUTER from "./src/routers/productsRouter.js"
import CARTS_ROUTER from "./src/routers/cartsRouter.js"

const APP = express()
const PORT = 8080
APP.use(express.json())
APP.use(express.urlencoded({ extended: true }))
APP.use("/public", express.static('public'))

APP.use("/api/products", PRODUCTS_ROUTER)
APP.use("/api/carts", CARTS_ROUTER)

APP.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})