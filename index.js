

const board = document.querySelector(".board");
let currentPlayer = "X";
let cells = Array.from({length: 9});

function handleClick(e) {
    let cellIndex = e.target.dataset.index;
    // check if array is empty or no
    if (cells[cellIndex]) return;
    updateCell(cellIndex , currentPlayer);
    const winner = checkWinner();
    if (winner || !cells.includes(undefined)) {
        alert(winner ? `Player ${winner} Wins!` : "it is Draw!")
    } 
};

const resetGame = () => {
    cells = Array.from({length: 9});
    currentPlayer = "X";
    board.querySelectorAll(".cell").forEach((cell)=>{
        cell.textContent="";
        cell.classList.remove("player-x" , "player-o");
    });
};

document.addEventListener("keydown" , (e) => {
    if (e.key === "Escape") resetGame();
})

const updateCell = (index , value) => {
    cells[index] = value;
    const cell = document.querySelector(`[data-index="${index}"]`);
    cell.textContent = value;
    cell.classList.add(value === "X"? "player-x" : "player-o")

    // switch players
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
};


const checkWinner = () => {
    const winningConbes = [
        [0 , 1 , 2],
        [3 , 4 , 5],
        [6 , 7 , 8],
        [0 , 3 , 6],
        [1 , 4 , 7],
        [2 , 5 , 8],
        [0 , 4 , 8],
        [2 , 4 , 6],
    ];
    
    for (const compos of winningConbes) {
        let [a , b , c] = compos;
        
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a]
        }
    }
        
};
checkWinner();

cells.forEach((cell,index)=>{
    cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click" , handleClick)
    board.appendChild(cell);
});

