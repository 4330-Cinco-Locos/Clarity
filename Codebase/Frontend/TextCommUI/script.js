const chatMessages = document.querySelector(".messages")
const chatInputForm = document.querySelector(".user-input-form")
const chatInput = document.querySelector(".my-input")

const createMessageElement = (message) => {
    <div class = "message ${message.sender === 'me' ? 'my-messages' : 'other-messages'}">
        <div class = "message-sender">${message.sender}</div>
        <div class = "message-body">${message.text}</div>
        <div class = "time">${message.timestamp}</div>
    </div>
}

let messageSender = 'me'
const updateSender = (name) =>
{
    messageSender = name
    chatInput.focus()
}

const sendMessage = (e) => {
    e.preventDefault()

    const timestamp = new Date().toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    }
    chatMessages.innerHTML += createMessageElement(message)
}

chatInputForm.addEventListener('submit', sendMessage)