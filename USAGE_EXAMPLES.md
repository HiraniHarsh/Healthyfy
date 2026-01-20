# Healthyfy - Usage Examples & Test Cases

## 🧪 Testing the Application

### Prerequisites

- MongoDB running on localhost:27017
- Backend server running on localhost:5000
- Frontend HTML file open in browser

---

## 📝 Example 1: User Registration & Login

### Step 1: Sign Up

```
1. Open Frontend (index.html)
2. Click "Sign Up" link
3. Fill in form:
   - Name: "John Fitness"
   - Email: "john@fitness.com"
   - Phone: "+91-9876543210"
   - Password: "password123"
   - Confirm: "password123"
4. Click "Create Account"
5. ✅ Should redirect to Dashboard
```

### Step 2: Login (Next Session)

```
1. Open Frontend (index.html)
2. Login page shows (no token in localStorage)
3. Enter credentials:
   - Email: "john@fitness.com"
   - Password: "password123"
4. Click "Sign In"
5. ✅ Should show Dashboard
```

---

## 💪 Example 2: Create Fitness Plan

### Scenario: Beginner Wanting Weight Loss

```
Fill in the form:
Age: 28
Gender: Male
Height: 180 (cm)
Weight: 85 (kg)
Target Weight: 75 (kg)
Goal: "Lose Weight"
Duration: 12 (weeks)
Activity Level: "Light"
Experience: "Beginner"

Click "Generate My Plan"
```

### Backend Response (Sample)

```json
{
  "plan": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f191e810c19729de860ea",
    "age": 28,
    "gender": "male",
    "height": 180,
    "weight": 85,
    "currentWeight": 85,
    "targetWeight": 75,
    "goal": "lose",
    "weeks": 12,
    "workoutPlan": "...",
    "nutritionPlan": "...",
    "progressTracking": "...",
    "createdAt": "2026-01-19T10:30:00.000Z"
  }
}
```

### Generated Content (Sample)

**Workout Plan:**

```
Cardio & HIIT Training (Weight Loss Focus):
- Monday: 40 mins moderate cardio (walking/jogging)
- Tuesday: Circuit training (20 mins) - 3 rounds of 40 secs work, 20 secs rest
- Wednesday: Rest or light yoga/stretching
- Thursday: 45 mins moderate to high intensity cardio
- Friday: HIIT training (20-30 mins)
- Saturday: 60 mins steady-state cardio
- Sunday: Rest day
```

**Nutrition Plan:**

```
Weight Loss Nutrition Plan:
- Daily Calorie Target: 1500-1800 calories
- Protein: 170g daily (high protein for muscle preservation)
- Carbs: Complex carbs - oats, brown rice, sweet potato
- Fats: Healthy fats only - nuts, olive oil, avocado
- Hydration: 3-4 liters water daily
```

**Daily Tasks:**

```
10,000 steps daily | Drink 3-4L water | 1 cardio session |
Track all meals | 7-8 hours sleep | Avoid sugary drinks |
Weekly meal prep
```

---

## 📊 Example 3: Track Weekly Progress

### Week 1 Progress Update

```
Form Data:
Week Number: 1
Current Weight: 84.2 (kg)
Workouts Completed: 5
Progress Notes: "Feeling energetic! Completed all cardio sessions"

Click "Save Progress"
```

### API Call (Behind the scenes)

```javascript
PUT /api/fitness/update-progress
Headers: {
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Body: {
  weekNumber: 1,
  currentWeight: 84.2,
  workoutsCompleted: 5,
  progressNotes: "Feeling energetic! Completed all cardio sessions"
}
```

### Response

```json
{
  "message": "Progress updated successfully",
  "plan": {
    "_id": "507f1f77bcf86cd799439011",
    "progress": [
      {
        "weekNumber": 1,
        "currentWeight": 84.2,
        "workoutsCompleted": 5,
        "notes": "Feeling energetic!...",
        "date": "2026-01-19T14:30:00.000Z"
      }
    ],
    "completionPercentage": 8
  }
}
```

### Dashboard Update

Dashboard now shows:

- Week 1 completed
- 0.8 kg weight loss (85 → 84.2)
- 5 workouts done
- 8% plan completion

