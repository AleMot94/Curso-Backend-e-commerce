import "dotenv/config"
import express from "express"
import PRODUCTS_ROUTER from "./src/routers/productsRouter.js"
import CARTS_ROUTER from "./src/routers/cartsRouter.js"
import PRODUCTS_VIEW_ROUTER from "./src/routers/viewProductsRouter.js"
import VIEW_CHAT_ROUTER from "./src/routers/viewChatRouter.js"
import { engine } from 'express-handlebars';
import { createServer } from 'http'
import { Server } from "socket.io"
import { connectDB } from "./src/config/db.js"


const APP = express()
const PORT = process.env.PORT || 8080
const __DIRNAME = import.meta.dirname
const HTTP_SERVER = createServer(APP)
const IO = new Server(HTTP_SERVER)

APP.use(express.json())
APP.use(express.urlencoded({ extended: true }))
APP.use(express.static(__DIRNAME + '/public'))

IO.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`)

    socket.on('chat message', (message) => {
        IO.emit('chat message', message)
    })
})

APP.use("/api/products", PRODUCTS_ROUTER)
APP.use("/api/carts", CARTS_ROUTER)

APP.engine('handlebars', engine());
APP.set('view engine', 'handlebars');
APP.set('views', __DIRNAME + '/src/views');

APP.use("/view/products", PRODUCTS_VIEW_ROUTER)
APP.use("/view/chat", VIEW_CHAT_ROUTER)

const startServer = async () => {
    await connectDB()
    HTTP_SERVER.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

startServer()
