"use strict";

app.component("main", {
    templateUrl: "app/templates/main.html",
    controller: function (mainService,$scope) {
        this.winState = [7, 73, 273, 146, 292, 84, 56, 448];
        this.playerStates = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.secondPlayerStates = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.board = {
            "boardStates": [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
        this.allBoards = [];
        this.player = {
            "name": "Andrey"
        }

        var self = this;

        firebase.database().ref('/boards/' + mainService.boardId + '/boardStates').on('child_changed', function (data) {
            console.log(data.key)
            console.log(data.val().boardStates)
            self.board.boardStates = data.val().boardStates
            self.updateSecondPlayerStates();
            if (self.checkIfWin(self.secondPlayerStates)) {
                alert("you lose");
            }
            $scope.$digest();
        })

        this.init = (function () {
            //set player to db and save here id in mainService - must be event on login
            mainService.addPlayerToDb(self.player).then(function (result) {
                self.createNewBoard();//this must be event on button create
            });

            //get current boards from db
            mainService.getAllBoards().then(function (result) {
                self.allBoards = result;
            })
        })();

        //mainService.init();

        this.createNewBoard = function () {
            mainService.addBoardToDb(self.board).then(function (result) {
                //self.player.gameSide = self.getRandomSide(1, 2);
                mainService.updatePlayerInDb(self.player);
            });
        }

        this.addState = function (state, index) {
            if (state != 0) {
                alert("not posible");
                return
            }

            self.playerStates[index] = 1;
            self.board.boardStates[index] = 1;          

            if (!this.checkIfWin(self.playerStates)) {
                self.changePlayerSide();
            } else {
                setTimeout(() => { alert("you win") }, 100)
            }

            mainService.updateBoardInDb(self.board);
        }

        this.checkIfWin = function (states) {
            return self.winState.includes(parseInt(states.join(""), 2));
        }

        this.changePlayerSide = function () {

        }

        this.updateSecondPlayerStates = function(){
            self.board.boardStates.forEach(function(item, i) {
                if(item == 1 && self.playerStates[i] == 0){
                    self.secondPlayerStates[i] = 1;
                }
            });
        }

        //this.getRandomSide = function (min, max) {
        //    var rand = min + Math.random() * (max - min)
        //    rand = Math.round(rand);
        //    return rand;
        //}



        //mainService.saveBoard(this.board).then(function (result) {
        //    console.log(result);
        //})

        //mainService.saveMove("das", "das").then(function (result) {
        //    console.log(result);
        //})
    }
})