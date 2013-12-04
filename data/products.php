<?php

	$parameter = file_get_contents("php://input");

	require 'idiorm.php';
	require 'db-connection.php';

	// Get Category ID:
	if ($parameter != 1) {
		$category = ORM::for_table('categories')->where('name', $parameter)->find_one();
	}

	// Products
	if ($parameter != 1) {
		$productsData = ORM::for_table('products')->where('category', $category->id)->find_many();
	} else {
		$productsData = ORM::for_table('products')->where('featured', $parameter)->find_many();
	}
	$products = array();
	foreach($productsData as $productData) {
		$product = new stdClass();
			$product->name = $productData->name;
			switch($productData->category) {
				case 1:
					$product->category = 'Board Games';
				break;
				case 2:
					$product->category = 'Card Games';
				break;
				case 3:
					$product->category = 'Table-Top Games';
				break;
				case 4:
					$product->category = 'Comics';
				break;
				case 5:
					$product->category = 'Puzzles';
				break;
				case 6:
					$product->category = 'Jewelry';
				break;
				default:
					$product->category = 'Card Games';
				break;
			}
			$product->thumb = $productData->thumb;
			$product->image = $productData->image;
			$product->players = $productData->players;
			$product->playtime = $productData->playtime;
			$product->price = $productData->price;
		array_push($products, $product);
	}

	echo json_encode($products);

?>