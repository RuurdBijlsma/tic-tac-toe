<template>
    <div v-if="update" class="tic">
        <div class="board">
            <div class="tic-row" v-for="(row, x) in board">
                <div class="tic-item"
                     v-for="(item, y) in row"
                     @click="play(x,y)"
                     :style="`width: ${80 * 2 / sizeX}px;
                            height: ${80 * 2 / sizeX}px;
                            line-height: ${80 * 2 / sizeX}px;
                            background-color: ${dict[item].color};`">
                    {{dict[item].symbol}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Tic from "@/js/Tic";
    import swal from "sweetalert2";

    let size = [4, 3];
    let tic = new Tic(size.reverse());
    console.log(tic);

    export default {
        name: 'TicTacToe',
        data() {
            return {
                update: true,
                dict: {
                    '1': {symbol: '✕', color: 'green'},
                    '0': {symbol: '', color: 'black'},
                    '-1': {symbol: '𐤏', color: 'orange'}
                },
                board: tic.board,
                turn: 1,
            }
        },
        props: {
            sizeX: {type: Number, default: tic.boardSize[1]},
            sizeY: {type: Number, default: tic.boardSize[0]},
            aiEnabled: {type: Boolean, default: true},
            aiFirst: {type: Boolean, default: true}
        },
        methods: {
            play(x, y) {
                if(tic.board[x][y]!==0)
                    return;
                console.log(x, y);
                this.makeMove(x, y);
                if (this.aiEnabled)
                    this.aiMove();
                console.log(tic.board[x][y]);
            },
            aiMove() {
                let [aiMove, _] = tic.alphaBeta(tic.board, this.turn);
                this.makeMove(...aiMove);
            },
            makeMove(...move) {
                tic.doMove(tic.board, move, this.turn);
                this.update = false;
                this.update = true;

                let state = tic.evaluate(tic.board);
                if (state !== 'unfinished')
                    this.finishGame(state);

                this.turn *= -1;
            },
            async finishGame(state) {
                switch (state) {
                    case 1:
                        await swal.fire('X wins!');
                        break;
                    case -1:
                        await swal.fire('O wins!');
                        break;
                    case 0:
                        await swal.fire('Draw!');
                        break;
                }
                this.resetGame();
            },
            resetGame() {
                tic.reset();
                this.turn = 1;
                this.board = tic.board;
                if (this.aiFirst && this.aiEnabled)
                    this.aiMove();
            }
        },
        mounted() {
            this.resetGame();
        },
        watch: {
            sizeX() {
                console.log("X update", this.sizeX, this.sizeY);
                tic.reset([tic.boardSize[0], this.sizeX]);
                this.board = tic.board;
                this.resetGame();
            },
            sizeY() {
                console.log("Y update", this.sizeX, this.sizeY);
                tic.reset([this.sizeY, tic.boardSize[1]]);
                this.board = tic.board;
                this.resetGame();
            },
        }
    }
</script>

<style scoped>
    .tic {
    }

    .tic-row {

    }

    .tic-item {
        cursor: pointer;
        font-weight: bold;
        display: inline-block;
        width: 80px;
        height: 80px;
        border-radius: 10px;
        background-color: orange;
        color: white;
        text-align: center;
        padding: 15px;
        font-size: 40px;
        margin: 10px;
        line-height: 80px;
        vertical-align: middle;
        transition: 0.1s;
    }

    .board {
        transform-origin: 50% 0%;

        display: inline-block;
    }
</style>
