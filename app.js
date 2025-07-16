(function () {
    let gameBoard = {
        board: [[], [], []],
        createBoard: function() {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const div = document.createElement("div");
                    div.setAttribute("id", `cell-${i}${j}`);
                    div.setAttribute("class", "game-cell");
                    div.addEventListener('click', this.cellClicked);
                    const h1 = document.createElement("h1");
                    h1.setAttribute("class", "cell-h1");
                    div.appendChild(h1);
                    this.board[i].push(div);
                }
            }
        },
        cellClicked: function(event) {
            const clickedCellRow = event.target.id[5];
            const clickedCellCol = event.target.id[6];
            game.playRound(clickedCellRow, clickedCellCol);
        },
        render: function() {
            const boardContainer = document.querySelector(".board-container");
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board[i].length; j++) {
                    const cell = this.board[i][j];
                    boardContainer.appendChild(cell);
                }                
            }
        },
        updateBoard: function(row, col, symbol) {
            // this.board[row][col].innerHtml = symbol;
            // console.log(this.board[row][col]);
            const boardCell = document.querySelector(`#cell-${row}${col}`);
            const boardCellH1 = boardCell.querySelector('.cell-h1');
            boardCellH1.innerHTML = symbol;
            this.render();
        }
    };
    
    function createPlayer (name, symbol, isTurn, playedPositions) {
        return {name, symbol, isTurn, playedPositions};
    }

    function getPlayerOneName() {
        return prompt("Please enter player one name. You will be x");
    }

    function getPlayerTwoName() {
        return prompt("Please enter player two name. You will be o");
    }

    const playerOne = createPlayer(getPlayerOneName(), 'x', true, []);
    const playerTwo = createPlayer(getPlayerTwoName(), 'o', false, []);

    let game = {
        init: function() {
            gameBoard.createBoard();
            gameBoard.render();
        },
        winningCombos: [['00', '01', '02'],
                        ['10', '11', '12'],
                        ['20', '21', '22'],
                        ['00', '10', '20'],
                        ['01', '11', '21'],
                        ['02', '12', '22'],
                        ['00', '11', '22'],
                        ['02', '11', '20']],
        playRound: function(row, col) {
            if (playerOne.isTurn) {
                this.checkIfPositionAvailable(row, col, playerOne);
            } else {
                this.checkIfPositionAvailable(row, col, playerTwo);
            }
        },
        checkForWinner: function(player) {
            if (player.playedPositions.length < 3) {
                this.changeTurns();
            } else {
                let isWinner = false;
                for (let i = 0; i < this.winningCombos.length; i++) {
                    const includesAll = this.winningCombos[i].every(value => player.playedPositions.includes(value));
                    if (includesAll === true) {
                        isWinner = true;
                        break;
                    }
                }
                if (isWinner === false) {
                    if (playerOne.playedPositions.length === 5) {
                        this.gameOver('Game tied');
                    } else {
                        this.changeTurns();
                    }
                } else {
                    this.gameOver(player);
                }
            }
        },
        changeTurns: function() {
            if (playerOne.isTurn) {
                playerOne.isTurn = false;
                playerTwo.isTurn = true;
            } else {
                playerOne.isTurn = true;
                playerTwo.isTurn = false;
            }
        },
        checkIfPositionAvailable: function(row, col, player) {
            if (gameBoard.board[row][col].innerHtml != undefined) {
                console.log('This position has already been played. Try again');
            } else {
                gameBoard.updateBoard(row, col, player.symbol);
                player.playedPositions.push(`${row}${col}`);
                this.checkForWinner(player);
            }
        },
        gameOver: function(player) {
            if (player === 'Game tied') {
                console.log('Game is a tie!');
            } else {
                console.log(`${player.name} has won!`);
            }
        }
    }
    game.init()
})();