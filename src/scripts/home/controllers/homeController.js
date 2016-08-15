/**
 * Created by zeus on 2016/4/24.
 */
angular.module('zeus')
    .controller('homeController', ['$scope', '$state', 'SweetAlert', 'articleService',
        function ($scope, $state, alert, articleService) {
            $scope.articles = [];
            articleService.getArticles(1).then(function (result) {
                $scope.articles = result.data;
            }, function () {
                alert.error('加载失败,请检查网络连接')
            });

            $scope.go2Article = function (articleId) {
                $state.go('main.article', {articleId: articleId})
            }

        }]);