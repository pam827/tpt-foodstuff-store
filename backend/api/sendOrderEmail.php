<?php
$root = dirname(__DIR__);
include_once $root . '/config/db.php';

$data = json_decode(file_get_contents("php://input"));

// ======================================
// STORE CONFIG - UPDATE THESE VALUES
// ======================================
$store_email = "ipamilerin3@gmail.com";
$store_name  = "TPT&T NIG ENT";
// ======================================

if(
    !empty($data->customer_name) &&
    !empty($data->phone) &&
    !empty($data->cart_items) &&
    !empty($data->total_price)
) {
    $order_id = $data->order_id ?? 'N/A';
    $customer_email = $data->customer_email ?? '';

    // Build order items text
    $items_text = "";
    foreach($data->cart_items as $item) {
        $subtotal = $item->price * $item->quantity;
        $items_text .= $item->name . " x" . $item->quantity . " = NGN" . number_format($subtotal) . "\n";
    }

    // ---- EMAIL TO STORE OWNER ----
    $store_subject = "New Order #" . $order_id . " from " . $data->customer_name;

    $store_message  = "NEW ORDER RECEIVED\n\n";
    $store_message .= "Order #: " . $order_id . "\n";
    $store_message .= "Customer: " . $data->customer_name . "\n";
    $store_message .= "Phone: " . $data->phone . "\n";
    $store_message .= "Email: " . $customer_email . "\n";
    $store_message .= "Address: " . $data->address . "\n\n";
    $store_message .= "ORDER ITEMS:\n";
    $store_message .= "------------------------\n";
    $store_message .= $items_text;
    $store_message .= "------------------------\n";
    $store_message .= "TOTAL: NGN" . number_format($data->total_price) . "\n\n";
    $store_message .= "Please contact customer to confirm order.";

    $store_headers  = "From: orders@tpnt.com\r\n";
    $store_headers .= "Reply-To: " . $customer_email . "\r\n";
    $store_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $store_sent = @mail($store_email, $store_subject, $store_message, $store_headers);

    // ---- CONFIRMATION EMAIL TO CUSTOMER ----
    $customer_sent = false;
    if(!empty($customer_email)) {
        $cust_subject = $store_name . " - Order Confirmation #" . $order_id;

        $cust_message  = "Dear " . $data->customer_name . ",\n\n";
        $cust_message .= "Thank you for your order! Here is your order summary:\n\n";
        $cust_message .= "Order #: " . $order_id . "\n\n";
        $cust_message .= "ITEMS ORDERED:\n";
        $cust_message .= "------------------------\n";
        $cust_message .= $items_text;
        $cust_message .= "------------------------\n";
        $cust_message .= "TOTAL: NGN" . number_format($data->total_price) . "\n\n";
        $cust_message .= "Delivery Address: " . $data->address . "\n\n";
        $cust_message .= "We will contact you shortly to confirm your order.\n";
        $cust_message .= "If you have any questions, feel free to reach us.\n\n";
        $cust_message .= "Thank you for shopping with " . $store_name . "!\n";

        $cust_headers  = "From: orders@tpnt.com\r\n";
        $cust_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        $customer_sent = @mail($customer_email, $cust_subject, $cust_message, $cust_headers);
    }

    http_response_code(200);
    echo json_encode(array(
        "success" => true,
        "message" => "Emails processed.",
        "store_email_sent" => $store_sent,
        "customer_email_sent" => $customer_sent
    ));
} else {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "message" => "Incomplete data."
    ));
}
?>