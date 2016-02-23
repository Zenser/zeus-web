/**
 * Created by zhangshuai on 2016/2/17 0017.
 */
angular.module('main')
    .service('bookInfoService',['$rootScope','$http',function($rootScope,$http){
        var service = this;
        var bookInfo = $rootScope.bookInfo;
        //service.bookInfo = (function(){
        //    $http({
        //        url:'config/bookInfo.json',
        //        method:'get'
        //    }).success(function(data){
        //        bookInfo = data.data;
        //    }).error(function(msg){
        //        console.log(msg);
        //        return msg;
        //    });
        //})() ;
        //localBookInfoFactory.getLocalBookInfo().then(function(data){
        //        console.log(data);
        //        bookInfo = data.data;
        //    },function(msg){
        //        cosole.log(msg);
        //    });
        this.getBookInfo = function(){
            return bookInfo;
        };

        this.setBookInfo = function(obj){
            if(obj){
                bookInfo[obj.bookId] = obj;
            }
        };

        this.addBook = function(obj){
            if(obj){
                bookInfo[obj.bookId] = obj;
            }
        };

        this.delBook = function(obj){
            delete bookInfo[obj.bookId];
        };
    }]);