// ===== AUTHENTICATION ====

const API_BASE_URL = 'http://localhost:5000/api';
let currentUser = null;
let currentToken = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
});

// Check if user is authenticated
function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        currentToken = token;
        currentUser = JSON.parse(user);
        showApp();
        loadDashboard();
    } else {
        showLoginPage();
    }
}

// Show login page
function showLoginPage() {
    document.getElementById('login-page').style.display = 'flex';
    document.getElementById('signup-page').style.display = 'none';
    document.getElementById('app').style.display = 'none';
}

// Show signup page
function switchToSignup(event) {
    event.preventDefault();
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('signup-page').style.display = 'flex';
    document.getElementById('app').style.display = 'none';
}

// Show login page from signup
function switchToLogin(event) {
    event.preventDefault();
    document.getElementById('login-page').style.display = 'flex';
    document.getElementById('signup-page').style.display = 'none';
    document.getElementById('app').style.display = 'none';
}

// Handle login
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    
    errorDiv.classList.remove('show');
    errorDiv.innerText = '';
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
        
        // Store token and user
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        currentToken = data.token;
        currentUser = data.user;
        
        showApp();
        loadDashboard();
        
        // Clear form
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
        
    } catch (error) {
        errorDiv.innerText = error.message;
        errorDiv.classList.add('show');
    }
}

// Handle signup
async function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;
    const errorDiv = document.getElementById('signup-error');
    
    errorDiv.classList.remove('show');
    errorDiv.innerText = '';
    
    // Validate
    if (password !== confirmPassword) {
        errorDiv.innerText = 'Passwords do not match';
        errorDiv.classList.add('show');
        return;
    }
    
    if (password.length < 6) {
        errorDiv.innerText = 'Password must be at least 6 characters';
        errorDiv.classList.add('show');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Signup failed');
        }
        
        // Store token and user
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        currentToken = data.token;
        currentUser = data.user;
        
        showApp();
        loadDashboard();
        
        // Clear form
        document.getElementById('signup-name').value = '';
        document.getElementById('signup-email').value = '';
        document.getElementById('signup-phone').value = '';
        document.getElementById('signup-password').value = '';
        document.getElementById('signup-confirm').value = '';
        
    } catch (error) {
        errorDiv.innerText = error.message;
        errorDiv.classList.add('show');
    }
}

// Show app
function showApp() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('signup-page').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    updateUserGreeting();
}

// Update user greeting
function updateUserGreeting() {
    if (currentUser) {
        document.getElementById('user-greeting').innerText = `Welcome back, ${currentUser.name}! 😊`;
    }
}

// Logout
function logout(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentToken = null;
    currentUser = null;
    showLoginPage();
}

// ===== SECTIONS MANAGEMENT =====

function showSection(sectionId, event) {
    if (event) event.preventDefault();
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active-section');
    });
    
    // Show specific section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active-section');
    }
}

// ===== DASHBOARD =====

async function loadDashboard() {
    showSection('dashboard');
    await loadUserPlan();
}

async function loadUserPlan() {
    try {
        const response = await fetch(`${API_BASE_URL}/fitness/get-plan`, {
            headers: { 'Authorization': `Bearer ${currentToken}` }
        });
        
        const data = await response.json();
        
        if (response.ok && data.plan) {
            const plan = data.plan;
            displayDashboardStats(plan);
        }
    } catch (error) {
        console.error('Error loading plan:', error);
    }
}

function displayDashboardStats(plan) {
    const statsDiv = document.getElementById('dashboard-stats');
    const planDiv = document.getElementById('dashboard-plan');
    
    // Calculate progress
    const progressPercent = Math.round((plan.weekNumber || 0) / (plan.weeks || 1) * 100);
    
    statsDiv.innerHTML = `
        <div class="progress-stat">
            <label>Weeks Completed:</label>
            <span>${plan.weekNumber || 0}/${plan.weeks}</span>
        </div>
        <div class="progress-stat">
            <label>Progress:</label>
            <span>${progressPercent}%</span>
        </div>
        <div class="progress-stat">
            <label>Weight Change:</label>
            <span class="${plan.currentWeight < plan.weight ? 'loss' : 'gain'}">
                ${(plan.weight - (plan.currentWeight || plan.weight)).toFixed(1)} kg
            </span>
        </div>
    `;
    
    planDiv.innerHTML = `
        <div class="progress-stat">
            <label>Goal:</label>
            <span>${getGoalName(plan.goal)}</span>
        </div>
        <div class="progress-stat">
            <label>Target Weight:</label>
            <span>${plan.targetWeight} kg</span>
        </div>
        <div class="progress-stat">
            <label>Current Weight:</label>
            <span>${plan.currentWeight || plan.weight} kg</span>
        </div>
    `;
}

function getGoalName(goal) {
    const goals = {
        'lose': '💨 Lose Weight',
        'gain': '💪 Gain Muscle',
        'maintain': '⚖️ Maintain Weight',
        'strength': '🏋️ Build Strength',
        'endurance': '🏃 Build Endurance'
    };
    return goals[goal] || goal;
}

// ===== PLAN FORM =====

