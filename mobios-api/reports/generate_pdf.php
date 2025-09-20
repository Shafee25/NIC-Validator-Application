<?php
    require_once('../config/database.php');
    require_once('../tcpdf/tcpdf.php');

    try {
        // 1. Fetch data from the database
        $sql = "SELECT nic_number, birth_date, gender, age, source_file FROM nic_data ORDER BY id ASC";
        $result = $conn->query($sql);
        $data = [];
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        $conn->close();

        // 2. Create new PDF document
        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
        
        // Set document information
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetAuthor('Mobios NIC Validator');
        $pdf->SetTitle('NIC Data Report');
        $pdf->SetSubject('Validated NIC Data');
        
        // Add a page
        $pdf->AddPage();
        
        // Set font
        $pdf->SetFont('helvetica', '', 10);

        // 3. Create the HTML content for the table
        $html = '<h1>NIC Data Report</h1>
        <table border="1" cellpadding="4">
            <thead>
                <tr style="background-color:#4CAF50; color:white;">
                    <th>NIC Number</th>
                    <th>Birth Date</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Source File</th>
                </tr>
            </thead>
            <tbody>';

        if (count($data) > 0) {
            foreach ($data as $row) {
                $html .= '<tr>
                            <td>' . htmlspecialchars($row['nic_number']) . '</td>
                            <td>' . htmlspecialchars($row['birth_date']) . '</td>
                            <td>' . htmlspecialchars($row['gender']) . '</td>
                            <td>' . htmlspecialchars($row['age']) . '</td>
                            <td>' . htmlspecialchars($row['source_file']) . '</td>
                        </tr>';
            }
        } else {
            $html .= '<tr><td colspan="5">No data available.</td></tr>';
        }

        $html .= '</tbody></table>';

        // 4. Write HTML content to the PDF
        $pdf->writeHTML($html, true, false, true, false, '');

        // 5. Close and output PDF document
        // 'D' means the browser will prompt the user to download the file
        $pdf->Output('nic_data_report.pdf', 'D');

    } catch (Exception $e) {
        // In case of error, you can create a simple error PDF or log the error
        header("Content-Type: text/plain");
        echo "An error occurred while generating the PDF: " . $e->getMessage();
    }
?>