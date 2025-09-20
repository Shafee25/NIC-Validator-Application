import React from 'react';

const ResultsTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No data to display.</p>;
    }

    return (
        <table className="results-table">
            <thead>
                <tr>
                    <th>NIC Number</th>
                    <th>Birth Date</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Source File</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.nic_number}</td>
                        <td>{item.birth_date}</td>
                        <td>{item.gender}</td>
                        <td>{item.age}</td>
                        <td>{item.source_file}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ResultsTable;