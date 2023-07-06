const gameBoard = (() => {
    let gameArray = ["", "", "", "", "", "", "", "", ""];
    const grids = document.getElementsByClassName("grid");
    for (grid of grids) {
        grid.addEventListener("click", function() {
            console.log(grid.innerHTML)
        })
    }

    const resetGameBoard = (() => {
        gameArray = ["", "", "", "", "", "", "", "", ""];
    })

    const renderBoard = (() => {
        let boardSymbol = ""

    })

    return {resetGameBoard, renderBoard}
})();

const createPlayer = ((name, mark) => {
    return {name, mark}
})

const playGame = (() => {
    let playerList = [];
    let currentPlayer;
    let gameOver;
    let board = document.querySelector(".game-board")

    const startGame = () => {
        players = [
            createPlayer("Player One", "X"),
            createPlayer("Player Two", "O")
        ]
        currentPlayer = 0;
        gameOver = false;
        board.style.display = "grid";
        console.log("This runs!")
    }

    return {startGame}
})();

const startButton = document.querySelector(".start")
startButton.addEventListener("click", () => {
    playGame.startGame()
    startButton.style.display = "none"
})