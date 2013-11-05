var app = angular.module('hasturs', [])
	.config(viewRouter);

// Router

function viewRouter($routeProvider) {
	$routeProvider
		.when('/products', {templateUrl: 'partials/products.html'})
		.otherwise({templateUrl: 'partials/home.html'});
}

// Directives

app.directive('navigation', ['$rootScope', function($rootScope) {
	return {
		link: function(scope, elem) {
			scope.activeView = 'home';
			scope.setActive = function(viewName) {
				scope.activeView = viewName;
			}
		}
	}
}]);

app.directive('productsList', function() {
	return {
		link: function(scope, elem) {
			console.log(elem[0].offsetHeight);
		}
	}
});