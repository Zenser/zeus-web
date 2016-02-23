
angular.module('main',[])
	.controller('listController',['$scope','$state','bookInfoService',function($scope,$state,bookInfoService){
		$scope.items =bookInfoService.getBookInfo();

		$scope.delBook = bookInfoService.delBook;

		$scope.go2Edit = function(item){
			$state.go('addOrEdit',{data:item});
		}
	}]);