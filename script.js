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
            if(e.target.classList.contains("emptyItem") || e.target.classList.contains("board")) {
                e.preventDefault()
            }
        })

        Array.from(items).forEach(item => {
            item.addEventListener("dragstart", e => {
                draggableItemId = e.target.id
                sourceBoardId = e.target.parentElement.id
            })
        })
        
        board.addEventListener("dragleave", e => {
            if(e.target.classList.contains("item")) {
                const itemStyle = e.target.getBoundingClientRect()
                e.clientY < itemStyle.y + itemStyle.height / 2 ? e.target.insertAdjacentElement("beforebegin", emptyItem) : e.target.insertAdjacentElement("afterend", emptyItem)
            }
            if(e.target.classList.contains("board") && e.clientY > board.lastElementChild.getBoundingClientRect().y && board.contains(emptyItem)) {
                e.target.removeChild(emptyItem)
            }
        })

        board.addEventListener("drop", e => {
            const draggableItem = main.querySelector("#" + draggableItemId)
            if(e.target.classList.contains("board") && e.clientY > e.target.lastElementChild.getBoundingClientRect().bottom) {
                e.target.appendChild(draggableItem)
        
            } else {
                board.replaceChild(draggableItem, emptyItem)
            }
            if(board.contains(emptyItem)) {
                board.removeChild(emptyItem)
            }
            console.log(board)
        })

        Array.from(items).forEach(item => {
            item.addEventListener("dragend", e => {
                console.log(board, main.querySelector("#" + sourceBoardId))

                if(e.dataTransfer.dropEffect === "none") {
                    board.removeChild(emptyItem)
                    main.querySelector("#" + sourceBoardId).removeChild(emptyItem)
                    // if(board.contains(emptyItem)) {
                    //     board.removeChild(emptyItem)
                    // }
                    // if(main.querySelector("#" + sourceBoardId).contains(emptyItem)) {
                    //     main.querySelector("#" + sourceBoardId).removeChild(emptyItem)
                    // }
                } 
                console.log(board)
            })
        })
    })
}

window.addEventListener("DOMContentLoaded", renderBoards)