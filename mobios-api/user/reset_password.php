<?php
    include_once '../config/database.php';

    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->token) || empty($data->password)) {
        http_response_code(400);
        echo json_encode(['message' => 'Token and new password are required.']);
        exit();
    }

    $token = $data->token;
    $new_password = $data->password;

    // Find the token in the database
    $stmt = $conn->prepare("SELECT email, expires_at FROM password_resets WHERE token = ?");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        http_response_code(404);
        echo json_encode(['message' => 'Invalid or expired token.']);
        exit();
    }

    $row = $result->fetch_assoc();
    $email = $row['email'];
    $expires_at = new DateTime($row['expires_at']);
    $now = new DateTime('NOW');

    // Check if token has expired
    if ($now > $expires_at) {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid or expired token.']);
        exit();
    }

    // Hash the new password
    $hashed_password = password_hash($new_password, PASSWORD_BCRYPT);

    // Update user's password
    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
    $stmt->bind_param("ss", $hashed_password, $email);
    $stmt->execute();

    // Delete the used token
    $stmt = $conn->prepare("DELETE FROM password_resets WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();

    http_response_code(200);
    echo json_encode(['message' => 'Password has been successfully reset. You can now log in.']);
?>