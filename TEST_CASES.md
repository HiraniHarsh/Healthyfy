# Healthyfy - Test Cases & Examples

## 🧪 Testing Guide

### Prerequisites

- Backend running on http://localhost:5000
- MongoDB connected
- Frontend accessible

---

## 📝 Test Case Examples

### Test Case 1: Weight Loss User

**Scenario**: Young male wants to lose weight

**Input Data**:

```json
{
  "name": "Alex Kumar",
  "email": "alex.kumar@email.com",
  "age": 28,
  "gender": "male",
  "height": 185,
  "weight": 95,
  "targetWeight": 85,
  "goal": "lose",
  "weeks": 12,
  "activityLevel": "moderate",
  "experience": "intermediate"
}
```

**Expected Output**:

- Calorie target: ~1700 calories/day (500 calorie deficit)
- Protein: 190g/day (95 \* 2)
- Workout plan: Cardio-focused with HIIT
- Tasks: 10k steps, 3-4L water, track meals
- Weekly target: ~0.8kg loss per week

**Progress Update (Week 1)**:

```json
{
  "weekNumber": 1,
  "currentWeight": 93.5,
  "workoutsCompleted": 5,
  "notes": "First week done! Enjoying the cardio workouts"
}
```

**Expected Progress**:

- Weight loss: 1.5kg
- Workouts: 71% completion (5/7)
- Completion %: 8% (1/12 weeks)

---

### Test Case 2: Muscle Gain User

**Scenario**: Intermediate lifter wants to build muscle

**Input Data**:

```json
{
  "name": "Priya Singh",
  "email": "priya.singh@email.com",
  "age": 24,
  "gender": "female",
  "height": 165,
  "weight": 60,
  "targetWeight": 68,
  "goal": "gain",
  "weeks": 16,
  "activityLevel": "active",
  "experience": "intermediate"
}
```

**Expected Output**:

- Calorie target: ~2200 calories/day (500 calorie surplus)
- Protein: 132g/day (60 \* 2.2)
- Workout: Strength training 5x/week with compound lifts
- Tasks: Track protein, progressive overload, 8-9 hrs sleep
- Weekly target: ~0.5kg gain per week

**Progress Update (Week 4)**:

```json
{
  "weekNumber": 4,
  "currentWeight": 62,
  "workoutsCompleted": 6,
  "notes": "Already seeing strength gains! Bench press up 10kg"
}
```

**Expected Progress**:

- Weight gain: 2kg
- Workouts: 86% completion
- Completion %: 25% (4/16 weeks)

---

### Test Case 3: Maintenance User

**Scenario**: Keeping current fitness level

**Input Data**:

```json
{
  "name": "Rajesh Patel",
  "email": "rajesh.patel@email.com",
  "age": 35,
  "gender": "male",
  "height": 175,
  "weight": 80,
  "targetWeight": 80,
  "goal": "maintain",
  "weeks": 12,
  "activityLevel": "light",
  "experience": "beginner"
}
```

**Expected Output**:

- Calorie target: ~2000 calories/day (maintenance)
- Protein: 128g/day (80 \* 1.6)
- Workout: Balanced 4-5x/week
- Tasks: 4-5 workouts/week, 2-3L water
- Weekly target: 0kg change (maintain)

---

### Test Case 4: Strength Focus User

**Scenario**: Advanced lifter building maximum strength

**Input Data**:

```json
{
  "name": "Vikram Sharma",
  "email": "vikram.sharma@email.com",
  "age": 32,
  "gender": "male",
  "height": 188,
  "weight": 100,
  "targetWeight": 102,
  "goal": "strength",
  "weeks": 12,
  "activityLevel": "active",
  "experience": "advanced"
}
```

**Expected Output**:

- Calorie target: ~2400 calories/day (slight surplus)
- Protein: 220g/day (100 \* 2.2)
- Workout: Heavy compound lifts 5x/week
- Tasks: Track 1RM, progressive overload, proper form
- Weekly target: ~0.2kg gain per week

---

### Test Case 5: Endurance Athlete

**Scenario**: Training for marathon/long-distance event

**Input Data**:

```json
{
  "name": "Sarah Johnson",
  "email": "sarah.johnson@email.com",
  "age": 26,
  "gender": "female",
  "height": 168,
  "weight": 58,
  "targetWeight": 57,
  "goal": "endurance",
  "weeks": 16,
  "activityLevel": "active",
  "experience": "advanced"
}
```

**Expected Output**:

