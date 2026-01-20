# Healthyfy API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

Currently no authentication required. Future versions will include JWT-based auth.

---

## Endpoints

### 1. Create Fitness Plan

**POST** `/fitness/create-plan`

Creates a new personalized fitness plan for a user.

#### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "gender": "male|female|other",
  "height": 180,
  "weight": 85,
  "targetWeight": 75,
  "goal": "lose|gain|maintain|strength|endurance",
  "weeks": 12,
  "activityLevel": "sedentary|light|moderate|active",
  "experience": "beginner|intermediate|advanced"
}
```

#### Response (201 Created)

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "gender": "male",
  "height": 180,
  "weight": 85,
  "targetWeight": 75,
  "goal": "lose",
  "weeks": 12,
  "activityLevel": "moderate",
  "experience": "intermediate",
  "workout": "Detailed workout plan...",
  "diet": "Detailed nutrition plan...",
  "tasks": "Daily tasks...",
  "createdAt": "2026-01-19T10:30:00.000Z"
}
```

#### Error Responses

```json
{
  "error": "All fields are required"
}
```

```json
{
  "error": "Invalid email address"
}
```

```json
{
  "error": "User with this email already exists"
}
```

#### Validation Rules

- name: Non-empty string
- email: Valid email format, unique in database
- age: Number between 13-120
- gender: male, female, or other
- height: Number between 100-250 cm
- weight: Number between 30-300 kg
- targetWeight: Number between 30-300 kg
- goal: One of the 5 fitness goals
- weeks: Number between 1-52
- activityLevel: One of the 4 activity levels
- experience: One of the 3 experience levels

---

### 2. Get User Plan

**GET** `/fitness/get-plan/:id`

Retrieves the complete fitness plan for a user.

#### Parameters

- `id` (required): MongoDB ObjectID of the user

#### Response (200 OK)

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "gender": "male",
  "height": 180,
  "weight": 85,
  "targetWeight": 75,
  "goal": "lose",
  "weeks": 12,
  "activityLevel": "moderate",
  "experience": "intermediate",
  "workout": "...",
  "diet": "...",
  "tasks": "...",
  "createdAt": "2026-01-19T10:30:00.000Z",
  "progress": [],
  "completionPercentage": 0
}
```

#### Error Response

```json
{
  "error": "Plan not found"
}
```

---

### 3. Update Progress

**PUT** `/fitness/update-progress/:id`

Records weekly progress for a fitness plan.

#### Parameters

- `id` (required): MongoDB ObjectID of the user

#### Request Body

```json
{
  "weekNumber": 1,
  "currentWeight": 83.5,
  "workoutsCompleted": 5,
  "notes": "Great progress this week! Feeling energized."
}
```

#### Response (200 OK)

```json
{
  "message": "Progress updated successfully",
  "plan": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "weight": 85,
    "targetWeight": 75,
    "goal": "lose",
    "weeks": 12,
    "progress": [
      {
        "_id": "607f1f77bcf86cd799439012",
        "weekNumber": 1,
        "currentWeight": 83.5,
        "workoutsCompleted": 5,
        "notes": "Great progress this week! Feeling energized.",
        "date": "2026-01-19T10:35:00.000Z"
      }
    ],
    "completionPercentage": 8
  }
}
```

#### Error Responses

```json
{
  "error": "Missing required fields"
}
```

```json
{
  "error": "Plan not found"
}
```

#### Validation Rules

- weekNumber: Number between 1 and plan.weeks
- currentWeight: Number between 30-300
- workoutsCompleted: Number between 0-7
- notes: Optional string (max 500 characters)

#### Features

- Updates existing week if already recorded
- Creates new progress entry if not yet recorded
- Automatically recalculates completionPercentage
- Stores timestamp of update

---

### 4. Get Progress

**GET** `/fitness/get-progress/:id`

Retrieves progress history and current stats for a user.

#### Parameters

- `id` (required): MongoDB ObjectID of the user

#### Response (200 OK)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "weight": 85,
  "targetWeight": 75,
  "goal": "lose",
  "weeks": 12,
  "progress": [
    {
      "_id": "607f1f77bcf86cd799439012",
      "weekNumber": 1,
      "currentWeight": 83.5,
      "workoutsCompleted": 5,
      "notes": "Great start!",
      "date": "2026-01-19T10:35:00.000Z"
    },
    {
      "_id": "607f1f77bcf86cd799439013",
      "weekNumber": 2,
      "currentWeight": 82,
      "workoutsCompleted": 6,
      "notes": "Consistent progress",
      "date": "2026-01-26T10:35:00.000Z"
    }
  ],
  "completionPercentage": 17
}
```

#### Error Response

```json
{
  "error": "Plan not found"
}
```

---

### 5. Get All Plans (Admin)

**GET** `/fitness/all-plans`

Retrieves all user plans with pagination.

#### Query Parameters

- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10): Results per page

#### Response (200 OK)

