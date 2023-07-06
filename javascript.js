const gameBoard = (() => {
    let gameArray = [["_", "_", "_"], ["_", "_", "_"], ["_", "_", "_"]];
    const grids = document.getElementsByClassName("grid");
    for (grid of grids) {
        grid.addEventListener("click", function() {
            console.log(grid.innerHTML)
        })
    }
    const resetGameBoard = (() => {
        gameArray = [["_", "_", "_"], ["_", "_", "_"], ["_", "_", "_"]];;
    })
    return {resetGameBoard}
})();