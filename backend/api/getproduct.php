<?php
$root = dirname(__DIR__);
include_once $root . '/config/db.php';
include_once $root . '/models/Product.php';

$database = new Database();
$db = $database->getConnection();

$product = new Product($db);
$product->id = isset($_GET['id']) ? $_GET['id'] : die();

if($product->readOne()) {
    $product_arr = array(
        "id" => $product->id,
        "name" => $product->name,
        "category" => $product->category,
        "price" => $product->price,
        "description" => $product->description,
        "image" => $product->image
    );
    http_response_code(200);
    echo json_encode($product_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Product not found."));
}
?>