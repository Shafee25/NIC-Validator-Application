<?php
    // Include the database connection file
    include_once '../config/database.php';

    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405); // Method Not Allowed
        echo json_encode(['message' => 'Invalid request method.']);
        exit();
    }

    // Get the posted data (from the request body)
    $data = json_decode(file_get_contents("php://input"));

    // Validate input
    if (empty($data->username) || empty($data->password)) {
        http_response_code(400); // Bad Request
        echo json_encode(['message' => 'Username and password are required.']);
        exit();
    }

    $username = $data->username;
    $password = $data->password;

    // --- Check if user already exists ---
    $checkUserSql = "SELECT id FROM users WHERE username = ?";
    $stmt = $conn->prepare($checkUserSql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        http_response_code(409); // Conflict
        echo json_encode(['message' => 'Username already exists.']);
        $stmt->close();
        $conn->close();
        exit();
    }
    $stmt->close();

    // --- Create new user ---
    // Hash the password for security
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    $insertSql = "INSERT INTO users (username, password) VALUES (?, ?)";
    $stmt = $conn->prepare($insertSql);
    $stmt->bind_param("ss", $username, $hashed_password);

    if ($stmt->execute()) {
        http_response_code(201); // Created
        echo json_encode(['message' => 'User registered successfully.']);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['message' => 'Failed to register user.']);
    }

    $stmt->close();
    $conn->close();
?>