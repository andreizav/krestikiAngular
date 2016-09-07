"use strict";

app.component("main", {
    templateUrl: "app/templates/main.html",
    controller: function (mainService,$scope) {
        this.winState = [7, 73, 273, 146, 292, 84, 56, 448];
        this.playerStates = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.secondPlayerStates = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.board = {};
        this.allBoards = [];
        this.player = {}

        var self = this;

        firebase.database().ref('/boards/' + mainService.boardId).on('child_changed', function (data) {
            console.log(data.key)
            console.log(data.val())
            self.board = data.val()
            self.updateSecondPlayerStates();
            if (self.checkIfWin(self.secondPlayerStates)) {
                alert("you lose");
            }
            $scope.$digest();
        })

        firebase.database().ref('/boards/').on('child_added', function (data) {
            mainService.getAllBoards().then(function (result) {
                self.allBoards = result;
                console.log(self.allBoards);
            })
        })

        this.init = (function () {
            //get current boards from db
            mainService.getAllBoards().then(function (result) {
                self.allBoards = result;
                console.log(self.allBoards);
            })
        })();

        this.createNewPlayer = function () {
            self.player = {
                "name": "Andrey",
                "turnNum": 0
            }

            mainService.addPlayerToDb(self.player);
        }

        this.createNewBoard = function () {
            self.player.turnNum = 1;
            self.board = {
                "boardStates": [0, 0, 0, 0, 0, 0, 0, 0, 0],
                "startIndication": self.getRandomSide(1, 2)
            }

            mainService.addBoardToDb(self.board).then(function (result) {
                console.log("addBoardToDb")
                console.log(result)
                mainService.updatePlayerInDb(self.player);
            });
        }

        this.connectToBoard = function (id) {
            console.log("id board to connect" + id);
            self.player.turnNum = 2;
            mainService.getBoardFromDb(id).then(function (result) {
                self.board = result;
                console.log(result)
                mainService.boardId = id;
                mainService.updatePlayerInDb(self.player);
            });
        }

        this.addState = function (state, index) {
            if (state != 0) {
                alert("not posible");
                return
            } else if (self.board.startIndication != self.player.turnNum) {
                alert("not your turn");
                return
            }

            self.playerStates[index] = 1;
            self.board.boardStates[index] = 1;
            self.board.startIndication = self.board.startIndication == 1 ? 2 : 1;

            if (this.checkIfWin(self.playerStates)) {
                setTimeout(() => { alert("you win") }, 100)
            }

            mainService.updateBoardInDb(self.board);
        }

        this.checkIfWin = function (states) {
            return self.winState.includes(parseInt(states.join(""), 2));
        }

        this.updateSecondPlayerStates = function(){
            self.board.boardStates.forEach(function(item, i) {
                if(item == 1 && self.playerStates[i] == 0){
                    self.secondPlayerStates[i] = 1;
                }
            });
        }

        this.getRandomSide = function (min, max) {
            var rand = min + Math.random() * (max - min)
            rand = Math.round(rand);
            return rand;
        }



        //mainService.saveBoard(this.board).then(function (result) {
        //    console.log(result);
        //})

        //mainService.saveMove("das", "das").then(function (result) {
        //    console.log(result);
        //})
    }
})