```json
{
  "plans": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "weight": 85,
      "targetWeight": 75,
      "goal": "lose",
      "weeks": 12,
      "experience": "intermediate",
      "completionPercentage": 17,
      "createdAt": "2026-01-19T10:30:00.000Z"
    }
  ],
  "total": 42,
  "pages": 5,
  "currentPage": 1
}
```

#### Features

- Excludes progress details for performance
- Sorted by creation date (newest first)
- Pagination for large datasets

---

### 6. Get Analytics

**GET** `/fitness/analytics`

Retrieves aggregated statistics across all users.

#### Response (200 OK)

```json
{
  "totalUsers": 42,
  "goalBreakdown": [
    {
      "_id": "lose",
      "count": 18
    },
    {
      "_id": "gain",
      "count": 12
    },
    {
      "_id": "maintain",
      "count": 8
    },
    {
      "_id": "strength",
      "count": 3
    },
    {
      "_id": "endurance",
      "count": 1
    }
  ],
  "experienceBreakdown": [
    {
      "_id": "beginner",
      "count": 20
    },
    {
      "_id": "intermediate",
      "count": 15
    },
    {
      "_id": "advanced",
      "count": 7
    }
  ],
  "averageCompletion": 35.7
}
```

---

## Error Handling

### Common Error Codes

| Code | Meaning      | Example                   |
| ---- | ------------ | ------------------------- |
| 400  | Bad Request  | Missing required fields   |
| 404  | Not Found    | Plan/User doesn't exist   |
| 500  | Server Error | Database connection issue |

### Error Response Format

```json
{
  "error": "Description of what went wrong"
}
```

---

## Data Types

### Goal Types

```
"lose"      - Weight Loss
"gain"      - Muscle Gain
"maintain"  - Maintenance
"strength"  - Strength Building
"endurance" - Endurance Training
```

### Activity Levels

```
"sedentary"  - Little or no exercise
"light"      - Exercise 1-3 days/week
"moderate"   - Exercise 4-5 days/week
"active"     - Exercise 6-7 days/week
```

### Experience Levels

```
"beginner"      - New to fitness
"intermediate"  - Some fitness experience
"advanced"      - Experienced athlete
```

### Gender

```
"male"
"female"
"other"
```

---

## Rate Limiting

No rate limiting currently implemented. This is recommended for production.

## CORS

CORS is enabled for all origins. In production, restrict to specific domains.

## Database Schema

### UserPlan Collection

```javascript
{
    _id: ObjectId,                    // Unique identifier
    name: String,                      // User's name
    email: String (unique),            // User's email
    age: Number,                       // Age in years
    gender: String,                    // male, female, other
    height: Number,                    // Height in cm
    weight: Number,                    // Current weight in kg
    targetWeight: Number,              // Goal weight in kg
    goal: String,                      // Fitness goal
    weeks: Number,                     // Program duration
    activityLevel: String,             // Current activity level
    experience: String,                // Fitness experience
    workout: String,                   // Generated workout plan
    diet: String,                      // Generated nutrition plan
    tasks: String,                     // Daily tasks/habits
    createdAt: Date,                   // Creation timestamp
    progress: [{                       // Array of progress records
        weekNumber: Number,
        currentWeight: Number,
        workoutsCompleted: Number,
        notes: String,
        date: Date,
        _id: ObjectId
    }],
    completionPercentage: Number       // % of weeks completed
}
```

---

## Request Examples

### cURL

```bash
# Create a plan
curl -X POST http://localhost:5000/api/fitness/create-plan \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "gender": "male",
    "height": 180,
    "weight": 85,
    "targetWeight": 75,
    "goal": "lose",
    "weeks": 12,
    "activityLevel": "moderate",
    "experience": "intermediate"
  }'

# Get progress
curl http://localhost:5000/api/fitness/get-progress/507f1f77bcf86cd799439011

# Update progress
curl -X PUT http://localhost:5000/api/fitness/update-progress/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "weekNumber": 1,
    "currentWeight": 83.5,
    "workoutsCompleted": 5,
    "notes": "Great start!"
  }'
```

### JavaScript (Fetch)

```javascript
// Create a plan
const response = await fetch("http://localhost:5000/api/fitness/create-plan", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    age: 25,
    gender: "male",
    height: 180,
    weight: 85,
    targetWeight: 75,
    goal: "lose",
    weeks: 12,
    activityLevel: "moderate",
    experience: "intermediate",
  }),
});
const data = await response.json();
console.log(data._id); // Save this ID for future requests
```

---

## Version History

### v1.0.0 (2026-01-19)

- Initial release
- 6 main endpoints
- Progress tracking
- Analytics dashboard

---

## Future Enhancements

- [ ] JWT Authentication
- [ ] Rate limiting
- [ ] Webhook support
- [ ] Batch operations
- [ ] Export to PDF/CSV
- [ ] Advanced filtering
- [ ] Search functionality
- [ ] Data encryption

---

## Support

For API support: support@healthyfy.com
Documentation: https://healthyfy.com/api/docs
