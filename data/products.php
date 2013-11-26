<?php

	$category = file_get_contents("php://input");

	require 'idiorm.php';
	require 'db-connection.php';

	// Get Category ID:
	$categoryId = ORM::for_table('categories')->where('name', $category)->find_one();

	// Products
	$productsData = ORM::for_table('products')->where('category', $categoryId->id)->find_many();
	$products = array();
	foreach($productsData as $productData) {
		$product = new stdClass();
		$product->name = $productData->name;
		$product->thumb = $productData->thumb;
		$product->image = $productData->image;
		$product->players = $productData->players;
		$product->playtime = $productData->playtime;
		$product->price = $productData->price;
		array_push($products, $product);
	}

	echo json_encode($products);

?>