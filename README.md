# Healthyfy - Your Personal Fitness Journey

A professional AI-powered fitness platform that creates personalized workout and diet plans based on your fitness goals, body metrics, and experience level. Track your progress weekly and stay motivated!

## ✨ Features

### 🎯 Personalized Fitness Plans

- AI-generated workout routines tailored to your goal (lose weight, gain muscle, maintain, build strength, build endurance)
- Custom nutrition plans with calorie targets and macro breakdowns
- Daily tasks and habits to keep you on track
- Professional tips from fitness experts

### 📊 Progress Tracking

- Weekly progress updates (weight, workouts completed)
- Personalized dashboard showing current stats
- Historical progress tracking
- Completion percentage monitoring
- Weekly notes and observations

### 🥗 Comprehensive Nutrition Guidance

- Calorie calculations based on Harris-Benedict equation
- Macro-nutrient breakdowns for your goal
- Sample meal plans for each goal
- Pre/post-workout nutrition advice
- Hydration guidelines

### 💪 Multiple Goal Types

1. **Weight Loss** - Cardio-focused with strength preservation
2. **Muscle Gain** - Strength training with calorie surplus
3. **Maintenance** - Balanced fitness approach
4. **Strength Building** - Power and heavy lifts focus
5. **Endurance** - Stamina and long-duration training

### 📈 Analytics & Dashboard

- Current statistics display
- Weekly progress visualization
- Goal progress tracking
- Completion metrics

## 🛠️ Tech Stack

### Frontend

- HTML5 (Semantic & Responsive)
- CSS3 (Modern styling with gradients and animations)
- Vanilla JavaScript (ES6+)
- Professional UI/UX design

### Backend

- Node.js + Express.js
- MongoDB (NoSQL Database)
- Mongoose ODM
- REST API Architecture
- Input validation and error handling

## 📋 Project Structure

```
Healthyfy/
├── Backend/
│   ├── server.js                 # Main server file
│   ├── package.json              # Dependencies
│   ├── .env                       # Environment variables
│   ├── model/
│   │   └── UserPlan.js          # MongoDB schema with progress tracking
│   └── routes/
│       └── fitnessRoutes.js      # API endpoints
│
└── Frontend/
    ├── index.html               # Main HTML with all sections
    ├── css/
    │   └── style.css            # Professional styling
    └── js/
        └── app.js               # JavaScript functionality
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

#### Backend Setup

```bash
cd Backend
npm install
```

#### Environment Configuration

Create a `.env` file in the Backend directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/healthyfy
NODE_ENV=development
```

#### Start Backend Server

```bash
cd Backend
npm start
```

The server will run on `http://localhost:5000`

#### Frontend Setup

1. Open `Frontend/index.html` in a web browser
2. Or use Live Server extension in VS Code
3. Make sure backend is running on port 5000

## 📚 API Endpoints

### Create Fitness Plan

**POST** `/api/fitness/create-plan`

Request Body:

```json
{
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
}
```

Response:

```json
{
  "_id": "user_id",
  "name": "John Doe",
  "weight": 85,
  "targetWeight": 75,
  "goal": "lose",
  "weeks": 12,
  "workout": "Detailed workout plan...",
  "diet": "Detailed nutrition plan...",
  "tasks": "Daily tasks...",
  "createdAt": "2026-01-19T..."
}
```

### Update Weekly Progress

**PUT** `/api/fitness/update-progress/:id`

Request Body:

```json
{
  "weekNumber": 1,
  "currentWeight": 83,
  "workoutsCompleted": 5,
  "notes": "Feeling great! Energy levels up."
}
```

### Get User Progress

**GET** `/api/fitness/get-progress/:id`

Response includes:

- Current stats
- Weekly progress history
- Goal completion percentage
- All tracked data

### Get User Plan

**GET** `/api/fitness/get-plan/:id`

### Get All Plans (Admin)

**GET** `/api/fitness/all-plans?page=1&limit=10`

### Analytics

**GET** `/api/fitness/analytics`

## 🎨 UI Features

### Navigation

- Sticky navbar with smooth navigation
- Quick links to all sections
- Professional branding

### Hero Section

- Eye-catching banner
- Call-to-action button
- Clear value proposition

### Plan Creation Form

- Organized form with multiple sections
- Input validation
- Clear field labels
- Professional styling

### Results Display

- Comprehensive fitness plan
- Visual statistics
- Organized sections
- Progress tracking area

### Features Section

- 6 feature cards
- Icon-based design
- Hover effects
- Clear descriptions

### Dashboard

- Current stats display
- Weekly progress list
- Goal tracking
- Progress update form

### Responsive Design

- Mobile-friendly interface
- Tablet-optimized layout
- Desktop experience optimized

## 💾 Data Storage

### User Plan Collection (MongoDB)

```javascript
{
    _id: ObjectId,
    name: String,
    email: String (unique),
    age: Number,
    gender: String,
    height: Number,
    weight: Number,
    targetWeight: Number,
    goal: String,
    weeks: Number,
    activityLevel: String,
    experience: String,
    workout: String,
    diet: String,
    tasks: String,
    createdAt: Date,
    progress: [{
        weekNumber: Number,
        currentWeight: Number,
        workoutsCompleted: Number,
        notes: String,
        date: Date
    }],
    completionPercentage: Number
}
```

## 🔢 Calculations

### Calorie Calculation (Harris-Benedict Equation)

- Uses height, weight, age, and gender
- Applies activity multiplier
- Adjusts for fitness goal (deficit/surplus/maintenance)

### BMI Calculation

- Formula: weight (kg) / height² (m)
- Used for fitness assessment

### Macro Nutrient Splits

- **Weight Loss**: Higher protein (2g/kg), lower carbs
- **Muscle Gain**: High protein (2.2g/kg), high carbs
- **Maintenance**: Balanced approach
- **Strength**: High protein, moderate-high carbs
- **Endurance**: High carbs (55-65%), moderate protein

## ✅ Features Implemented

- [x] Professional HTML structure with semantic tags
- [x] Modern CSS with animations and gradients
- [x] Navigation with sticky navbar
- [x] Hero section with call-to-action
- [x] Comprehensive form with validation
- [x] 5 different fitness goals
- [x] Personalized workout plans
- [x] Customized nutrition plans
- [x] Daily habit tracking
- [x] Progress tracking system
- [x] Dashboard with analytics
- [x] Calorie calculation
- [x] Weekly progress updates
- [x] MongoDB data persistence
- [x] REST API with validation
- [x] Error handling
- [x] Responsive design
- [x] Features showcase section
- [x] Contact information

## 🚀 Future Enhancements

- User authentication (JWT)
- Email notifications for reminders
- Mobile app version
- Integration with fitness trackers (Fitbit, Apple Watch)
- Community challenges
- In-app messaging between trainer and user
- Photo progress tracking
- Workout video library
- Recipe database with macros
- Payment integration for premium features
- Advanced analytics and charts
- Social sharing features

## 💬 Contact & Support

For support, email: support@healthyfy.com
Phone: +91-XXXX-XXXXX

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Development Tips

### Testing the Application

1. Start with the form validation
2. Create a test user plan
3. Test progress updates with different values
4. Check MongoDB for stored data
5. Verify calculations are accurate

### Debugging

- Check browser console for errors (F12)
- Check backend console for API errors
- Verify MongoDB connection
- Check network requests in Network tab

### Adding New Features

1. Update frontend HTML if needed
2. Update JavaScript functionality
3. Create/update backend routes
4. Update MongoDB schema if needed
5. Test thoroughly

---

**Made with ❤️ for your fitness journey**

Healthyfy v1.0.0 | 2026
