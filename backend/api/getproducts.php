<?php
$root = dirname(__DIR__);
include_once $root . '/config/db.php';
include_once $root . '/models/Product.php';

$database = new Database();
$db = $database->getConnection();

$product = new Product($db);

if(isset($_GET['category'])) {
    $product->category = $_GET['category'];
    $stmt = $product->readByCategory();
} else {
    $stmt = $product->read();
}

$num = $stmt->rowCount();

if($num > 0) {
    $products_arr = array();
    $products_arr["products"] = array();

   while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $product_item = array(
        "id" => $row['id'],
        "name" => $row['name'],
        "category" => $row['category'],
        "price" => $row['price'],
        "description" => $row['description'],
        "image" => $row['image']
    );
    array_push($products_arr["products"], $product_item);
}

    http_response_code(200);
    echo json_encode($products_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No products found."));
}
?>