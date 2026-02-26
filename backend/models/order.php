<?php
class Order {
    private $conn;
    private $table_name = "orders";

    public $id;
    public $customer_name;
    public $phone;
    public $customer_email;
    public $address;
    public $cart_items;
    public $total_price;
    public $order_method;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
            SET customer_name=:customer_name, phone=:phone, customer_email=:customer_email,
                address=:address, cart_items=:cart_items, total_price=:total_price,
                order_method=:order_method";
        $stmt = $this->conn->prepare($query);

        $this->customer_name = htmlspecialchars(strip_tags($this->customer_name));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
        $this->customer_email = htmlspecialchars(strip_tags($this->customer_email));
        $this->address = htmlspecialchars(strip_tags($this->address));
        // cart_items is JSON - don't sanitize it
        $this->total_price = htmlspecialchars(strip_tags($this->total_price));
        $this->order_method = htmlspecialchars(strip_tags($this->order_method));

        $stmt->bindParam(":customer_name", $this->customer_name);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":customer_email", $this->customer_email);
        $stmt->bindParam(":address", $this->address);
        $stmt->bindParam(":cart_items", $this->cart_items);
        $stmt->bindParam(":total_price", $this->total_price);
        $stmt->bindParam(":order_method", $this->order_method);

        if($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }
}
?>