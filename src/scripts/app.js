/**
 *页面入口
 */
angular.module('zeus', [
        'ui.router',
        'ngAnimate',
        'oitozero.ngSweetAlert',
        'zeus.article'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/main',
                abstract: true,
                templateUrl: 'main.html'
            })
            .state('main.home', {
                url: '/home',
                templateUrl: 'home/home.html',
                controller: 'homeController'
            });

        $urlRouterProvider
            .otherwise('/main/home');

    }]);