async function submitPlanForm() {
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const targetWeight = document.getElementById('targetWeight').value;
    const goal = document.getElementById('goal').value;
    const weeks = document.getElementById('weeks').value;
    const activityLevel = document.getElementById('activityLevel').value;
    const experience = document.getElementById('experience').value;
    const errorDiv = document.getElementById('plan-form-error');
    
    errorDiv.classList.remove('show');
    errorDiv.innerText = '';
    
    // Validate
    if (!age || !gender || !height || !weight || !targetWeight || !goal || !weeks || !activityLevel || !experience) {
        errorDiv.innerText = 'Please fill in all fields';
        errorDiv.classList.add('show');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/fitness/create-plan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentToken}`
            },
            body: JSON.stringify({
                age: parseInt(age),
                gender,
                height: parseInt(height),
                weight: parseFloat(weight),
                targetWeight: parseFloat(targetWeight),
                goal,
                weeks: parseInt(weeks),
                activityLevel,
                experience
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to create plan');
        }
        
        // Display plan
        displayPlan(data.plan);
        showSection('plan-view');
        loadDashboard();
        
    } catch (error) {
        errorDiv.innerText = error.message;
        errorDiv.classList.add('show');
    }
}

function displayPlan(plan) {
    const planDisplay = document.getElementById('plan-display');
    
    let html = `<div class="plan-content">`;
    
    // Basic Info
    html += `
        <div class="plan-section">
            <h4>📋 Your Profile</h4>
            <p><strong>Age:</strong> ${plan.age} years</p>
            <p><strong>Height:</strong> ${plan.height} cm</p>
            <p><strong>Current Weight:</strong> ${plan.weight} kg</p>
            <p><strong>Target Weight:</strong> ${plan.targetWeight} kg</p>
            <p><strong>Experience Level:</strong> ${plan.experience}</p>
        </div>
    `;
    
    // Goal
    html += `
        <div class="plan-section">
            <h4>🎯 Your Goal</h4>
            <p><strong>Primary Goal:</strong> ${getGoalName(plan.goal)}</p>
            <p><strong>Duration:</strong> ${plan.weeks} weeks</p>
            <p><strong>Activity Level:</strong> ${plan.activityLevel}</p>
        </div>
    `;
    
    // Workout Plan
    if (plan.workoutPlan) {
        html += `
            <div class="plan-section">
                <h4>💪 Workout Plan</h4>
                ${plan.workoutPlan.split('\n').map(line => {
                    if (line.trim().startsWith('**')) {
                        return `<strong>${line.replace(/\*\*/g, '')}</strong>`;
                    }
                    return `<p>${line}</p>`;
                }).join('')}
            </div>
        `;
    }
    
    // Nutrition Plan
    if (plan.nutritionPlan) {
        html += `
            <div class="plan-section">
                <h4>🥗 Nutrition Plan</h4>
                ${plan.nutritionPlan.split('\n').map(line => {
                    if (line.trim().startsWith('**')) {
                        return `<strong>${line.replace(/\*\*/g, '')}</strong>`;
                    }
                    return `<p>${line}</p>`;
                }).join('')}
            </div>
        `;
    }
    
    // Progress Tracking
    if (plan.progressTracking) {
        html += `
            <div class="plan-section">
                <h4>📊 Progress Tracking</h4>
                ${plan.progressTracking.split('\n').map(line => {
                    if (line.trim().startsWith('**')) {
                        return `<strong>${line.replace(/\*\*/g, '')}</strong>`;
                    }
                    return `<p>${line}</p>`;
                }).join('')}
            </div>
        `;
    }
    
    html += `</div>`;
    planDisplay.innerHTML = html;
}

// Load plan view
async function loadPlanView() {
    try {
        const response = await fetch(`${API_BASE_URL}/fitness/get-plan`, {
            headers: { 'Authorization': `Bearer ${currentToken}` }
        });
        
        const data = await response.json();
        
        if (response.ok && data.plan) {
            displayPlan(data.plan);
        } else {
            document.getElementById('plan-display').innerHTML = `
                <p>No plan created yet. <a href="#" onclick="showSection('plan-form', event)">Create one now!</a></p>
            `;
        }
    } catch (error) {
        console.error('Error loading plan:', error);
    }
}

// Show plan view section
document.addEventListener('DOMContentLoaded', () => {
    const originalShowSection = window.showSection;
    window.showSection = function(sectionId, event) {
        originalShowSection(sectionId, event);
        if (sectionId === 'plan-view') {
            loadPlanView();
        }
    };
});

// ===== PROGRESS UPDATE =====

function showUpdateProgress(event) {
    event.preventDefault();
    showSection('progress-section');
}

async function submitProgress() {
    const weekNumber = document.getElementById('weekNumber').value;
    const currentWeight = document.getElementById('currentWeightUpdate').value;
    const workoutsCompleted = document.getElementById('workoutsCompleted').value;
    const progressNotes = document.getElementById('progressNotes').value;
    const errorDiv = document.getElementById('progress-error');
    
    errorDiv.classList.remove('show');
    errorDiv.innerText = '';
    
    // Validate
    if (!weekNumber || !currentWeight || workoutsCompleted === '') {
        errorDiv.innerText = 'Please fill in required fields';
        errorDiv.classList.add('show');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/fitness/update-progress`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentToken}`
            },
            body: JSON.stringify({
                weekNumber: parseInt(weekNumber),
                currentWeight: parseFloat(currentWeight),
                workoutsCompleted: parseInt(workoutsCompleted),
                progressNotes
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to update progress');
        }
        
        // Show success and reload dashboard
        alert('Progress updated successfully! 🎉');
        document.getElementById('weekNumber').value = '';
        document.getElementById('currentWeightUpdate').value = '';
        document.getElementById('workoutsCompleted').value = '';
        document.getElementById('progressNotes').value = '';
        
        loadDashboard();
        
    } catch (error) {
        errorDiv.innerText = error.message;
        errorDiv.classList.add('show');
    }
}

// Utility function for user menu (placeholder)
function showUserMenu(event) {
    event.preventDefault();
    alert(`Welcome ${currentUser.name}!\nEmail: ${currentUser.email}`);
}
