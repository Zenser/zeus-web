/**
 * Created by zhangshuai on 2016/2/17 0017.
 */
angular.module('main')
    .controller('addOrEditController',['$scope','$stateParams','bookInfoService',function($scope,$stateParams,bookInfoService){
        $scope.isEdit =false;
        $scope.book=$stateParams.data;
        if($stateParams.data){
            $scope.isEdit = true;
        }
        $scope.addBook = bookInfoService.addBook;




    }]);
