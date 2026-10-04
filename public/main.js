const createCart = async () => {
    const res = await fetch("/api/carts", { method: "POST" })
    const data = await res.json()
    localStorage.setItem("cartId", data.payload._id)
    return data.payload._id
}

const getCartId = async () => localStorage.getItem("cartId") || createCart()

const addToCart = async (pid, retry = true) => {
    const cid = await getCartId()
    const res = await fetch(`/api/carts/${cid}/product/${pid}`, { method: "POST" })
    const data = await res.json()

    if (res.status === 404 && data.message === "Cart not found" && retry) {
        localStorage.removeItem("cartId")
        return addToCart(pid, false)
    }
    alert(data.status === "success" ? "Producto agregado al carrito" : data.message)
}

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart")
    if (btn) addToCart(btn.dataset.id)
})
