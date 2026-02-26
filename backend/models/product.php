<?php
class Product {
    private $conn;
    private $table_name = "products";

    public $id;
    public $name;
    public $category;
    public $price;
    public $description;
    public $image;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT id, name, category, price, description, image FROM " . $this->table_name . " ORDER BY category, id ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readByCategory() {
        $query = "SELECT id, name, category, price, description, image FROM " . $this->table_name . " WHERE category = ? ORDER BY id ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->category);
        $stmt->execute();
        return $stmt;
    }

    public function readOne() {
        $query = "SELECT id, name, category, price, description, image FROM " . $this->table_name . " WHERE id = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if($row) {
            $this->name = $row['name'];
            $this->category = $row['category'];
            $this->price = $row['price'];
            $this->description = $row['description'];
            $this->image = $row['image'];
            return true;
        }
        return false;
    }
}
?>