(function () {
    let gameBoard = {
        board: [['','',''], ['','',''], ['','','']],
        render: function() {
            this.board.forEach((row) => {
                console.log(row);
            })
        },
        updateBoard: function(row, col, symbol) {
            this.board[row][col] = symbol;
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
            gameBoard.render();
            this.playRound();
        },
        winningCombos: [['00', '01', '02'],
                        ['10', '11', '12'],
                        ['20', '21', '22'],
                        ['00', '10', '20'],
                        ['01', '11', '21'],
                        ['02', '12', '22'],
                        ['00', '11', '22'],
                        ['02', '11', '20']],
        playRound: function() {
            if (playerOne.isTurn === true) {
                let row = prompt(`Select a row ${playerOne.name}!`);
                let col = prompt(`Select a col ${playerOne.name}!`);
                this.checkIfPositionAvailable(row, col, playerOne);
            } else {
                let row = prompt(`Select a row ${playerTwo.name}!`);
                let col = prompt(`Select a col ${playerTwo.name}!`);
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
            if (playerOne.isTurn === true) {
                playerOne.isTurn = false;
                playerTwo.isTurn = true;
            } else {
                playerOne.isTurn = true;
                playerTwo.isTurn = false;
            }
            this.playRound();
        },
        checkIfPositionAvailable: function(row, col, player) {
            if (gameBoard.board[row][col] != '') {
                console.log('This position has already been played. Try again');
                this.playRound();
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