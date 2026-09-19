const socket = io()

const chatForm = document.getElementById('chat-form')

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = document.getElementById('chat-input').value
    socket.emit('chat message', message)
    document.getElementById('chat-input').value = ''
})

socket.on('chat message', (message) => {
    const messages = document.getElementById('messages')
    const messageElement = document.createElement('li')
    messageElement.textContent = message
    messages.appendChild(messageElement)
})