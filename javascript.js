const gameBoard = (() => {
    let gameArray = ["", "", "", "", "", "", "", "", ""];

    const resetGameBoard = () => {
        gameArray = ["", "", "", "", "", "", "", "", ""];
    }

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
        if (gameArray[index] === "") {
            gameArray[index] = mark;
            this.removeEventListener("click", playGame.gridSelected)
        }
        renderBoard();
        playGame.swapPlayer(mark);
    }

    const checkWin = () => {

    }


    return {resetGameBoard, renderBoard, update, checkWin}
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
        gameBoard.renderBoard();
    }

    const gridSelected = (event) => {
        let index = parseInt(event.target.id);
        gameBoard.update(index, players[currentPlayer].mark)
    }

    const swapPlayer = (mark) => {
        if (mark === "X") {
            currentPlayer = 1;
        }
        else currentPlayer = 0;
    }

    return {startGame, gridSelected, swapPlayer}
})();

const startButton = document.querySelector(".start")
startButton.addEventListener("click", () => {
    playGame.startGame()
    startButton.style.display = "none"
})