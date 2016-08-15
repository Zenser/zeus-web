/**
 * Created by zeus on 2016/4/25.
 */
angular.module('zeus.article', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('main.article', {
                url: '/article/{articleId}',
                templateUrl: 'article/article.html',
                controller: 'articleController',
                params: {
                    articleId: null
                }
            })
    }]);