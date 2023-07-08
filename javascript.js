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
    let board = document.querySelector(".game-board");
    let restartButton = document.querySelector(".restart-button");

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
        if (gameOver) return;
        if (gameBoard.getGameboard()[index] === "") {
            gameBoard.update(index, playerList[currentPlayer].mark)
            if (checkWin(gameBoard.getGameboard(), playerList[currentPlayer].mark)) {
                gameOver = true;
                displayController.renderMessage(`${playerList[currentPlayer].name} has won!`);
            }
            else if(checkTie(gameBoard.getGameboard())) {
                gameOver = true;
                displayController.renderMessage("You have tied!")
            }
            currentPlayer = currentPlayer === 0 ? 1 : 0;
        }
        return
    }

    const restartGame = () => {
        for (let grid = 0; grid < 9; grid++) {
            gameBoard.update(grid, "")
        }
        displayController.renderMessage("");
        startGame()
    }

    return {startGame, gridSelected, restartGame}
})();

const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector(".message").innerHTML = message;
    }
    return {renderMessage}
})();

function checkWin(board) {
    let winConditions = [
        // Horizontal Cases
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Vertical Cases
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonal Cases
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true
        }
    }
    return false;
}

function checkTie(board) {
    return board.every(cell => cell !== "");
}

const startButton = document.querySelector(".start")
startButton.addEventListener("click", () => {
    playGame.startGame()
    startButton.style.display = "none"
})

const restartButton = document.querySelector(".restart-button")
restartButton.addEventListener("click", () => {
    playGame.restartGame()
})