---

## 🎯 Example 4: Different Fitness Goals

### Scenario A: Muscle Gain (Intermediate)

```
Personal Details:
Age: 24
Height: 175 cm
Weight: 70 kg
Target: 80 kg

Goal: "Gain Muscle"
Duration: 16 weeks
Activity: "Very Active"
Experience: "Intermediate"

Generated Plan includes:
- Heavy strength training 5x/week
- Calorie surplus: 2500-3000/day
- High protein: 154g daily (2.2g × 70kg)
- Complex carbs for energy
```

### Scenario B: Endurance Training (Advanced)

```
Personal Details:
Age: 35
Height: 180 cm
Weight: 72 kg
Target: 70 kg (slight loss for performance)

Goal: "Build Endurance"
Duration: 12 weeks
Activity: "Very Active"
Experience: "Advanced"

Generated Plan includes:
- Aerobic training 5-6x/week
- Long slow distance + speed work
- HIGH carbs: 55-65% of calories
- Build weekly volume (max 10% increase)
```

### Scenario C: Strength Building (Advanced)

```
Personal Details:
Age: 30
Height: 178 cm
Weight: 80 kg
Target: 85 kg (strength + slight muscle)

Goal: "Build Strength"
Duration: 14 weeks
Activity: "Very Active"
Experience: "Advanced"

Generated Plan includes:
- Heavy compound lifts 5-6x/week
- Rep range: 3-5 for main lifts
- 2300-2800 calories/day
- Progressive overload focus
```

---

## 🔐 Authentication Test Cases

### Test Case 1: Valid Login

```
Input:
  Email: john@fitness.com
  Password: password123

Expected: ✅ Redirects to dashboard, token stored

Backend validates:
  1. User exists with email
  2. Password hash matches
  3. Generates JWT token
  4. Returns token + user data
```

### Test Case 2: Wrong Password

```
Input:
  Email: john@fitness.com
  Password: wrongpassword

Expected: ❌ Error message: "Invalid credentials"

Backend:
  1. User found
  2. Password comparison fails
  3. Returns 400 error
```

### Test Case 3: Non-existent Email

```
Input:
  Email: nonexistent@example.com
  Password: anypassword

Expected: ❌ Error message: "User not found"

Backend:
  1. User lookup fails
  2. Returns 400 error
```

### Test Case 4: Duplicate Registration

```
Input:
  Name: Jane Fitness
  Email: john@fitness.com (already registered)
  Password: newpassword

Expected: ❌ Error message: "Email already registered"

Backend:
  1. Checks existing users
  2. Email found
  3. Returns 400 error
```

---

## 🛡️ Protected Route Testing

### Test Case: Access Plan Without Token

```
Request: GET /api/fitness/get-plan
Headers: {} (no Authorization header)

Response: ❌ 401 Unauthorized
Body: { "error": "No token provided" }
```

### Test Case: Access Plan With Valid Token

```
Request: GET /api/fitness/get-plan
Headers: {
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response: ✅ 200 OK
Body: {
  "plan": {
    // User's plan data
  }
}
```

### Test Case: Access Plan With Expired Token

```
Request: GET /api/fitness/get-plan
Headers: {
  Authorization: "Bearer expired_token_here"
}

Response: ❌ 401 Unauthorized
Body: { "error": "Invalid token" }

Frontend Action: Redirect to login
```

---

## 💾 Database Verification

### Check User Was Created

**In MongoDB Shell:**

```javascript
use fitnessPlanner
db.users.findOne({ email: "john@fitness.com" })
```

**Expected Output:**

```javascript
{
  _id: ObjectId("..."),
  name: "John Fitness",
  email: "john@fitness.com",
  password: "$2a$10$...", // Hashed password
  phone: "+91-9876543210",
  createdAt: ISODate("2026-01-19T..."),
  updatedAt: ISODate("2026-01-19T...")
}
```

### Check Plan Was Created

```javascript
db.userplans.findOne({ email: "john@fitness.com" });
```

**Expected Output:**

