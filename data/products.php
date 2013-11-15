<?php

	$category = file_get_contents("php://input");

	require 'idiorm.php';
	require 'db-connection.php';

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
	echo json_encode($products);

?>