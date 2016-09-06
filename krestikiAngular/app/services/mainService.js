angular.module("krestiki").service("mainService", function ($http) {
    this.playerId = "";
    this.boardId = "";

    var self = this;

    this.addPlayerToDb = function (player) {
        return $http.post('https://krestiki-ca3c0.firebaseio.com/players.json', player)
        .then(function (response) {
            playerId = response.data.name;
        });
    }

    this.getAllBoards = function () {
        return $http.get('https://krestiki-ca3c0.firebaseio.com/boards.json')
        .then(function (response) {
            return response.data;
        });
    }

    this.removePlayerFromDb = function () {

    }

    this.updatePlayerInDb = function (player) {
        return $http.put('https://krestiki-ca3c0.firebaseio.com/players/' + playerId + '.json', player)
            .then(function (response) {
                return response.data;
            });
    }

    this.addBoardToDb = function (board) {
        return $http.post('https://krestiki-ca3c0.firebaseio.com/boards.json', board)
            .then(function (response) {
                boardId =  response.data.name;
            });
    }

    this.removeBoardFromDb = function () {

    }

    this.updateBoardInDb = function (board) {
        return $http.put('https://krestiki-ca3c0.firebaseio.com/boards/' + boardId + '.json', board)
            .then(function (response) {
                return response.data;
            });
    }

    this.addPlayerToBoard = function () {

    }

    this.removePlayerFromBoard = function () {

    }

    this.connectToBoard = function () {

    }



    //firebase.database().ref('/boards').on('value', function (snapshot) {
    //    console.log(snapshot.key)
    //})

    firebase.database().ref('/boards').on('child_removed', function (data) {
        console.log(data.key)
        console.log(data.val())
    })

    //var starCountRef = firebase.database().ref();
    //starCountRef.on('value', function (snapshot) {
    //    alert(snapshot)
    //});

    //starCountRef.on('child_added', function (snapshot) {
    //    alert(snapshot)
    //});

    //starCountRef.on('child_changed', function (snapshot) {
    //    alert(snapshot)
    //});

    //starCountRef.on('child_removed', function (snapshot) {
    //    alert(snapshot)
    //});

    //var eventSource = new EventSource('https://krestiki-ca3c0.firebaseio.com/boards');

    //eventSource.addEventListener('message', function (e) {
    //    alert('Сообщение ' + e.data.split('\n'));
    //});

    //eventSource.onmessage = function (e) {
    //    console.log("Пришли данные: " + e);
    //};


    //this.saveBoard = function (board) {
    //    return $http.post('https://krestiki-ca3c0.firebaseio.com/boards.json', board)
    //      .then(response => {
    //          return response.data;
    //      });
    //}

    this.saveMove = function (id, move) {
        return firebase.database().ref('boards/zcxv').set([1, 2, 3])

        //return $http.put('https://krestiki-ca3c0.firebaseio.com/krestiki-ca3c0/boards/zcxv', {
        //    data:"1"
        //})
        //  .then(response => {
        //      return response.data;
        //  });
    }


})