```javascript
{
  _id: ObjectId("..."),
  userId: ObjectId("..."),
  age: 28,
  gender: "male",
  height: 180,
  weight: 85,
  currentWeight: 85,
  targetWeight: 75,
  goal: "lose",
  weeks: 12,
  weekNumber: 0,
  workoutPlan: "...",
  nutritionPlan: "...",
  progressTracking: "...",
  progress: [],
  completionPercentage: 0,
  createdAt: ISODate("2026-01-19T..."),
  updatedAt: ISODate("2026-01-19T...")
}
```

### Check Progress Was Logged

```javascript
db.userplans.findOne({ email: "john@fitness.com" }, { progress: 1 });
```

**Expected Output:**

```javascript
{
  _id: ObjectId("..."),
  progress: [
    {
      weekNumber: 1,
      currentWeight: 84.2,
      workoutsCompleted: 5,
      notes: "Feeling energetic!...",
      date: ISODate("2026-01-19T14:30:00.000Z")
    }
  ]
}
```

---

## 🧪 API Testing with Postman

### 1. Register New User

```
Method: POST
URL: http://localhost:5000/api/auth/register
Headers: Content-Type: application/json

Body:
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "phone": "+91-9999999999"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

### 2. Login User

```
Method: POST
URL: http://localhost:5000/api/auth/login
Headers: Content-Type: application/json

Body:
{
  "email": "test@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

### 3. Create Fitness Plan

```
Method: POST
URL: http://localhost:5000/api/fitness/create-plan
Headers:
  Content-Type: application/json
  Authorization: Bearer {token_from_login}

Body:
{
  "age": 25,
  "gender": "male",
  "height": 180,
  "weight": 75,
  "targetWeight": 70,
  "goal": "lose",
  "weeks": 12,
  "activityLevel": "moderate",
  "experience": "beginner"
}

Response:
{
  "plan": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "age": 25,
    ...
  }
}
```

### 4. Get User's Plan

```
Method: GET
URL: http://localhost:5000/api/fitness/get-plan
Headers:
  Authorization: Bearer {token}

Response:
{
  "plan": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "age": 25,
    ...
  }
}
```

### 5. Update Progress

```
Method: PUT
URL: http://localhost:5000/api/fitness/update-progress
Headers:
  Content-Type: application/json
  Authorization: Bearer {token}

Body:
{
  "weekNumber": 1,
  "currentWeight": 74.2,
  "workoutsCompleted": 5,
  "progressNotes": "Great week! Completed all workouts"
}

Response:
{
  "message": "Progress updated successfully",
  "plan": {
    ...
    "progress": [
      {
        "weekNumber": 1,
        "currentWeight": 74.2,
        "workoutsCompleted": 5,
        "notes": "Great week!...",
        "date": "2026-01-19T15:45:00.000Z"
      }
    ]
  }
}
```

---

## 🎨 Frontend Testing Checklist

- [ ] Sign up form validates required fields
- [ ] Sign up shows error for existing email
- [ ] Login shows error for wrong password
- [ ] Login redirects to dashboard
- [ ] Dashboard displays user greeting
- [ ] Create plan form validates all fields
- [ ] Plan generation displays workout + nutrition
- [ ] Progress form accepts weekly updates
- [ ] Progress shows in dashboard
- [ ] Logout clears localStorage
- [ ] Mobile responsive (< 480px)
- [ ] Tablet responsive (480-768px)
- [ ] Desktop responsive (> 768px)
- [ ] Error messages display correctly
- [ ] Navigation works smoothly

---

## 📈 Performance Testing

### Frontend Metrics

```
Page Load Time: < 1 second
Time to Interactive: < 2 seconds
Largest Contentful Paint: < 1.5 seconds
Cumulative Layout Shift: < 0.1
```

### API Response Times

```
Login: < 500ms
Create Plan: < 1000ms
Get Plan: < 300ms
Update Progress: < 500ms
```

---

## 🚀 Stress Testing

### Scenario: 100 Concurrent Users

```
Expected Behavior:
- All requests process successfully
- No timeouts
- Consistent response times
- Database handles load

Current Setup: Single server (suitable for 1000+ DAU)
```

---

**All tests should PASS ✅ for production deployment!**
