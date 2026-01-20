import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import CreatePlanPage from './pages/CreatePlanPage';
import MyPlanPage from './pages/MyPlanPage';
import UpdateProgressPage from './pages/UpdateProgressPage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/create-plan"
                        element={
                            <ProtectedRoute>
                                <CreatePlanPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-plan"
                        element={
                            <ProtectedRoute>
                                <MyPlanPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/update-progress"
                        element={
                            <ProtectedRoute>
                                <UpdateProgressPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Catch all - redirect to home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
