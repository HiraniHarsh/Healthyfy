import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/forms.css';

const UpdateProgressPage = () => {
    const navigate = useNavigate();
    const { apiCall } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        week: '',
        weight: '',
        workoutsCompleted: '',
        notes: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate
        if (!formData.week || !formData.weight || formData.workoutsCompleted === '') {
            setError('Week, Weight, and Workouts Completed are required');
            return;
        }

        setLoading(true);

        try {
            const response = await apiCall('/fitness/update-progress', 'POST', {
                week: parseInt(formData.week),
                weight: parseFloat(formData.weight),
                workoutsCompleted: parseInt(formData.workoutsCompleted),
                notes: formData.notes
            });

            if (response.success) {
                setSuccess('Progress updated successfully!');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);
                // Reset form
                setFormData({
                    week: '',
                    weight: '',
                    workoutsCompleted: '',
                    notes: ''
                });
            } else {
                setError(response.message || 'Failed to update progress');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating progress');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="update-progress-container">
            <div className="form-card">
                <h1>Update Your Progress</h1>
                <p className="subtitle">Track your weekly progress towards your fitness goal</p>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <form onSubmit={handleSubmit} className="progress-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="week">Week Number *</label>
                            <input
                                type="number"
                                id="week"
                                name="week"
                                min="1"
                                max="52"
                                value={formData.week}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter week number (1-52)"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="weight">Current Weight (kg) *</label>
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                min="20"
                                max="300"
                                step="0.1"
                                value={formData.weight}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your current weight"
                            />
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="workoutsCompleted">Workouts Completed This Week *</label>
                        <input
                            type="number"
                            id="workoutsCompleted"
                            name="workoutsCompleted"
                            min="0"
                            max="7"
                            value={formData.workoutsCompleted}
                            onChange={handleInputChange}
                            required
                            placeholder="How many workouts did you complete? (0-7)"
                        />
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="notes">Weekly Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            rows="4"
                            value={formData.notes}
                            onChange={handleInputChange}
                            placeholder="Add any notes about this week's progress, challenges, or achievements..."
                            className="textarea-field"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" disabled={loading} className="btn btn-primary">
                            {loading ? 'Updating...' : 'Update Progress'}
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={() => navigate('/dashboard')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProgressPage;
