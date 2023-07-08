let gameOver = false; // Made gameOver a global variable so it can be easily accessed everywhere
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

    // This function is used to make a move for the CPU, and it also checks if the CPU wins
    const cpuMove = (mark, name) => {
        let isValid = false;
        while (!isValid) {
            move = Math.floor(Math.random() * 9)
            isValid = isValidMove(move)
        }
        update(move, mark);
        if (checkWin(getGameboard(), mark)) { // Checks if CPU won
            gameOver = true;
            displayController.renderMessage(`${name} has won!`);
            playGame.swapPlayer()
            return;
        }
        else if(checkTie(getGameboard())) { // Checks if game ends as a tie
            gameOver = true;
            displayController.renderMessage("You have tied!")
            playGame.swapPlayer()
            return;
        }
        playGame.swapPlayer()
    }

    // Checks if a CPU's move is valid
    const isValidMove = (move) => {
        if (getGameboard()[move] === "") {
            return true
        }
        return false
    }

    return {renderBoard, update, getGameboard, cpuMove, isValidMove}
})();

// The createPlayer factory is used to create players
const createPlayer = ((name, mark, type) => {
    return {name, mark, type} // Added a type attribute to distinguish between human and cpu players
})

// The playGame module contains the methods related to playing the game
const playGame = (() => {
    let playerList = [];
    let currentPlayer;
    let board = document.querySelector(".game-board");
    let restartButton = document.querySelector(".restart-button");
    let p1Type = document.querySelector("#p1Type")
    let p2Type = document.querySelector("#p2Type")

    // This function is used to start the game
    const startGame = () => {
        playerList = [
            createPlayer("Player One", "X", p1Type.value),
            createPlayer("Player Two", "O", p2Type.value)
        ]
        currentPlayer = 0;
        gameOver = false;
        board.style.display = "grid";
        restartButton.style.display = "inline-block";
        gameBoard.renderBoard();
        if (playerList[currentPlayer].type === "cpu") { // Plays the CPU's move if they are Player One
            gameBoard.cpuMove(playerList[currentPlayer].mark, playerList[currentPlayer].name)
        }
    }

    // This function is used to make moves and checks if moves are legal. It also checks win conditions
    const gridSelected = (event) => {
        let index = parseInt(event.target.id);
        if (gameOver) return;
        if (gameBoard.getGameboard()[index] === "") {
            gameBoard.update(index, playerList[currentPlayer].mark)
            if (checkWin(gameBoard.getGameboard(), playerList[currentPlayer].mark)) { // Checks if the player one
                gameOver = true;
                displayController.renderMessage(`${playerList[currentPlayer].name} has won!`);
                return;
            }
            else if(checkTie(gameBoard.getGameboard())) { // Checks if the game is a tie
                gameOver = true;
                displayController.renderMessage("You have tied!")
                return;
            }
            swapPlayer();
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

    // This function is used to swap the current player, and if the current player is a cpu, it plays its move
    const swapPlayer = () => {
        currentPlayer = currentPlayer === 0 ? 1 : 0;
        if (playerList[currentPlayer].type === "cpu") {
            gameBoard.cpuMove(playerList[currentPlayer].mark, playerList[currentPlayer].name)
        }
    }

    return {startGame, gridSelected, restartGame, swapPlayer}
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
const startScreen = document.querySelector(".game-start")
const startButton = document.querySelector(".start")
startButton.addEventListener("click", () => {
    playGame.startGame()
    startScreen.style.display = "none"
})

const restartButton = document.querySelector(".restart-button")
restartButton.addEventListener("click", () => {
    playGame.restartGame()
})


const p1Selector = document.querySelector("#p1Type")
const p1h = document.querySelector(".p1h");
const p1c = document.querySelector(".p1c");
p1Selector.addEventListener("change", (event)  => {
    event.preventDefault();
    console.log(event.target.value)
    if (event.target.value === "human") {
        p1h.style.display = "block"
        p1c.style.display = "none"
    }
    else {
        p1h.style.display = "none"
        p1c.style.display = "block"
    }
    if (p2Selector.value === "cpu" && p1Selector.value === "cpu") {
        startButton.disabled = true;
    }
    else {
        startButton.disabled = false;
    } // Prevents a CPU vs CPU game
})

const p2Selector = document.querySelector("#p2Type")
const p2h = document.querySelector(".p2h");
const p2c = document.querySelector(".p2c");
p2Selector.addEventListener("change", (event)  => {
    event.preventDefault();
    console.log(event.target.value)
    if (event.target.value === "human") {
        p2h.style.display = "block"
        p2c.style.display = "none"
    }
    else {
        p2h.style.display = "none"
        p2c.style.display = "block"
    }
    if (p2Selector.value === "cpu" && p1Selector.value === "cpu") {
        startButton.disabled = true;
    }
    else {
        startButton.disabled = false;
    } // Prevents a CPU vs CPU game
})