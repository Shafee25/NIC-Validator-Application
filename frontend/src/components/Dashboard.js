import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const url = 'http://localhost/mobios-api/dashboard/stats.php';
                const response = await axios.get(url);
                setStats(response.data);
            } catch (err) {
                setError('Failed to load dashboard data.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (isLoading) {
        return <p>Loading Dashboard...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!stats) {
        return <p>No data available to display.</p>;
    }
    
    const pieData = {
        labels: ['Male', 'Female'],
        datasets: [
            {
                label: 'Gender Distribution',
                data: [stats.male_count, stats.female_count],
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const barData = {
        labels: ['Gender'],
        datasets: [
            {
                label: 'Male',
                data: [stats.male_count],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
                label: 'Female',
                data: [stats.female_count],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    return (
        <div className="dashboard">
            <h2>Dashboard Summary</h2>
            <div className="stats-container">
                <div className="stat-card">
                    <h3>Total Records</h3>
                    <p>{stats.total_records}</p>
                </div>
                <div className="stat-card">
                    <h3>Male Records</h3>
                    <p>{stats.male_count}</p>
                </div>
                <div className="stat-card">
                    <h3>Female Records</h3>
                    <p>{stats.female_count}</p>
                </div>
            </div>
            <div className="charts-container">
                <div className="chart">
                    <h3>Gender Distribution (Pie Chart)</h3>
                    <Pie data={pieData} />
                </div>
                <div className="chart">
                    <h3>Gender Distribution (Bar Chart)</h3>
                    <Bar data={barData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;