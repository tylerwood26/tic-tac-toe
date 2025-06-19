(function () {
    let gameBoard = {
        board: [['','',''], ['','',''], ['','','']],
        init: function() {
            this.render();
        },
        render: function() {
            this.board.forEach((row) => {
                console.log(row);
            })
        }

    };
    gameBoard.init();

    function createPlayer (name, symbol) {
        return {name, symbol};
    }

    const playerOne = createPlayer("Player One", 'x');
    const playerTwo = createPlayer("Player Two", 'o');

    let game = {
        
    }
})();