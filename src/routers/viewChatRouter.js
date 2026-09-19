import express from "express"

const VIEW_CHAT_ROUTER = express.Router()

VIEW_CHAT_ROUTER.get("/", (req, res) => {
    return res.render("chat", {})
})

export default VIEW_CHAT_ROUTER