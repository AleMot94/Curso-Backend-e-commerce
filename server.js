import PM from "./productManagerClass.js"
import express from "express"

const APP = express()
const PORT = 8080
APP.use(express.urlencoded({ extended: true }))

APP.get("/products", (req, res) => {
    const limit = req.query.limit

    if (limit) {
        return res.json(PM.getProduct().slice(0, limit))
    }
    return res.json(PM.getProduct())
})

APP.get("/products/:pid", (req, res) => {
    const id = Number(req.params.pid)
    const product = PM.getProductById(id)

    if (product) {
        return res.json(product)
    } else {
        return res.status(404).json({ error: "Product not found" })
    }
})

APP.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})