<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    include_once '../config/database.php';

    try {
        $allData = [];
        // SQL query to get all records, ordering by the newest ones first
        $sql = "SELECT id, nic_number, birth_date, gender, age, source_file FROM nic_data ORDER BY upload_timestamp DESC";
        
        $result = $conn->query($sql);

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $allData[] = $row;
            }
        }

        $conn->close();
        http_response_code(200);
        echo json_encode($allData);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'message' => 'Failed to retrieve data.',
            'error' => $e->getMessage()
        ]);
    }
?>