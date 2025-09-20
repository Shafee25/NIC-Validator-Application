<?php
    include_once '../config/database.php';
    require '../vendor/autoload.php'; // Composer's autoloader

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->email)) {
        http_response_code(400);
        echo json_encode(['message' => 'Email address is required.']);
        exit();
    }

    $email = $data->email;

    // Check if email exists in users table
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        http_response_code(404);
        echo json_encode(['message' => 'Email not found.']);
        exit();
    }
    $stmt->close();

    // Generate a secure token
    $token = bin2hex(random_bytes(50));
    $expires = new DateTime('NOW');
    $expires->add(new DateInterval('PT1H')); // Token expires in 1 hour
    $expires_at = $expires->format('Y-m.d H:i:s');

    // Store token in database
    $stmt = $conn->prepare("INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $token, $expires_at);
    $stmt->execute();

    // Send email using PHPMailer and Mailtrap
    $mail = new PHPMailer(true);
    try {
        // --- CONFIGURE WITH YOUR MAILTRAP CREDENTIALS ---
        $mail->isSMTP();
        $mail->Host       = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth   = true;
        $mail->Port       = 2525;
        $mail->Username   = '0598e91c64aa88';
        $mail->Password   = '6222972c1e6d21';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

        //Recipients
        $mail->setFrom('password-reset@mobios.com', 'Mobios App');
        $mail->addAddress($email);

        //Content
        $reset_link = "http://localhost:3000/reset-password?token=" . $token;
        $mail->isHTML(true);
        $mail->Subject = 'Password Reset Request';
        $mail->Body    = 'Hello,<br><br>You requested a password reset. Please click the link below to reset your password:<br><br><a href="' . $reset_link . '">Reset Password</a><br><br>This link will expire in one hour.';

        $mail->send();
        http_response_code(200);
        echo json_encode(['message' => 'Password reset link has been sent to your email.']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }
?>