<?php

	$category = file_get_contents("php://input");

	require 'idiorm.php';
	require 'db-connection.php';

	// Products
	$productsData = ORM::for_table('products')->where('type', $category)->find_many();
	$products = array();
	foreach($productsData as $productData) {
		$product = new stdClass();
		$product->name = $productData->name;
		$product->type = $productData->type;
		$product->players = $productData->players;
		$product->playtime = $productData->playtime;
		$product->price = $productData->price;
		array_push($products, $product);
	}

	// Category:
	$categoryData = ORM::for_table('categories')->where('code', $category)->find_one();
	$categoryName = $categoryData['name'];

	$finalData = array($categoryName, $products);
	echo json_encode($finalData);

?>