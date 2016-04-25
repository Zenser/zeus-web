/**
 * Created by zeus on 2016/4/25.
 */
angular.module('zeus.article')
    .controller('articleController', ['$scope', '$state', 'SweetAlert', 'articleService',
        function ($scope, $state, alert, articleService) {
            articleService.getArticleDetail(parseInt($state.params.articleId)).then(
                function (result) {
                    $scope.article = result;
                }, function () {
                    alert.error('网络连接异常');
                }
            );
        }]);