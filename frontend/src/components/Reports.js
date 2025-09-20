// src/components/Reports.js
import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const Reports = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Function to fetch all data from the database
    const getAllData = async () => {
        try {
            const response = await axios.get('http://localhost/mobios-api/nic/get_all_data.php');
            return response.data;
        } catch (error) {
            setMessage('Error fetching data for reports.');
            return null;
        }
    };

    // --- Handler for downloading CSV ---
    const handleDownloadCSV = async () => {
        setIsLoading(true);
        setMessage('Generating CSV...');
        const data = await getAllData();

        if (data && data.length > 0) {
            const csv = Papa.unparse(data);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', 'nic_data_report.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setMessage('CSV report generated.');
        } else {
            setMessage('No data available to generate CSV.');
        }
        setIsLoading(false);
    };

    // --- Handler for downloading Excel ---
    const handleDownloadExcel = async () => {
        setIsLoading(true);
        setMessage('Generating Excel...');
        const data = await getAllData();

        if (data && data.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'NIC Data');
            XLSX.writeFile(workbook, 'nic_data_report.xlsx');
            setMessage('Excel report generated.');
        } else {
            setMessage('No data available to generate Excel.');
        }
        setIsLoading(false);
    };
    
    // --- Handler for downloading PDF ---
    // This function simply points the browser to the PHP script
    const handleDownloadPDF = () => {
        setMessage('Generating PDF...');
        const url = 'http://localhost/mobios-api/reports/generate_pdf.php';
        window.open(url, '_blank');
        // A short timeout to reset the message
        setTimeout(() => setMessage(''), 2000);
    };


    return (
        <div className="reports-container">
            <h2>Generate Reports</h2>
            <p>Download all validated NIC data in your preferred format.</p>
            <div className="report-buttons">
                <button onClick={handleDownloadCSV} disabled={isLoading}>
                    Download CSV
                </button>
                <button onClick={handleDownloadExcel} disabled={isLoading}>
                    Download Excel
                </button>
                <button onClick={handleDownloadPDF} disabled={isLoading}>
                    Download PDF
                </button>
            </div>
            {message && <p className="report-message">{message}</p>}
        </div>
    );
};

export default Reports;