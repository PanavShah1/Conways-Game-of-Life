const canvas = document.getElementById("canvas")

const ctx = canvas.getContext("2d")

canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight

const W = canvas.width
const H = canvas.height
const N = 50
const W_cell = W/N
const H_cell = H/N

console.log(H)
console.log(W)
console.log("hi")

let cells_array = []
class Cell{
    constructor(i, j){
        this.x = i*W_cell
        this.y = j*H_cell
        this.fill = false
    }
}

for(let i = 0; i < N; i++){
    let temp_array = []
    for(let j = 0; j < N; j++){
        temp_array.push(new Cell(i, j))
    }
    cells_array.push(temp_array)
}

console.log(cells_array)

function setCells(){
    for(let i = 0; i < N; i++){
        for(let j = 0; j < N; j++){
            var rand = Math.floor(Math.random()*10)
            if(rand <= 1){
                cells_array[i][j].fill = true
            }
            else{
                cells_array[i][j].fill = false
            }
        }
    }
    fillColor()
}

function inputGrid(event) {
    // Calculate canvas-relative mouse coordinates
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Determine which cell was clicked
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const cell = cells_array[i][j];
            // Calculate cell boundaries
            const cellX = cell.x;
            const cellY = cell.y;
            const cellRight = cellX + W_cell;
            const cellBottom = cellY + H_cell;
            // Check if mouse coordinates are within cell boundaries
            if (mouseX >= cellX && mouseX < cellRight && mouseY >= cellY && mouseY < cellBottom) {
                // Toggle the fill property of the clicked cell
                cell.fill = !cell.fill;
                // Redraw the canvas
                fillColor();
                return; // Exit the loop early since we found the clicked cell
            }
        }
    }
}

canvas.addEventListener("click", inputGrid)

// function setCells(event){
//     cells_array[15][15].fill = true
//     cells_array[16][14].fill = true
//     cells_array[17][14].fill = true
//     cells_array[17][15].fill = true
//     cells_array[17][16].fill = true

//     fillColor()

// }




function fillColor(){
    ctx.clearRect(0, 0, W, H)
    for(let i = 0; i < N; i++){
        for(let j = 0; j < N; j++){
            if(cells_array[i][j].fill == true){
                ctx.beginPath()
                ctx.fillStyle = "white"
                // console.log("true")
                ctx.rect(cells_array[i][j].x, cells_array[i][j].y, cells_array[i][j].x+W_cell, cells_array[i][j].y+H_cell)
                ctx.fill()
                ctx.closePath();
            }
            else{
                ctx.beginPath()
                ctx.fillStyle = "black"
                // console.log("false")
                ctx.rect(cells_array[i][j].x, cells_array[i][j].y, cells_array[i][j].x+W_cell, cells_array[i][j].y+H_cell)
                ctx.fill()
                ctx.closePath();
            }
        }
    }
}

function changeCells(){
    
    let duplicate_cells_array = []
    function duplicate() {
        duplicate_cells_array = cells_array.map(row => row.map(cell => ({...cell})));
    }
    duplicate()

    console.log("changing cells")
    for(let i = 1; i < N-1; i++){
        for(let j = 1; j < N-1; j++){
            var ctr = 0
            
            for(let ii = i-1; ii <= i+1; ii++){
                for(let jj = j-1; jj <= j+1; jj++){
                    if(cells_array[ii][jj].fill == true){
                        ctr++
                    }
                }
            }

            if(cells_array[i][j].fill == true){
                ctr--
            }







            if(cells_array[i][j].fill == true){
                if(ctr==2||ctr==3){
                    // duplicate_cells_array[i][j].fill = true
                }
                else{
                    duplicate_cells_array[i][j].fill = false
                }
            }

            if(cells_array[i][j].fill == false){
                if(ctr == 3){
                    duplicate_cells_array[i][j].fill = true
                }
                // else{
                //     duplicate_cells_array[i][j].fill = false
                // }
            }

        }
    }

    function duplicate2() {
        cells_array = duplicate_cells_array.map(row => row.map(cell => ({...cell})));
    }
    duplicate2()

    fillColor();
}

// document.addEventListener("DOMContentLoaded", setCells)
// document.addEventListener("click", setCells)

function start(){
    // setCells()
    setInterval(changeCells, 1000)
}





