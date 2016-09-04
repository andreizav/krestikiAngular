angular.module("krestiki").service("mainService", function ($http) {
    this.board = {
        "boardId": "",
        "boardStates": [0, 1, 2, 1, 0, 2, 0, 1, 2],
        "winState": [7, 73, 273, 146, 292, 84, 56, 448],
        "players": [] // array of players id
    }

    this.players = {
        "id1": {
            "name": "",
            "states": [0, 1, 0, 1, 0, 0, 0, 1, 0],
            "gameSide": 1
        },
        "id2": {
            "name": "",
            "states": [0, 0, 1, 0, 0, 1, 0, 0, 1],
            "gameSide": 2
        }
    }


})