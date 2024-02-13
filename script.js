const main = document.querySelector("main")
const emptyItem = document.createElement("div")
emptyItem.classList.add("emptyItem")

let draggableItemId = null

function renderBoards() {
    main.addEventListener("dragstart", e => {
        if (e.target.classList.contains("item")) {
            draggableItemId = e.target.id
            e.dataTransfer.effectAllowed = "move"
        }
    })

    main.addEventListener("dragover", e => {
        e.preventDefault()
        if (e.target.classList.contains("item")) {
            const itemStyle = e.target.getBoundingClientRect()
            e.clientY < itemStyle.y + itemStyle.height / 2 ? e.target.insertAdjacentElement("beforebegin", emptyItem) : e.target.insertAdjacentElement("afterend", emptyItem)
        }
        if (e.target.classList.contains("board") && (!e.target.children.length || e.clientY > e.target.lastElementChild.getBoundingClientRect().y)) {
            e.target.appendChild(emptyItem)
        }
        if (e.target.id === "main") {
            e.dataTransfer.dropEffect = "none"
            emptyItem.remove()
        }
    })

    main.addEventListener("drop", e => {
        const draggableItem = main.querySelector("#" + draggableItemId)
        if (e.target.classList.contains("board")) {
            e.target.replaceChild(draggableItem, emptyItem)
        }
        if (e.target.classList.contains("emptyItem")) {
            e.target.replaceWith(draggableItem)
        }
        if (e.target.classList.contains("item")) {
            const itemStyle = e.target.getBoundingClientRect()
            e.clientY < itemStyle.y + itemStyle.height / 2 ? e.target.insertAdjacentElement("beforebegin", draggableItem) : e.target.insertAdjacentElement("afterend", draggableItem)
        }
        emptyItem.remove()
        const sound = new Audio("./audio/dropSound.mp3")
        sound.play()
    })

    main.addEventListener("dragend", e => {
        if (e.dataTransfer.dropEffect === "none") {
            emptyItem.remove()
            const sound = new Audio("./audio/failSound.mp3")
            sound.play()
        }
    })
}

window.addEventListener("DOMContentLoaded", renderBoards)