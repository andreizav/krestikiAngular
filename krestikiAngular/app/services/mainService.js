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
        return firebase.database().ref('boards/zcxv').set([1,2,3])

        //return $http.put('https://krestiki-ca3c0.firebaseio.com/krestiki-ca3c0/boards/zcxv', {
        //    data:"1"
        //})
        //  .then(response => {
        //      return response.data;
        //  });
    }


})