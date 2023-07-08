// The gameBoard module contains the methods that are associated with the board itself
const gameBoard = (() => {
    let gameArray = ["", "", "", "", "", "", "", "", ""];

    // This function is used to render the game board and add the eventListener for clicking the grid squares
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

    // This function updates a grid of the board with the player's symbol if clicked it
    const update = (index, mark) => {
        gameArray[index] = mark;
        renderBoard();
    }

    // This function returns the game board, preventing the user from directly accessing it
    const getGameboard = () => gameArray;

    return {renderBoard, update, getGameboard}
})();

// The createPlayer factory is used to create players
const createPlayer = ((name, mark) => {
    return {name, mark}
})

// The playGame module contains the methods related to playing the game
const playGame = (() => {
    let playerList = [];
    let currentPlayer;
    let gameOver;
    let board = document.querySelector(".game-board");
    let restartButton = document.querySelector(".restart-button");

    // This function is used to start the game
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

    // This function is used to make moves and checks if moves are legal. It also checks win conditions
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

    // This function is used to reset and clear the board and start a brand new game
    const restartGame = () => {
        for (let grid = 0; grid < 9; grid++) {
            gameBoard.update(grid, "")
        }
        displayController.renderMessage("");
        startGame()
    }

    return {startGame, gridSelected, restartGame}
})();

// The displayController module is used to display messages after the game ends
const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector(".message").innerHTML = message;
    }
    return {renderMessage}
})();

// This function is used to check wins
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
            return true // Checks if the symbols are the same in all three spots
        }
    }
    return false;
}

// This function is used to check ties
function checkTie(board) {
    return board.every(cell => cell !== ""); // Checks every grid to see if there are no empty squares
}

// These two batches of code are used to enable a function when the button is clicked
const startButton = document.querySelector(".start")
startButton.addEventListener("click", () => {
    playGame.startGame()
    startButton.style.display = "none"
})

const restartButton = document.querySelector(".restart-button")
restartButton.addEventListener("click", () => {
    playGame.restartGame()
})