- Calorie target: ~2300 calories/day (based on high volume)
- Carbs: HIGH (55-65% of calories)
- Protein: 93g/day (58 \* 1.6)
- Workout: Long slow distance + speed work
- Weekly volume increases

---

## ✅ Validation Test Cases

### Valid Input Tests

**Test 1: Minimum Valid Input**

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "age": 20,
  "gender": "male",
  "height": 170,
  "weight": 70,
  "targetWeight": 70,
  "goal": "maintain",
  "weeks": 8,
  "activityLevel": "moderate",
  "experience": "beginner"
}
```

✅ Expected: Success (201 Created)

**Test 2: Maximum Values**

```json
{
  "name": "Large User",
  "email": "large@example.com",
  "age": 80,
  "gender": "other",
  "height": 250,
  "weight": 300,
  "targetWeight": 250,
  "goal": "lose",
  "weeks": 52,
  "activityLevel": "sedentary",
  "experience": "advanced"
}
```

✅ Expected: Success (201 Created)

### Invalid Input Tests

**Test 3: Missing Name**

```json
{
    "email": "test@example.com",
    "age": 25,
    ...
}
```

❌ Expected Error: "All fields are required"

**Test 4: Invalid Email**

```json
{
    "name": "Test",
    "email": "invalidemail",
    ...
}
```

❌ Expected Error: "Invalid email address"

**Test 5: Duplicate Email**

- Create a user with email: test@example.com
- Try to create another with same email
  ❌ Expected Error: "User with this email already exists"

**Test 6: Invalid Height**

```json
{
    ...
    "height": 50
}
```

❌ Expected Error: "Please enter realistic height (100-250cm)"

**Test 7: Invalid Weight**

```json
{
    ...
    "weight": 20
}
```

❌ Expected Error: "Please enter realistic weight (30-300kg)"

**Test 8: Invalid Goal**

```json
{
    ...
    "goal": "invalid_goal"
}
```

❌ Expected Error: "All fields are required"

---

## 📊 Progress Tracking Tests

### Test Case 6: Update Progress

**Create Plan First**:

```json
{
  "name": "Progress Tester",
  "email": "progress@test.com",
  "age": 30,
  "gender": "male",
  "height": 180,
  "weight": 90,
  "targetWeight": 80,
  "goal": "lose",
  "weeks": 10,
  "activityLevel": "moderate",
  "experience": "intermediate"
}
```

✅ Save the returned `_id`

**Update Week 1**:

```
PUT /api/fitness/update-progress/{userId}
Body: {
    "weekNumber": 1,
    "currentWeight": 88,
    "workoutsCompleted": 5,
    "notes": "Great start!"
}
```

✅ Expected: Progress recorded, completionPercentage = 10%

**Update Week 1 Again** (should update, not create duplicate):

```
PUT /api/fitness/update-progress/{userId}
Body: {
    "weekNumber": 1,
    "currentWeight": 87.5,
    "workoutsCompleted": 6,
    "notes": "Updated week 1"
}
```

✅ Expected: Week 1 updated with new values, no duplicate

**Update Week 2**:

```
PUT /api/fitness/update-progress/{userId}
Body: {
    "weekNumber": 2,
    "currentWeight": 86,
    "workoutsCompleted": 7,
    "notes": "Perfect week!"
}
```

✅ Expected: New week added, completionPercentage = 20%

---

## 🔍 Get Progress Tests

### Test Case 7: Retrieve Progress Data

**Get Progress for User**:

```
GET /api/fitness/get-progress/{userId}
```

**Expected Response**:

```json
{
  "name": "Progress Tester",
  "email": "progress@test.com",
  "weight": 90,
  "targetWeight": 80,
  "goal": "lose",
  "weeks": 10,
  "completionPercentage": 20,
  "progress": [
    {
      "weekNumber": 1,
      "currentWeight": 87.5,
      "workoutsCompleted": 6,
      "notes": "Updated week 1",
      "date": "2026-01-19T10:35:00.000Z"
    },
    {
      "weekNumber": 2,
      "currentWeight": 86,
      "workoutsCompleted": 7,
      "notes": "Perfect week!",
      "date": "2026-01-19T11:00:00.000Z"
    }
  ]
}
```

✅ Expected: All progress records returned in order

---

## 📈 Analytics Tests

### Test Case 8: Get Analytics

**Create Multiple Plans**:

- 3 weight loss users
- 2 muscle gain users
- 1 maintenance user

**Get Analytics**:

```
GET /api/fitness/analytics
```

**Expected Response**:

```json
{
  "totalUsers": 6,
  "goalBreakdown": [
    { "_id": "lose", "count": 3 },
    { "_id": "gain", "count": 2 },
    { "_id": "maintain", "count": 1 }
  ],
  "experienceBreakdown": [
    { "_id": "beginner", "count": 2 },
    { "_id": "intermediate", "count": 3 },
    { "_id": "advanced", "count": 1 }
  ],
  "averageCompletion": 10.5
}
```

✅ Expected: Correct aggregations

---

## 🧮 Calculation Tests

### Test Case 9: Calorie Calculation Verification

**Input**:

```json
{
  "age": 30,
  "gender": "male",
  "height": 180,
  "weight": 80,
  "activityLevel": "moderate",
  "goal": "lose"
}
```

**BMR Calculation** (Harris-Benedict):

- BMR = 88.362 + (13.397 × 80) + (4.799 × 180) - (5.677 × 30)
- BMR = 88.362 + 1071.76 + 863.82 - 170.31 = 1853.63

**TDEE Calculation**:

- TDEE = BMR × Activity (1.55 for moderate)
- TDEE = 1853.63 × 1.55 = 2873.13

**For Weight Loss**:

- Expected: 2873.13 - 500 = **2373 calories/day**

✅ Verify this appears in generated plan

---

## 🔐 Error Handling Tests

### Test Case 10: Error Scenarios

**Scenario 1: Invalid MongoDB ID**

```
GET /api/fitness/get-progress/invalid-id
```

❌ Expected: Error (400 or 500)

**Scenario 2: Non-existent User**

```
GET /api/fitness/get-progress/507f1f77bcf86cd799439999
```

❌ Expected Error: "Plan not found"

**Scenario 3: Update Non-existent User**

```
PUT /api/fitness/update-progress/507f1f77bcf86cd799439999
Body: {...}
```

❌ Expected Error: "Plan not found"

**Scenario 4: Missing Progress Fields**

```
PUT /api/fitness/update-progress/{userId}
Body: {
    "weekNumber": 1,
    "currentWeight": 85
    // Missing workoutsCompleted
}
```

❌ Expected Error: "Missing required fields"

---

## 🧪 Performance Tests

### Test Case 11: Large Data Load

**Create 100+ Plans**:

- Bulk insert plans
- Test GET /api/fitness/all-plans pagination
- Verify sorting

**Expected**:

- ✅ Plans return paginated (10 per page)
- ✅ Total count correct
- ✅ Sorting by creation date

---

## 📱 Frontend UI Tests

### Test Case 12: Form Validation UI

1. **Submit empty form**
   ❌ Expected: All fields required alert

2. **Enter invalid email**
   ❌ Expected: Email validation error

3. **Enter height < 100**
   ❌ Expected: Height range error

4. **Fill form correctly**
   ✅ Expected: Plan generated successfully

### Test Case 13: Navigation

1. **Click "Home"** → Scroll to top
2. **Click "Dashboard"** → Scroll to dashboard
3. **Click "Features"** → Scroll to features section
4. **Click "Contact"** → Scroll to contact section

### Test Case 14: Responsive Design

1. **Desktop (1920px)** - All elements visible
2. **Tablet (768px)** - Proper grid layout
3. **Mobile (375px)** - Single column layout, readable text

---

## ✅ Checklist for Complete Testing

- [ ] All 5 goal types generate correct plans
- [ ] Calorie calculations are accurate
- [ ] Progress updates work correctly
- [ ] Dashboard displays accurate data
- [ ] API returns proper error messages
- [ ] Validation prevents invalid data
- [ ] Database stores all information
- [ ] Progress history is maintained
- [ ] Analytics aggregations are correct
- [ ] Frontend UI is responsive
- [ ] Form validation works
- [ ] Navigation functions correctly
- [ ] Animations are smooth
- [ ] Error handling is graceful
- [ ] Data persists after page refresh

---

## 🚀 Test Execution Example

```bash
# Start backend
cd Backend
npm start

# In another terminal, use curl to test
curl -X POST http://localhost:5000/api/fitness/create-plan \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "age": 25,
    "gender": "male",
    "height": 175,
    "weight": 80,
    "targetWeight": 75,
    "goal": "lose",
    "weeks": 12,
    "activityLevel": "moderate",
    "experience": "intermediate"
  }'

# Copy the returned _id and test progress update
curl -X PUT http://localhost:5000/api/fitness/update-progress/{userId} \
  -H "Content-Type: application/json" \
  -d '{
    "weekNumber": 1,
    "currentWeight": 78,
    "workoutsCompleted": 5,
    "notes": "Great week!"
  }'
```

---

For more detailed testing information, refer to the API documentation.
