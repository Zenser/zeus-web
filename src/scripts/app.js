/**
*页面入口
*/
angular.module('demo',[
	'ui.router',
	'main'
	])
	.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
		$stateProvider
			.state('main',{
				url:'/main',
				templateUrl:'views/main.html'
			})
			.state('main.list',{
				url:'/list',
				templateUrl:'views/book/list.html',
				controller:'listController'
				//views:{
				//	'':{
				//		templateUrl:'views/list.html',
				//		controller:'listController'
				//	}
				//}
			})
			.state('main.addOrEdit',{
				url:'/addOrEdit',
				templateUrl:'views/book/addOrEdit.html',
				controller:'addOrEditController',
				params:{
					data:null
				}
			});

		$urlRouterProvider
			.otherwise('/main');

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