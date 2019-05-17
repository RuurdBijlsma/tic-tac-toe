export default class Tic {
    constructor(boardSize = [3, 3]) {
        this.reset(boardSize);
    }

    reset(boardSize = false) {
        if (boardSize === false)
            boardSize = this.boardSize;
        console.log("BOARD SIZE", boardSize);
        this.boardSize = boardSize;
        this.board = this.createBoard(boardSize);
    }

    playSelf(board) {
        let color = 1;
        this.printBoard(board);
        while (this.evaluate(board) === 'unfinished') {
            let [bestMove, _] = this.alphaBeta(board, color);
            this.doMove(board, bestMove, color);
            this.printBoard(board);
            color *= -1;
        }
        console.log(this.evaluate(board));
    }


    alphaBeta(board, color, alpha = -Infinity, beta = Infinity, table = {}) { // Player x = 1, o = -1
        let key = this.boardToKey(board);
        if (key in table)
            return table[key];

        let bestMove = false;
        let gameState = this.evaluate(board);
        if (gameState !== 'unfinished')
            return [bestMove, gameState];

        let value = -Infinity * color;

        for (let move of this.possibleMoves(board)) {
            this.doMove(board, move, color);
            let [_, score] = this.alphaBeta(board, -color, alpha, beta, table);
            this.undoMove(board, move);

            if (score * color > value * color) {
                value = score;
                bestMove = move;
            }

            if (color === 1)
                alpha = Math.max(alpha, value);
            else
                beta = Math.min(beta, value);

            if (alpha >= beta)
                break;
        }

        table[key] = [bestMove, value];
        return [bestMove, value];
    }

    boardToKey(board) {
        let key = '';
        for (let x = 0; x < board.length; x++)
            for (let y = 0; y < board[x].length; y++)
                key += board[x][y] + 1;
        return key;
    }

    doMove(board, move, color) {
        board[move[0]][move[1]] = color;
    }

    undoMove(board, move) {
        board[move[0]][move[1]] = 0;
    }

    possibleMoves(board) {
        // turn = 1: x turn = -1: o
        let moves = [];
        for (let x = 0; x < board.length; x++)
            for (let y = 0; y < board[x].length; y++)
                if (board[x][y] === 0)
                    moves.push([x, y]);

        return moves;
    }

    isDraw(board) {
        for (let x = 0; x < board.length; x++)
            for (let y = 0; y < board[x].length; y++)
                if (board[x][y] === 0)
                    return false;
        return true;
    }

    evaluate(board) { // Return 'unfinished', 'x', 'o' or 'draw'
        for (let row of board) {
            let sum = row.reduce((a, b) => a + b);
            if (sum === -row.length) //sum = -3, o wins
                return -1;
            if (sum === row.length) //sum = 3, x wins
                return 1;
        }
        for (let column = 0; column < board[0].length; column++) {
            let sum = 0;

            for (let i = 0; i < board.length; i++)
                sum += board[i][column];

            if (sum === -board.length) //sum = -3, o wins
                return -1;
            if (sum === board.length) //sum = 3, x wins
                return 1;
        }

        let diagSize = Math.min(board.length, board[0].length);
        for (let j = 0; j <= Math.abs(board.length - board[0].length); j++) {
            if (board.length > board[0].length) {
                let diagSum = 0;
                for (let i = 0; i < diagSize; i++)
                    diagSum += board[j + i][i];
                if (diagSum === -diagSize) //sum = -3, o wins
                    return -1;
                if (diagSum === diagSize) //sum = 3, x wins
                    return 1;
                diagSum = 0;
                for (let i = 0; i < diagSize; i++)
                    diagSum += board[board.length - 1 - i - j][i];
                if (diagSum === -diagSize) //sum = -3, o wins
                    return -1;
                if (diagSum === diagSize) //sum = 3, x wins
                    return 1;
            } else {
                let diagSum = 0;
                for (let i = 0; i < diagSize; i++)
                    diagSum += board[i][i + j];
                if (diagSum === -diagSize) //sum = -3, o wins
                    return -1;
                if (diagSum === diagSize) //sum = 3, x wins
                    return 1;
                diagSum = 0;
                for (let i = 0; i < diagSize; i++)
                    diagSum += board[board.length - 1 - i][i + j];
                if (diagSum === -diagSize) //sum = -3, o wins
                    return -1;
                if (diagSum === diagSize) //sum = 3, x wins
                    return 1;
            }
        }


        if (this.isDraw(board))
            return 0;
        return 'unfinished';
    }

    createBoard([width, height]) {
        let board = new Array(width);
        for (let x = 0; x < width; x++) {
            board[x] = new Array(height);
            for (let y = 0; y < height; y++)
                board[x][y] = 0;
        }
        return board;
    }

    printBoard(board) {
        let toPrint = '';
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board[x].length; y++) {
                switch (board[x][y]) {
                    case 1:
                        toPrint += 'X';
                        break;
                    case -1:
                        toPrint += 'O';
                        break;
                    case 0:
                        toPrint += '_';
                        break;
                }
                toPrint += ' ';
            }
            toPrint += '\n';
        }
        console.log(toPrint);
    }
}