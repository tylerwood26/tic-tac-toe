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
            const h1 = this.getCellH1(row, col);
            h1.innerHTML = symbol;
            this.render();
        },
        getCellH1: function(row, col) {
            const boardCell = document.querySelector(`#cell-${row}${col}`);
            const boardCellH1 = boardCell.querySelector('.cell-h1');
            return boardCellH1;
        },
        deleteEventListener: function() {
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board[i].length; j++) {
                    this.board[i][j].removeEventListener("click", this.cellClicked);
                }
            }
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

    let displayPlayerData = {
        playersH1: [],
        playerOneDiv: document.querySelector('.player-1'),
        playerTwoDiv: document.querySelector('.player-2'),
        playerInfoContainer: document.querySelector('.player-info-container'),
        getPlayersH1: function() {
            const numOfPlayers = 2;
            for (let i = 0; i < numOfPlayers; i++) {    
                const div = document.querySelector(`.player-${i + 1}`);
                const h1 = div.querySelector('.player-name');
                this.playersH1.push(h1);
            }
            this.displayPlayersName();
        },
        displayPlayersName: function() {
            const player1 = 0;
            const player2 = 1;
            this.playersH1[player1].innerHTML = playerOne.name;
            this.playersH1[player2].innerHTML = playerTwo.name;
        },
        changePlayerGreen: function() {
            this.playerOneDiv.classList.toggle('turn-green');
            this.playerTwoDiv.classList.toggle('turn-green');
        }
    }

    let buttons = {
        startButton: document.querySelector('.start-btn'),
        restartButton: document.querySelector('.restart-btn'),
        startButtonClicked: function() {
            game.init()
        },
        hideButton: function(button) {
            button.hidden = true;
        },
        showButton: function(button) {
            button.hidden = false;
        },
        init: function() {
            this.startButton.addEventListener('click', this.startButtonClicked);
            this.hideButton(this.restartButton);
        }
    }

    let game = {
        init: function() {
            gameBoard.createBoard();
            displayPlayerData.getPlayersH1();
            gameBoard.render();
            buttons.hideButton(buttons.startButton)
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
            displayPlayerData.changePlayerGreen();
        },
        checkIfPositionAvailable: function(row, col, player) {
            const cellH1 = gameBoard.getCellH1(row, col);
            if (cellH1.innerHTML === 'x' || cellH1.innerHTML === 'o') {
                alert('This position has already been played. Try again');
            } else {
                gameBoard.updateBoard(row, col, player.symbol);
                player.playedPositions.push(`${row}${col}`);
                this.checkForWinner(player);
            }
        },
        gameOver: function(player) {
            gameBoard.deleteEventListener();
            buttons.showButton(buttons.restartButton);
            if (player === 'Game tied') {
                displayPlayerData.playerInfoContainer.innerHTML = '<h1>Game is a tie!</h1>';
            } else {
                displayPlayerData.playerInfoContainer.innerHTML =  `<h1 class="turn-green">${player.name} has won!</h1>`;
            }
        }
    }
    buttons.init()
})();
            