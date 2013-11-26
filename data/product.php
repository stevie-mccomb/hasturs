<?php

require 'idiorm.php';
require 'db-connection.php';

$productName = file_get_contents('php://input');

$productData = ORM::for_table('products')->where('name', $productName)->find_one();

$product = new stdClass();
	$product->name = $productData->name;
	$product->thumb = $productData->thumb;
	$product->image = $productData->image;
	$product->players = $productData->players;
	$product->playtime = $productData->playtime;
	$product->price = $productData->price;

echo json_encode($product);
exit;

?>