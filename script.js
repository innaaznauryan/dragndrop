const main = document.getElementById("main")
const boards = main.querySelectorAll(".board")
const emptyItem = document.createElement("div")
emptyItem.classList.add("emptyItem")

let draggableItemId = null

function renderBoards() {
    Array.from(boards).forEach(board => {
        const items = board.children

        board.addEventListener("dragover", e => {
            if(e.target.classList.contains("board") && 
            (!e.target.children.length || e.clientY > e.target.lastElementChild.getBoundingClientRect().bottom) || 
            e.target.classList.contains("emptyItem")) {
                e.preventDefault()
            }
        })

        Array.from(items).forEach(item => {
            item.addEventListener("dragstart", e => {
                draggableItemId = e.target.id
                e.dataTransfer.effectAllowed = "move"
            })
        })

        board.addEventListener("dragleave", e => {
            if(e.target.classList.contains("item")) {
                const itemStyle = e.target.getBoundingClientRect()
                e.clientY < itemStyle.y + itemStyle.height / 2 ? e.target.insertAdjacentElement("beforebegin", emptyItem) : e.target.insertAdjacentElement("afterend", emptyItem)
            }
        })

        board.addEventListener("dragenter", e => {
            if(e.target.classList.contains("board") && (!e.target.children.length || e.clientY > e.target.lastElementChild.getBoundingClientRect().y)) {
                e.target.appendChild(emptyItem)
            } else if(e.target.classList.contains("emptyItem")) {
                emptyItem.style.border = "1px solid gray"
            }
        })

        board.addEventListener("drop", e => {
            const draggableItem = main.querySelector("#" + draggableItemId)
            if(e.target.classList.contains("board") && 
            (!e.target.children.length || e.clientY > e.target.lastElementChild.getBoundingClientRect().y) || 
            e.target.classList.contains("emptyItem")) {
                board.replaceChild(draggableItem, emptyItem)
            }
            const sound = new Audio("./audio/dropSound.mp3")
            sound.play()
        })

        Array.from(items).forEach(item => {
            item.addEventListener("dragend", e => {
                if(e.dataTransfer.dropEffect === "none") {
                    emptyItem.remove()
                }
            })
        })
    })
}

window.addEventListener("DOMContentLoaded", renderBoards)