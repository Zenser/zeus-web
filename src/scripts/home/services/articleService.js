/**
 * Created by zeus on 2016/4/24.
 */
angular.module('zeus')
    .service('articleService', ['$http', 'serverUrl', function ($http, serverUrl) {

        this.getArticles = function (userId) {
            return $http({
                method: 'get',
                url: serverUrl + '/article',
                header:{

                },
                params: {
                    userId: userId
                }
            })
        }
    }]);