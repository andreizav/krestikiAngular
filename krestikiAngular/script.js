var app = angular.module("krestiki", ["ui.router"]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/main");

    $stateProvider
    .state("main", {
        url: "/main",
        template: "<main></main>"
    })
})