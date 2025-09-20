<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    include_once '../config/database.php';

    try {
        // A single, efficient query to get all stats at once
        $sql = "SELECT
                    COUNT(*) AS total_records,
                    SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END) AS male_count,
                    SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END) AS female_count
                FROM nic_data";

        $result = $conn->query($sql);

        $stats = null;
        if ($result) {
            // Fetch the single row of results
            $stats = $result->fetch_assoc();
        }

        $conn->close();
        http_response_code(200);
        echo json_encode($stats);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'message' => 'Failed to retrieve dashboard stats.',
            'error' => $e->getMessage()
        ]);
    }
?>