import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const LandingPage = () => {
    return (
        <div className="landing">
            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-container">
                    <div className="logo">Healthyfy 💪</div>
                    <ul className="nav-menu">
                        <li><a href="#features">Features</a></li>
                        <li><a href="#goals">Goals</a></li>
                        <li><a href="#how-it-works">How It Works</a></li>
                        <li><Link to="/login" className="nav-btn">Sign In</Link></li>
                        <li><Link to="/signup" className="nav-btn primary">Get Started</Link></li>
                    </ul>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Your Personal Fitness Coach 🏋️</h1>
                    <p>Get personalized workout and nutrition plans tailored to YOUR goals</p>
                    <div className="hero-buttons">
                        <Link to="/signup" className="btn btn-primary">Start Free Now</Link>
                        <a href="#features" className="btn btn-secondary">Learn More</a>
                    </div>
                    <div className="hero-stats">
                        <div className="stat">
                            <h3>5</h3>
                            <p>Fitness Goals</p>
                        </div>
                        <div className="stat">
                            <h3>∞</h3>
                            <p>Personalized Plans</p>
                        </div>
                        <div className="stat">
                            <h3>100%</h3>
                            <p>Free Access</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <div className="container">
                    <h2 className="section-title">Why Choose Healthyfy?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3>Personalized Plans</h3>
                            <p>AI-generated workout and diet plans based on YOUR goals and body metrics</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Progress Tracking</h3>
                            <p>Monitor your weekly progress with detailed metrics and statistics</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🥗</div>
                            <h3>Nutrition Plans</h3>
                            <p>Customized meal plans and nutrition advice for optimal results</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💪</div>
                            <h3>Workout Plans</h3>
                            <p>Structured workout routines tailored to your experience level</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📈</div>
                            <h3>Analytics</h3>
                            <p>Track weight, measurements, and fitness improvements over time</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>Secure & Private</h3>
                            <p>Your data is encrypted and secure. Only you can see your plans</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Goals Section */}
            <section id="goals" className="goals">
                <div className="container">
                    <h2 className="section-title">5 Fitness Goals</h2>
                    <div className="goals-grid">
                        <div className="goal-card">
                            <div className="goal-icon">💨</div>
                            <h3>Weight Loss</h3>
                            <p>Lose 0.5-1kg per week with Cardio & HIIT training</p>
                            <ul>
                                <li>Calorie deficit diet</li>
                                <li>High protein meals</li>
                                <li>Cardio workouts</li>
                                <li>HIIT sessions</li>
                            </ul>
                        </div>
                        <div className="goal-card">
                            <div className="goal-icon">💪</div>
                            <h3>Muscle Gain</h3>
                            <p>Gain 0.5-1kg per week with heavy strength training</p>
                            <ul>
                                <li>Calorie surplus diet</li>
                                <li>High protein intake</li>
                                <li>Heavy compound lifts</li>
                                <li>Progressive overload</li>
                            </ul>
                        </div>
                        <div className="goal-card">
                            <div className="goal-icon">⚖️</div>
                            <h3>Weight Maintenance</h3>
                            <p>Keep your weight stable with balanced training</p>
                            <ul>
                                <li>Maintenance calories</li>
                                <li>Balanced macros</li>
                                <li>Mixed training</li>
                                <li>Consistent routine</li>
                            </ul>
                        </div>
                        <div className="goal-card">
                            <div className="goal-icon">🏋️</div>
                            <h3>Strength Building</h3>
                            <p>5-10% strength increase per month with power focus</p>
                            <ul>
                                <li>Heavy compounds</li>
                                <li>Low rep range</li>
                                <li>Progressive lifting</li>
                                <li>Proper recovery</li>
                            </ul>
                        </div>
                        <div className="goal-card">
                            <div className="goal-icon">🏃</div>
                            <h3>Endurance Training</h3>
                            <p>Improve stamina for running, cycling, and sports</p>
                            <ul>
                                <li>Aerobic training</li>
                                <li>Speed work</li>
                                <li>Long distances</li>
                                <li>High carbs</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="how-it-works">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <div className="steps">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h3>Sign Up</h3>
                            <p>Create your free account in seconds</p>
                        </div>
                        <div className="arrow">→</div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <h3>Answer Questions</h3>
                            <p>Tell us about yourself and your goals</p>
                        </div>
                        <div className="arrow">→</div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <h3>Get Your Plan</h3>
                            <p>Receive personalized workout & nutrition plan</p>
                        </div>
                        <div className="arrow">→</div>
                        <div className="step">
                            <div className="step-number">4</div>
                            <h3>Track Progress</h3>
                            <p>Log weekly updates and watch yourself improve</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="cta-content">
                    <h2>Ready to Transform Your Body? 💪</h2>
                    <p>Join thousands of people achieving their fitness goals</p>
                    <Link to="/signup" className="btn btn-primary btn-large">Get Started Free</Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>Healthyfy</h4>
                        <p>Your personal fitness coach</p>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#goals">Goals</a></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Contact</h4>
                        <p>support@healthyfy.com</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Healthyfy. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
