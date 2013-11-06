var app = angular.module('hasturs', ['ngResource'])
	.config(viewRouter);

// Router

function viewRouter($routeProvider) {
	$routeProvider
		.when('/events', {templateUrl: 'partials/events.html'})
		.when('/products', {templateUrl: 'partials/products.html'})
		.when('/contact', {templateUrl: 'partials/contact.html'})
		.otherwise({templateUrl: 'partials/home.html'});
};

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

app.directive('productContainer', ['ProductFactory', function(ProductFactory) {
	return {
		link: function(scope, elem) {
			scope.viewingCategory = false;
			scope.viewingProduct = false;
			scope.productCategories = ProductFactory.productCategories.get();

			scope.viewCategory = function(category) {
				scope.category = category;
				scope.products = ProductFactory.products.get();
				scope.viewingCategory = category.name;
			}

			scope.viewProduct = function(product) {
				scope.viewingProduct = product;
			}
		}
	}
}]);