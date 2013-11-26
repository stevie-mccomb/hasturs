// Routes

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider
		.when('/events', {
			templateUrl: 'partials/events.html',
			controller: function($rootScope) {
				$rootScope.activeView = 'events';
			}
		})
		.when('/products', {
			templateUrl: 'partials/products.html',
			controller: function($rootScope) {
				$rootScope.activeView = 'products';
			}
		})
		.when('/products/:categoryName', {
			templateUrl: 'partials/product-category.html',
			controller: function($rootScope, $scope, $routeParams) {
				$rootScope.activeView = 'products';
				$scope.categoryName = $routeParams.categoryName;
			}
		})
		.when('/products/:categoryName/:productName', {
			templateUrl: 'partials/product-category.html',
			controller: function($rootScope, $scope, $routeParams, $http) {
				$rootScope.activeView = 'products';
				$scope.categoryName = $routeParams.categoryName;
				$scope.viewingProduct = $routeParams.productName;
				$http({
					method: 'POST',
					url: 'data/product.php',
					data: $scope.viewingProduct,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data) {
					$scope.product = data;
				});
			}
		})
		.when('/contact', {
			templateUrl: 'partials/contact.html',
			controller: function($rootScope) {
				$rootScope.activeView = 'contact';
			}
		})
		.otherwise({
			templateUrl: 'partials/home.html',
			controller: function($rootScope) {
				$rootScope.activeView = 'home';
			}
		});
}]);