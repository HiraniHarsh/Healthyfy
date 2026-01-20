import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/forms.css';

const CreatePlanPage = () => {
    const navigate = useNavigate();
    const { user, apiCall } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        height: '',
        weight: '',
        goal: 'weight-loss',
        duration: '12',
        activity: 'moderate',
        experience: 'beginner'
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
        setLoading(true);

        try {
            const response = await apiCall('/fitness/create-plan', 'POST', formData);
            
            if (response.success) {
                alert('Plan created successfully!');
                navigate('/dashboard');
            } else {
                setError(response.message || 'Failed to create plan');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating plan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-plan-container">
            <div className="form-card">
                <h1>Create Your Fitness Plan</h1>
                <p className="subtitle">Tell us about yourself to generate a personalized plan</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="create-plan-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                min="15"
                                max="100"
                                value={formData.age}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your age"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="height">Height (cm)</label>
                            <input
                                type="number"
                                id="height"
                                name="height"
                                min="100"
                                max="250"
                                value={formData.height}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter height in cm"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="weight">Weight (kg)</label>
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
                                placeholder="Enter weight in kg"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="goal">Fitness Goal</label>
                            <select
                                id="goal"
                                name="goal"
                                value={formData.goal}
                                onChange={handleInputChange}
                            >
                                <option value="weight-loss">Weight Loss</option>
                                <option value="muscle-gain">Muscle Gain</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="strength">Strength Training</option>
                                <option value="endurance">Endurance</option>
                                <option value="flexibility">Flexibility</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="duration">Plan Duration (weeks)</label>
                            <select
                                id="duration"
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                            >
                                <option value="4">4 weeks</option>
                                <option value="8">8 weeks</option>
                                <option value="12">12 weeks</option>
                                <option value="16">16 weeks</option>
                                <option value="24">24 weeks</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="activity">Activity Level</label>
                            <select
                                id="activity"
                                name="activity"
                                value={formData.activity}
                                onChange={handleInputChange}
                            >
                                <option value="sedentary">Sedentary</option>
                                <option value="light">Light</option>
                                <option value="moderate">Moderate</option>
                                <option value="high">High</option>
                                <option value="very-high">Very High</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="experience">Experience Level</label>
                            <select
                                id="experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary submit-btn">
                        {loading ? 'Creating Plan...' : 'Create My Plan'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePlanPage;
