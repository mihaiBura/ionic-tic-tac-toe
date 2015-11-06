angular.module('starter.services', [])

.factory('GameEngine', function() {

    /*
     * A complete tic-tac-toe widget.  Just include this script in a
     * browser page and enjoy.  A tic-tac-toe game will be included
     * as a child element of the element with id "tictactoe".  If the
     * page has no such element, it will just be added at the end of
     * the body.
     */
    var squares = [],
        EMPTY = "",
        score,
        moves,
        turn = "X",
        winner;

    var cells = [];

    /*
     * To determine a win condition, each square is "tagged" from left
     * to right, top to bottom, with successive powers of 2.  Each cell
     * thus represents an individual bit in a 9-bit string, and a
     * player's squares at any given time can be represented as a
     * unique 9-bit value. A winner can thus be easily determined by
     * checking whether the player's current 9 bits have covered any
     * of the eight "three-in-a-row" combinations.
     *
     *     273                 84
     *        \               /
     *          1 |   2 |   4  = 7
     *       -----+-----+-----
     *          8 |  16 |  32  = 56
     *       -----+-----+-----
     *         64 | 128 | 256  = 448
     *       =================
     *         73   146   292
     *
     */
    var wins = [7, 56, 448, 73, 146, 292, 273, 84];

    /*
     * Clears the score and move count, erases the board, and makes it
     * X's turn.
     */
    var startNewGame = function() {
        var i;
        winner = "";
        turn = "X";
        score = {
            "X": 0,
            "O": 0
        };
        moves = 0;
        for (i = 0; i < 9; i += 1) {
            cells[i]['turn'] = EMPTY;
        }
    };

    /*
     * Returns whether the given score is a winning score.
     */
    var win = function(score) {
        var i;
        for (i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    };

    /*
     * Sets the clicked-on square to the current player's mark,
     * then checks for a win or cats game.  Also changes the
     * current player.
     */
    var set = function(index) {
        var cell = cells[index];
        if (cell.turn !== EMPTY) {
            return;
        }
        cell.turn = turn;
        moves += 1;
        score[turn] += cell.indicator;
        if (win(score[turn])) {
            winner = turn;
        } else if (moves === 9) {
            winner = 'tie';
        } else {
            turn = turn === "X" ? "O" : "X";
        }
    };

    /*
     * Creates and attaches the DOM elements for the board as an
     * HTML table, assigns the indicators for each cell, and starts
     * a new game.
     */
    var play = function() {
        var indicator = 1,
            i, j,
            row, cell,
            parent;

        for (i = 0; i < 3; i += 1) {
            for (j = 0; j < 3; j += 1) {
                cell = {};
                cell['indicator'] = indicator;
                cell['turn'] = EMPTY;
                cells.push(cell);
                indicator += indicator;
            }
        }

        startNewGame();
    };

    return {
        getCells: function() {
            return cells;
        },
        whoWon: function() {
            return winner;
        },
        startNewGame: startNewGame,
        set: set,
        play: play
    };
});
