var app = angular.module('hasturs', ['ngRoute', 'ngResource'])
	.config(viewRouter);

// Router

function viewRouter($routeProvider) {
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
};

// Directives

app.directive('navigation', ['$rootScope', function($rootScope) {
	return {
		link: function(scope, elem) {
			scope.getActive = function() {
				return $rootScope.activeView;
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
					scope.current = scope.slidesLength(scope.slides) - 3;
				} else {
					scope.current--;
				}
			}

			scope.next = function() {
				if (scope.current + 1 > scope.slidesLength(scope.slides) - 3) {
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

app.directive('events', ['$http', function($http) {
	return {
		link: function(scope) {
			scope.events = $http({
				method: 'POST',
				url: 'data/events.php'
			}).success(function(data) {
				scope.events = data;
			});
		}
	}
}]);

var productContainer = app.directive('productContainer', ['ProductFactory', function(ProductFactory) {
	return {
		link: function(scope, elem) {
			scope.viewingCategory = false;
			scope.viewingProduct = false;
			scope.productCategories = ProductFactory.productCategories.get();
		}
	}
}]);

app.directive('category', ['$http', function($http) {
	return {
		link: function(scope) {
			scope.category = $http({
				method: 'POST',
				url: 'data/products.php',
				data: scope.categoryName,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data) {
				scope.products = data;
			});

			scope.viewProduct = function(product) {
				scope.currentProduct = product;
				scope.viewingProduct = product.name;
			};

			scope.closeLightbox = function() {
				scope.viewingProduct = false;
			};
		}
	}
}]);