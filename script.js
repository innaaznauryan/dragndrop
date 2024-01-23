const main = document.getElementById("main")
const boards = main.querySelectorAll(".board")
const emptyItem = document.createElement("div")
emptyItem.classList.add("emptyItem")

let draggableItemId = null
let sourceBoardId = null

function renderBoards() {
    Array.from(boards).forEach(board => {
        const items = board.children

        board.addEventListener("dragover", e => {
            e.preventDefault()
        })

        Array.from(items).forEach(item => {
            item.addEventListener("dragstart", e => {
                draggableItemId = e.target.id
                sourceBoardId = e.target.parentElement.id
            })
        })
        
        board.addEventListener("dragenter", e => {
            // moveElementToBoard(e)
        })

        Array.from(items).forEach(item => {
            item.addEventListener("dragenter", e => {
                if(!e.target.classList.contains("item")) {
                    return
                }
                console.log("entered", e.target)
                if(e.clientY < e.target.getBoundingClientRect().y + e.target.getBoundingClientRect().height / 2) {
                    e.target.insertAdjacentElement("beforebegin", emptyItem)
                } else {
                    e.target.insertAdjacentElement("afterend", emptyItem)
                }
            })
        })

        Array.from(items).forEach(item => {
            item.addEventListener("dragleave", e => {
                console.log("left", e.target)
                // moveElementAmongItems(e)
                // board.removeChild(emptyItem)
            })
        })

        Array.from(items).forEach(item => {
            item.addEventListener("dragend", e => {
                if(e.dataTransfer.dropEffect === "none") {
                    main.querySelector("#" + sourceBoardId).appendChild(e.target)
                }
            })
        })

        board.addEventListener("drop", e => {
            console.log(e.target)
            const draggableItem = main.querySelector("#" + draggableItemId)
            if(e.target.classList.contains("board")) {
                e.target.appendChild(draggableItem)
                board.removeChild(emptyItem)
            } else {
                board.replaceChild(draggableItem, emptyItem)
            }
        })
    })
}

function moveElementAmongItems(e) {
    if(!e.target.classList.contains("item")) {
        return
    }
    // const emptyItem = document.createElement("div")
    // emptyItem.classList.add("emptyItem")
    // const draggableItem = main.querySelector("#" + draggableItemId)
    e.target.insertAdjacentElement("beforebegin", emptyItem)
    // if(e.clientY < e.target.getBoundingClientRect().y + e.target.getBoundingClientRect().height / 2) {
    //     e.target.insertAdjacentElement("beforebegin", emptyItem)
    // } else {
    //     e.target.insertAdjacentElement("afterend", emptyItem)
    // }
}

function moveElementToBoard(e) {
    if(!e.target.classList.contains("board")) {
        return
    }
    const draggableItem = main.querySelector("#" + draggableItemId)
    if(!e.target.lastElementChild) {
        e.target.appendChild(draggableItem)
        return
    }
    if(e.clientY > e.target.lastElementChild.getBoundingClientRect().y) {
        e.target.appendChild(draggableItem)
    }
}

window.addEventListener("DOMContentLoaded", renderBoards)