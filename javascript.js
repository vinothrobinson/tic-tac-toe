const gameBoard = (() => {
    let gameArray = ["", "", "", "", "", "", "", "", ""];

    const renderBoard = () => {
        let boardHTML = ""
        gameArray.forEach((square, index) => {
            boardHTML += `<div class="grid" id="${index}">${square}</div>`
        })
        document.querySelector(".game-board").innerHTML = boardHTML;
        const grids = document.getElementsByClassName("grid");
        for (grid of grids) {
            grid.addEventListener("click", playGame.gridSelected);
        }
    }

    const update = (index, mark) => {
        gameArray[index] = mark;
        renderBoard();
    }

    const getGameboard = () => gameArray;


    return {renderBoard, update, getGameboard}
})();

const createPlayer = ((name, mark) => {
    return {name, mark}
})

const playGame = (() => {
    let playerList = [];
    let currentPlayer;
    let gameOver;
    let board = document.querySelector(".game-board")
    let restartButton = document.querySelector(".restart-button")

    const startGame = () => {
        playerList = [
            createPlayer("Player One", "X"),
            createPlayer("Player Two", "O")
        ]
        currentPlayer = 0;
        gameOver = false;
        board.style.display = "grid";
        restartButton.style.display = "inline-block";
        gameBoard.renderBoard();
    }

    const gridSelected = (event) => {
        let index = parseInt(event.target.id);
        if (gameBoard.getGameboard()[index] === "") {
            gameBoard.update(index, playerList[currentPlayer].mark)
            currentPlayer = currentPlayer === 0 ? 1 : 0;
        }
        return
    }

    const restartGame = () => {
        for (let grid = 0; grid < 9; grid++) {
            gameBoard.update(grid, "")
        }
        startGame()
    }

    const checkWin = () => {

    }

    return {startGame, gridSelected, restartGame}
})();

const startButton = document.querySelector(".start")
startButton.addEventListener("click", () => {
    playGame.startGame()
    startButton.style.display = "none"
})

const restartButton = document.querySelector(".restart-button")
restartButton.addEventListener("click", () => {
    playGame.restartGame()
})