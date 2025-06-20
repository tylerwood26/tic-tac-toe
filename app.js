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
                gameBoard.updateBoard(row, col, playerOne.symbol);
                playerOne.playedPositions.push(`${row}${col}`);
                this.checkForWinner(playerOne);
            } else {
                let row = prompt(`Select a row ${playerTwo.name}!`);
                let col = prompt(`Select a col ${playerTwo.name}!`);
                gameBoard.updateBoard(row, col, playerTwo.symbol);
                playerTwo.playedPositions.push(`${row}${col}`);
                this.checkForWinner(playerTwo);
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
                    this.changeTurns();
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
        checkIfPositionAvailable: function() {

        },
        gameOver: function(player) {
            console.log(`${player.name} has won!`);
        }
    }

    game.init()
})();