<?php
    // Include the database connection file
    include_once '../config/database.php';

    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405); // Method Not Allowed
        echo json_encode(['message' => 'Invalid request method.']);
        exit();
    }

    // Get the posted data
    $data = json_decode(file_get_contents("php://input"));

    // Validate input
    if (empty($data->username) || empty($data->password)) {
        http_response_code(400); // Bad Request
        echo json_encode(['message' => 'Username and password are required.']);
        exit();
    }

    $username = $data->username;
    $password = $data->password;

    // --- Find user in the database ---
    $sql = "SELECT id, username, password FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        // User found, now verify the password
        $user = $result->fetch_assoc();

        // The password_verify() function securely checks the password against the hash
        if (password_verify($password, $user['password'])) {
            // Password is correct
            http_response_code(200); // OK
            echo json_encode([
                'status' => 'success',
                'message' => 'Login successful.'
                // In a real application, you would generate and return a token (JWT) here
            ]);
        } else {
            // Password is not correct
            http_response_code(401); // Unauthorized
            echo json_encode(['message' => 'Invalid credentials.']);
        }
    } else {
        // User not found
        http_response_code(401); // Unauthorized
        echo json_encode(['message' => 'Invalid credentials.']);
    }

    $stmt->close();
    $conn->close();
?>