const main = document.querySelector("main")
const emptyItem = document.createElement("div")
emptyItem.classList.add("emptyItem")

let draggableItemId = null

function renderBoards() {
    main.addEventListener("dragstart", e => {
        if(e.target.classList.contains("item")) {
            draggableItemId = e.target.id
            e.dataTransfer.effectAllowed = "move"
        }
    })

    main.addEventListener("dragover", e => {
        e.preventDefault()
        if(e.target.classList.contains("item")) {
            e.dataTransfer.dropEffect = "none"
            const itemStyle = e.target.getBoundingClientRect()
            e.clientY < itemStyle.y + itemStyle.height / 2 ? e.target.insertAdjacentElement("beforebegin", emptyItem) : e.target.insertAdjacentElement("afterend", emptyItem)
        }
    })

    main.addEventListener("dragenter", e => {
        if(e.target.classList.contains("emptyItem")) {
            emptyItem.style.border = "1px solid gray"
        }
        if(e.target.classList.contains("board")) {
            if(!e.target.children.length || e.clientY > e.target.lastElementChild.getBoundingClientRect().y) {
                e.target.appendChild(emptyItem)
            } else {
                e.dataTransfer.dropEffect = "none"
            }
        }
    })

    main.addEventListener("drop", e => {
        const draggableItem = main.querySelector("#" + draggableItemId)
        if(
            e.target.classList.contains("board") && 
            (!e.target.children.length || e.clientY > e.target.lastElementChild.getBoundingClientRect().y)
        ) {
            e.target.replaceChild(draggableItem, emptyItem)
        } else if(e.target.classList.contains("emptyItem")) {
            e.target.replaceWith(draggableItem)
        }
        const sound = new Audio("./audio/dropSound.mp3")
        sound.play()
    })

    main.addEventListener("dragend", e => {
        if(e.dataTransfer.dropEffect === "none") {
            emptyItem.remove()
            const sound = new Audio("./audio/failSound.mp3")
            sound.play()
        }
    })
}

window.addEventListener("DOMContentLoaded", renderBoards)