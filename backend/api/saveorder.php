<?php
$root = dirname(__DIR__);
include_once $root . '/config/db.php';
include_once $root . '/models/Order.php';

$database = new Database();
$db = $database->getConnection();

$order = new Order($db);
$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->customer_name) &&
    !empty($data->phone) &&
    !empty($data->address) &&
    !empty($data->cart_items) &&
    !empty($data->total_price)
) {
    $order->customer_name = $data->customer_name;
    $order->phone = $data->phone;
    $order->customer_email = $data->customer_email ?? '';
    $order->address = $data->address;
    $order->cart_items = json_encode($data->cart_items);
    $order->total_price = $data->total_price;
    $order->order_method = $data->order_method ?? 'whatsapp';

    if($order->create()) {
        http_response_code(201);
        echo json_encode(array(
            "success" => true,
            "message" => "Order saved successfully.",
            "order_id" => $order->id
        ));
    } else {
        http_response_code(503);
        echo json_encode(array(
            "success" => false,
            "message" => "Unable to save order."
        ));
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "message" => "Incomplete data."
    ));
}
?>