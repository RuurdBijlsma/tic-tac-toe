<template>
    <div id="app">
        <div class="settings-icon" @click="showSettings=!showSettings"></div>
        <tic-tac-toe :ai-enabled="aiEnabled" :ai-first="aiFirst" :size-x="+sizeX" :size-y="+sizeY" ref="tic"></tic-tac-toe>
        <div class="settings" v-if="showSettings">
            <label>
                Enable AI
                <input type="checkbox" v-model="aiEnabled">
            </label>
            <label v-if="aiEnabled">
                AI moves first
                <input type="checkbox" v-model="aiFirst">
            </label>
            <label>
                Board width
                <input type="number" v-model="sizeX">
            </label>
            <label>
                Board height
                <input type="number" v-model="sizeY">
            </label>
            <input type="button" value="Reset game" @click="showSettings=false; $refs.tic.resetGame()">
            <input type="button" value="Hide settings" @click="showSettings=false">
        </div>
    </div>
</template>

<script>
    import TicTacToe from "@/components/TicTacToe";

    export default {
        name: 'app',
        components: {
            TicTacToe
        },
        data() {
            return {
                showSettings: false,
                aiEnabled: true,
                aiFirst: true,
                sizeX: 4,
                sizeY: 3
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height:100vh;
    }

    .settings-icon{
        top:10px;
        left:10px;
        position: fixed;
        background-image:url(assets/settings.svg);
        background-size:50%;
        background-position: center;
        background-repeat: no-repeat;
        background-color:rgba(0,0,0,0.05);
        width:50px;
        height:50px;
        border-radius:50%;
        cursor:pointer;
        box-shadow:0 0 10px 0 rgba(0,0,0,0.25);
    }

    .settings {
        position: fixed;
        width:500px;
        top: 20px;
        left: calc(50% - 270px);
        border-radius: 10px;
        padding: 20px;
        display: block;
        margin:0 auto;
        background-color: rgb(200, 200, 200);
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);
    }

    .settings label {
        display: block;
        font-size: 20px;
        margin: 20px;
    }

    .settings input {
        font-size:30px;
        padding:5px;
        border-radius:3px;
        border:none;
        width:100px;
        text-align: center;
    }

    .settings input[type=button]{
        font-size:25px;
        width:200px;
        padding:20px;
        margin:10px;
        cursor:pointer;
        box-shadow:0 3px 5px 0 rgba(0,0,0,0.3);
    }

    .settings input[type=checkbox] {
        width: 50px;
        height: 50px;

        cursor: pointer;
    }

    html, body {
        height:100% !important;
        margin: 0;
        padding: 0;
    }
</style>
