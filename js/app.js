var app = angular.module('hasturs', ['ngRoute', 'ngResource'])
	.config(viewRouter);

// Router

function viewRouter($routeProvider) {
	$routeProvider
		.when('/events', {
			templateUrl: 'partials/events.html'
		})
		.when('/products', {
			templateUrl: 'partials/products.html'
		})
		.when('/products/:category', {
			templateUrl: 'partials/product-category.html',
			controller: function($scope, $routeParams) {
				$scope.category = $routeParams.category;
			}
		})
		/*.when('/products/:productName', {
			templateUrl: 'partials/products.html',
			controller: function($scope, $routeParams) {
				$scope.product = $routeParams.productName;
			}
		})*/
		.when('/contact', {
			templateUrl: 'partials/contact.html'
		})
		.otherwise({templateUrl: 'partials/home.html'});
};

// Directives

app.directive('navigation', ['$rootScope', function($rootScope) {
	return {
		link: function(scope, elem) {
			scope.setActive = function(view) {
				scope.activeView = view;
			};
		}
	}
}]);

app.directive('slideshow', ['SlideFactory', function(SlideFactory) {
	return {
		link: function(scope, elem) {
			scope.slides = SlideFactory.slides.get();
			scope.current = 0;

			scope.slidesLength = function(obj) {
			    var size = 0, key;
			    for (key in obj) {
			        if (obj.hasOwnProperty(key)) size++;
			    }
			    return size;
			};

			scope.previous = function() {
				if (scope.current - 1 < 0) {
					scope.current = scope.slidesLength(scope.slides) - 1;
				} else {
					scope.current--;
				}
			}

			scope.next = function() {
				if (scope.current + 1 > scope.slidesLength(scope.slides) - 1) {
					scope.current = 0;
				} else {
					scope.current++;
				}
			}
		}
	}
}]);

app.directive('featuredEvents', ['EventFactory', function(EventFactory) {
	return {
		link: function(scope, elem) {
			scope.events = EventFactory.events.get();
		}
	}
}]);

app.directive('featuredProducts', ['ProductFactory', function(ProductFactory) {
	return {
		link: function(scope, elem) {
			scope.productsOne = ProductFactory.productsOne.get();
			scope.productsTwo = ProductFactory.productsTwo.get();
		}
	}
}]);

var productContainer = app.directive('productContainer', ['ProductFactory', function(ProductFactory) {
	return {
		link: function(scope, elem) {
			/*scope.products = $http({
				method: 'POST',
				url: 'data/products.php',
				data: scope.category,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data) {
				scope.products = data;
			});*/
			scope.viewingCategory = false;
			scope.viewingProduct = false;
			scope.productCategories = ProductFactory.productCategories.get();

			scope.viewCategory = function(category) {
				scope.category = category;
				scope.products = ProductFactory.getProducts(category).get();
				scope.viewingCategory = category.name;
			};

			scope.viewProduct = function(product) {
				scope.currentProduct = product;
				scope.viewingProduct = product.name;
			};
		}
	}
}]);

app.directive('category', ['$http', function($http) {
	return {
		link: function(scope) {
			scope.category = $http({
				method: 'POST',
				url: 'data/categories.php',
				data: scope.category,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data) {
				scope.category = data[0];
				scope.products = data[1];
			});
		}
	}
}]);