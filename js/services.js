// Services

app.factory('SlideFactory', ['$resource', function($resource) {
	return {
		slides: $resource('data/slides.json')
	}
}]);

app.factory('EventFactory', ['$resource', function($resource) {
	return {
		events: $resource('data/featured-events.json')
	}
}]);

app.factory('ProductFactory', ['$resource', function($resource) {
	return {
		productCategories: $resource('data/product-categories.json'),
		products: $resource('data/products.json'),
		productsOne: $resource('data/featured-products-one.json'),
		productsTwo: $resource('data/featured-products-two.json'),
		getProducts: function(category) {
			return $resource('data/' + category.id + '.json');
		}
	}
}]);