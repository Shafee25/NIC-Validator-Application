import React, { useState } from 'react';
import axios from 'axios';
import ResultsTable from './ResultsTable';

const FailuresTable = ({ data }) => {
    if (!data || data.length === 0) {
        return null;
    }
    return (
        <>
            <h3 style={{ marginTop: '30px' }}>Invalid Records</h3>
            <table className="results-table failures-table">
                <thead>
                    <tr>
                        <th>Attempted Input</th>
                        <th>Source File</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.attempted_nic}</td>
                            <td>{item.source_file}</td>
                            <td>{item.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

const NicUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [message, setMessage] = useState('');
    const [validatedData, setValidatedData] = useState([]);
    const [failedData, setFailedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        setValidatedData([]);
        setFailedData([]);
        if (event.target.files.length !== 4) {
            setMessage('You must select exactly 4 files.');
            setSelectedFiles(null);
        } else {
            setMessage(`${event.target.files.length} files selected.`);
            setSelectedFiles(event.target.files);
        }
    };

    const handleUpload = async () => {
        if (!selectedFiles) {
            setMessage('Please select 4 CSV files first.');
            return;
        }
        setIsLoading(true);
        setMessage('Uploading and processing...');
        setValidatedData([]);
        setFailedData([]);

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('csv_files[]', selectedFiles[i]);
        }

        try {
            const url = 'http://localhost/mobios-api/nic/process.php';
            const response = await axios.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data && response.data.successes && response.data.failures) {
                setValidatedData(response.data.successes);
                setFailedData(response.data.failures);
                setMessage(`Processing complete. Found ${response.data.successes.length} valid and ${response.data.failures.length} invalid records.`);
            } else {
                 setMessage('Received an unexpected response format from the server.');
            }

        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || 'An error occurred during upload.');
            } else {
                setMessage('Could not connect to the server.');
            }
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Upload NIC CSV Files</h2>
            <p>Please select exactly 4 CSV files to validate.</p>
            
            <input type="file" multiple accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={isLoading || !selectedFiles}>
                {isLoading ? 'Processing...' : 'Upload and Validate'}
            </button>
            {message && <p>{message}</p>}
            <hr />
            <h3>Valid Records Found</h3>
            <ResultsTable data={validatedData} />
            <FailuresTable data={failedData} />
        </div>
    );
};

export default NicUploader;