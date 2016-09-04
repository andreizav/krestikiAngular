"use strict";

app.component("main", {
    templateUrl: "app/templates/main.html",
    controller: function (mainService) {
        this.board = mainService.board;
        this.players = mainService.players;

        this.addState = function (state, index) {
            if (state != 0) {
                alert("not posible");
                return
            }

            this.board.boardStates[index] = 1;

            if (!this.checkIfWin(this.players["id2"].states)) {
                this.changePlayerSide();
            } else {
                setTimeout(() => { alert("you win") }, 100)
            }
        }

        this.checkIfWin = function (states) {
            return this.board.winState.includes(parseInt(states.join(""), 2));
        }

        this.changePlayerSide = function () {

        }

        //mainService.saveBoard(this.board).then(function (result) {
        //    console.log(result);
        //})

        mainService.saveMove("das", "das").then(function (result) {
            console.log(result);
        })
    }
})