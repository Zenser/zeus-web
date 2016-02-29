/**
 * Created by zhangshuai on 2016/2/17 0017.
 */
angular.module('main')
    .factory('localBookInfoFactory',['$q','$http',function($q,$http){
            var getLocalBookInfo = function () {
                //var defered = $q.defer();
                //defered.resolve( $http({
                //    method: 'get',
                //    url: 'config/bookInfo.json'
                //}));
                //return defered.promise;
                return $http({
                    method: 'get',
                    url: 'config/bookInfo.json'
                });
                //return defered.promise.then(function(data){
                //    console.log(data);
                //    return data.data;
                //},function(msg){
                //    cosole.log(msg);
                //    return msg;
                //});
                //return $http.get('config/bookInfo.json').success(function(data){
                //        return data.data;
                //    }).error(function(msg){
                //        return msg;
                //    })
            };
            return {
                getLocalBookInfo:getLocalBookInfo
            };

    }]);