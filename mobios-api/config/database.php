<?php
    // Set headers for CORS and content type
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // Handle preflight request for CORS
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    $DB_HOST = 'localhost';
    $DB_USER = 'root'; // Default username for XAMPP/MAMP
    $DB_PASS = '';     // Default password for XAMPP is empty
    $DB_NAME = 'mobios_nic_app';

    // Create a new database connection
    $conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>