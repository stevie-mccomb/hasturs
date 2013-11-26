var app = angular.module('hasturs', ['ngRoute', 'ngResource'])

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

app.directive('featuredEvents', ['$http', function($http) {
	return {
		link: function(scope, elem) {
			scope.events = $http({
				method: 'POST',
				url: 'data/events.php',
				data: 1
			}).success(function(data) {
				scope.events = data;
				var maxLength = 300;
				for (var i = 0; i < scope.events.length; ++i) {
					if (scope.events[i].description.length > maxLength) {
						scope.events[i].truncated = true;
						var splitDescription = scope.events[i].description.split(' ');
						var compound = '';
						for (var i2 = 0; i2 < splitDescription.length; ++i2) {
							if ((compound.length + splitDescription[i2].length) <= 300) {
								compound += splitDescription[i2] + ' ';
							} else {
								scope.events[i].description = compound;
							}
						}
					}
				}
			});
		}
	}
}]);

app.directive('featuredProducts', ['$http', function($http) {
	return {
		link: function(scope, elem) {
			scope.events = $http({
				method: 'POST',
				url: 'data/products.php',
				data: 1
			}).success(function(data) {
				scope.productsOne = data;
			});
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
			$http({
				method: 'POST',
				url: 'data/products.php',
				data: scope.categoryName,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data) {
				scope.products = data;
			});

			scope.viewProduct = function(product) {
				window.location = '#/products/' + scope.categoryName + '/' + product.name;
			};

			scope.closeLightbox = function() {
				window.location = '#/products/' + scope.categoryName;
			};
		}
	}
}]);