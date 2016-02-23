/**
*页面入口
*/
angular.module('demo',[
	'ui.router',
	'main'
	])
	.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
		$stateProvider
			.state('list',{
				url:'/list',
				templateUrl:'views/list.html',
				controller:'listController'
				//views:{
				//	'':{
				//		templateUrl:'views/list.html',
				//		controller:'listController'
				//	}
				//}
			})
			.state('addOrEdit',{
				url:'/addOrEdit',
				templateUrl:'views/addOrEdit.html',
				controller:'addOrEditController',
				params:{
					data:null
				}
			});

		$urlRouterProvider
			.when('/main','/main/list')
			.otherwise('/list');

	}])
	.run(['$rootScope','localBookInfoFactory',function($rootScope,localBookInfoFactory){
		localBookInfoFactory.getLocalBookInfo().then(function(data){
			        console.log(data);
			        $rootScope.bookInfo = {};
					data.data.forEach(function(item){
						$rootScope.bookInfo[item.bookId]=item;
					});
			    },function(msg){
			        cosole.log(msg);
			    });
	}]);