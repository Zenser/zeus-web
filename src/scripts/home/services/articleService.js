/**
 * Created by zeus on 2016/4/24.
 */
angular.module('zeus')
    .service('articleService', ['$http', '$q', 'serverUrl', function ($http, $q, serverUrl) {

        var articles = [];
        this.getArticles = function (userId) {
            var defer = $q.defer();
            $http({
                method: 'get',
                url: serverUrl + '/article',
                params: {
                    userId: userId
                }
            }).then(function (result) {
                articles = result.data;
                defer.resolve(result);
            }, function (msg) {
                defer.reject(msg);
            });
            return defer.promise;
        };

        function findArticle(articleId) {
            for (var i = 0, len = articles.length; i < len; i++) {
                if (articles[i].articleId === articleId) {
                    return articles[i];
                }
            }
        }

        this.getArticleDetail = function (articleId) {
            var defer = $q.defer();
            if (articles.length === 0) {
                this.getArticles(1).then(function (result) {
                    articles = result.data;
                    defer.resolve(findArticle(articleId));
                }, function (msg) {
                    defer.reject(msg);
                });
                return defer.promise;
            } else {
                defer.resolve(findArticle(articleId));
                return defer.promise;
            }
        }
    }]);