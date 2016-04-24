/**
 * Created by zeus on 2016/4/24.
 */
angular.module('zeus')
    .controller('homeController', ['$scope', 'SweetAlert', 'articleService', function ($scope, alert, articleService) {
        $scope.articles = [];
        articleService.getArticles(1).then(function (result) {
                $scope.articles = result.data;
        }, function () {
                alert.error('加载失败,请检查网络连接')
        })
    }]);