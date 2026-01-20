import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.css';

const DashboardPage = () => {
    const { user, logout, apiCall } = useAuth();
    const navigate = useNavigate();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadPlan();
    }, []);

    const loadPlan = async () => {
        setLoading(true);
        const result = await apiCall('GET', '/fitness/get-plan');
        
        if (result.success && result.data.plan) {
            setPlan(result.data.plan);
        }
        setLoading(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="dashboard">
            {/* Navigation */}
            <nav className="dashboard-navbar">
                <div className="nav-container">
                    <div className="logo">Healthyfy 💪</div>
                    <ul className="nav-menu">
                        <li><a href="#" onClick={() => navigate('/dashboard')}>Dashboard</a></li>
                        <li><a href="#" onClick={() => navigate('/create-plan')}>Create Plan</a></li>
                        <li><a href="#" onClick={() => navigate('/my-plan')}>My Plan</a></li>
                        <li><span className="user-name">👤 {user?.name}</span></li>
                        <li><a href="#" onClick={handleLogout} className="logout-btn">Logout</a></li>
                    </ul>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Welcome Back! 👋</h1>
                    <p>Hello {user?.name}, let's continue your fitness journey!</p>
                </div>

                {loading ? (
                    <div className="loading">Loading your plan...</div>
                ) : plan ? (
                    <div className="dashboard-grid">
                        <div className="dashboard-card">
                            <div className="card-icon">📊</div>
                            <h3>Current Plan</h3>
                            <div className="card-content">
                                <p><strong>Goal:</strong> {plan.goal}</p>
                                <p><strong>Progress:</strong> {plan.weekNumber || 0}/{plan.weeks} weeks</p>
                                <p><strong>Completion:</strong> {plan.completionPercentage || 0}%</p>
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <div className="card-icon">⚖️</div>
                            <h3>Weight Tracking</h3>
                            <div className="card-content">
                                <p><strong>Starting:</strong> {plan.weight} kg</p>
                                <p><strong>Current:</strong> {plan.currentWeight || plan.weight} kg</p>
                                <p><strong>Target:</strong> {plan.targetWeight} kg</p>
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <div className="card-icon">📈</div>
                            <h3>Progress</h3>
                            <div className="card-content">
                                <p><strong>Total Entries:</strong> {plan.progress?.length || 0}</p>
                                <p><strong>Consistency:</strong> {plan.completionPercentage || 0}%</p>
                                <p><strong>Status:</strong> Active</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="no-plan">
                        <h2>No Plan Yet</h2>
                        <p>Create your first personalized fitness plan to get started!</p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => navigate('/create-plan')}
                        >
                            Create My First Plan
                        </button>
                    </div>
                )}

                {plan && (
                    <div className="quick-actions">
                        <h3>Quick Actions</h3>
                        <div className="action-buttons">
                            <button 
                                className="btn btn-secondary"
                                onClick={() => navigate('/update-progress')}
                            >
                                📈 Update Progress
                            </button>
                            <button 
                                className="btn btn-secondary"
                                onClick={() => navigate('/my-plan')}
                            >
                                👀 View Plan
                            </button>
                            <button 
                                className="btn btn-secondary"
                                onClick={() => navigate('/create-plan')}
                            >
                                📝 Update Plan
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
