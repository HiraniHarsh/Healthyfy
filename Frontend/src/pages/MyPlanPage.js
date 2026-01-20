import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/plan.css';

const MyPlanPage = () => {
    const navigate = useNavigate();
    const { user, apiCall } = useAuth();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPlan();
    }, []);

    const fetchPlan = async () => {
        try {
            const response = await apiCall('/fitness/get-plan', 'GET');
            if (response.plan) {
                setPlan(response.plan);
            } else {
                setError('No plan found');
            }
        } catch (err) {
            setError('Failed to load plan');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="plan-container loading">Loading your plan...</div>;
    }

    if (error || !plan) {
        return (
            <div className="plan-container">
                <div className="no-plan-section">
                    <h2>No Plan Created Yet</h2>
                    <p>{error || 'You haven\'t created a fitness plan yet.'}</p>
                    <button className="btn btn-primary" onClick={() => navigate('/create-plan')}>
                        Create Your Plan Now
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="plan-container">
            <div className="plan-header">
                <h1>Your Fitness Plan</h1>
                <p>Created on: {new Date(plan.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="plan-grid">
                {/* Personal Info Section */}
                <div className="plan-card">
                    <h2>📋 Your Profile</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="label">Age:</span>
                            <span className="value">{plan.age} years</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Gender:</span>
                            <span className="value">{plan.gender}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Height:</span>
                            <span className="value">{plan.height} cm</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Weight:</span>
                            <span className="value">{plan.weight} kg</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Goal:</span>
                            <span className="value">{plan.goal}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Duration:</span>
                            <span className="value">{plan.duration} weeks</span>
                        </div>
                    </div>
                </div>

                {/* Workout Plan Section */}
                {plan.workoutPlan && (
                    <div className="plan-card">
                        <h2>💪 Workout Plan</h2>
                        <div className="plan-content">
                            {typeof plan.workoutPlan === 'string' ? (
                                <p>{plan.workoutPlan}</p>
                            ) : (
                                <div>
                                    {plan.workoutPlan.days && plan.workoutPlan.days.length > 0 && (
                                        <div className="days-list">
                                            {plan.workoutPlan.days.map((day, idx) => (
                                                <div key={idx} className="day-card">
                                                    <h4>{day.name || `Day ${idx + 1}`}</h4>
                                                    <p>{day.exercises || day}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Nutrition Plan Section */}
                {plan.nutritionPlan && (
                    <div className="plan-card">
                        <h2>🥗 Nutrition Plan</h2>
                        <div className="plan-content">
                            {typeof plan.nutritionPlan === 'string' ? (
                                <p>{plan.nutritionPlan}</p>
                            ) : (
                                <div>
                                    {plan.nutritionPlan.meals && plan.nutritionPlan.meals.length > 0 && (
                                        <div className="meals-list">
                                            {plan.nutritionPlan.meals.map((meal, idx) => (
                                                <div key={idx} className="meal-card">
                                                    <h4>{meal.name || `Meal ${idx + 1}`}</h4>
                                                    <p>{meal.description || meal}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {plan.nutritionPlan.dailyCalories && (
                                        <p className="calories-info">
                                            Daily Calories: <strong>{plan.nutritionPlan.dailyCalories}</strong>
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Progress Tracking Section */}
                {plan.progress && plan.progress.length > 0 && (
                    <div className="plan-card">
                        <h2>📈 Progress Tracking</h2>
                        <div className="progress-list">
                            {plan.progress.map((entry, idx) => (
                                <div key={idx} className="progress-item">
                                    <span className="week">Week {entry.week}</span>
                                    <span className="weight">Weight: {entry.weight} kg</span>
                                    <span className="workouts">Workouts: {entry.workoutsCompleted}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="plan-actions">
                <button className="btn btn-primary" onClick={() => navigate('/update-progress')}>
                    Update Progress
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/create-plan')}>
                    Create New Plan
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default MyPlanPage;
