export default function setCells(){
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