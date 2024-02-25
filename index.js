const canvas = document.getElementById("canvas")

const ctx = canvas.getContext("2d")

canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight

let W = canvas.width
let H = canvas.height
let N = 50
let W_cell = W/N
let H_cell = H/N
let Speed = 200


function changeSpeed(){
    stop()
    let speed = document.getElementById("speed").value
    document.getElementById("speed-span").innerText = speed 
    Speed = Math.floor(1000/speed)
}
document.addEventListener("input", changeSpeed)

function changeSize(){
    stop()
    let size = document.getElementById("size").value
    document.getElementById("size-span").innerText = size 
    N = 10*size
    W_cell = W/N
    H_cell = H/N  
    initialization()
}
document.addEventListener("input", changeSize)

function drawGridLines(){
    for(let i = 0; i < N; i++){
        ctx.beginPath()
        ctx.strokeStyle = "rgb(50, 50, 50)"
        ctx.lineWidth = 1
        ctx.moveTo(i*W_cell, 0)
        ctx.lineTo(i*W_cell, H)
        ctx.stroke()
    }
    for(let i = 0; i < N; i++){
        ctx.beginPath()
        ctx.strokeStyle = "rgb(50, 50, 50)"
        ctx.lineWidth = 1
        ctx.moveTo(0, i*H_cell)
        ctx.lineTo(W, i*H_cell)
        ctx.stroke()
    }
}




let cells_array = []
class Cell{
    constructor(i, j){
        this.x = i*W_cell
        this.y = j*H_cell
        this.fill = false
    }
}

function initialization(){
    cells_array = []
    ctx.clearRect(0, 0, W, H); 
    for(let i = 0; i < N; i++){
        let temp_array = []
        for(let j = 0; j < N; j++){
            temp_array.push(new Cell(i, j))
        }
        cells_array.push(temp_array)
    }
    console.log(cells_array)
    drawGridLines()

}
initialization()


function randomCells(){
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



let csvData

function parseCSV(csv){
    const rows = csv.split('\n')
    const data = []
    console.log(rows)
    let obj = {}
    for(let i = 0; i < rows.length; i++){
        const row = rows[i].split(',')
        console.log('row')
        console.log(row)
        obj = {}
        // for(let j = 0; j < row.length; j++){
        //     obj[j] = row[j];
        // }
        obj['name'] = row[0]
        obj['size'] = [row[1], row[2]]
        var coordinates = []
        for(let j = 3; j < row.length; j++){
            coordinates.push(row[j])
        }
        obj['coordinates'] = coordinates
        data.push(obj)
    }
    for(let i = 0; i < rows.length; i++){
        const cont = document.getElementById("patterns")

        const card = document.createElement("div")
        card.className = "pattern-card"

        const name = document.createElement("p")
        name.className = "pattern-name"
        name.innerText = data[i].name

        const button = document.createElement("button")
        button.addEventListener("click", () => createPattern(i))
        // button.innerText = `${i}`

        button.appendChild(name)
        card.appendChild(button)
        cont.appendChild(card)
    }
    return data
}

function fetchData(url){
    return fetch(url)
        .then(response => response.text())
        .then(data => parseCSV(data))
}

const csvFileUrl = "patterns.csv"
fetchData(csvFileUrl)
    .then(data => {
        console.log("csv")
        console.log(data)
        csvData = data
    })
    .catch(error => {
        console.error('Error fetching data: ', error)
    })




function createPattern(i){
    console.log(csvData[i])
    const data = csvData[i]
    const center = Math.floor(N/2)
    const name = data.name
    const x_start = center - Math.floor(parseInt(data.size[0])/2)
    const y_start = center - Math.floor(parseInt(data.size[1])/2)
    console.log(x_start + " " + y_start)

    for(let i = 0; i < data.coordinates.length; i=i+2){
        console.log(x_start+parseInt(data.coordinates[i]))
        console.log(y_start+parseInt(data.coordinates[i+1]))
        cells_array[x_start+parseInt(data.coordinates[i])][y_start+parseInt(data.coordinates[i+1])].fill = true
        console.log(cells_array[x_start+parseInt(data.coordinates[i]), y_start+parseInt(data.coordinates[i+1])].fill)
    }
    console.log(cells_array)
    fillColor()
}



















// function setCells(event){
//     cells_array[15][15].fill = true
//     cells_array[16][14].fill = true
//     cells_array[17][14].fill = true
//     cells_array[17][15].fill = true
//     cells_array[17][16].fill = true

//     fillColor()

// }


function inputGrid(event) {
    console.log("mouse")
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const cell = cells_array[i][j];
            const cellX = cell.x;
            const cellY = cell.y;
            const cellRight = cellX + W_cell;
            const cellBottom = cellY + H_cell;
            if (mouseX >= cellX && mouseX < cellRight && mouseY >= cellY && mouseY < cellBottom) {
                cell.fill = !cell.fill
                fillColor();
                return
            }
        }
    }
}

canvas.addEventListener("mousedown", inputGrid)





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
    drawGridLines()

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


let intervalId
function start(){
    clearInterval(intervalId)
    intervalId = setInterval(changeCells, Speed)
}

function stop(){
    clearInterval(intervalId)
}

function reset(){
    initialization()
    fillColor()
}






