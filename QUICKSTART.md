# Healthyfy - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Install Backend Dependencies

```bash
cd Backend
npm install
```

### Step 2: Configure MongoDB

Make sure you have MongoDB running locally or update the connection string in `.env`:

```env
MONGO_URI=mongodb://localhost:27017/healthyfy
```

### Step 3: Start the Backend Server

```bash
npm start
```

You should see: `Server running on port 5000`

### Step 4: Open Frontend

Open `Frontend/index.html` in your browser (or use Live Server extension)

## 🎯 Using the Application

### Creating Your First Plan

1. Fill in all required fields
2. Select your fitness goal
3. Click "Generate My Plan"
4. Review your personalized plan

### Tracking Progress

1. After creating a plan, the dashboard appears
2. Enter your weekly progress (weight, workouts completed)
3. Add notes if desired
4. Save progress to update your stats

### Available Goals

- **Lose Weight** - Cardio focused with high protein
- **Gain Muscle** - Strength training with calorie surplus
- **Maintain** - Balanced fitness approach
- **Build Strength** - Heavy lifting program
- **Build Endurance** - Cardio stamina training

## 📊 What's Included

Each personalized plan includes:

- ✅ Detailed 7-day workout schedule
- ✅ Customized nutrition plan
- ✅ Calorie targets
- ✅ Macro nutrient breakdown
- ✅ Daily habits & tasks
- ✅ Pro tips from fitness experts
- ✅ Sample meal plans
- ✅ Progress tracking dashboard

## 🔧 Troubleshooting

### Backend Won't Start

- Check if MongoDB is running
- Verify Node.js is installed (v14+)
- Check `.env` file exists
- Try: `npm install` again

### Frontend Won't Connect to Backend

- Verify backend is running on port 5000
- Check browser console (F12) for errors
- Make sure CORS is enabled (it is in current setup)
- Try refreshing the page

### MongoDB Connection Issues

- Start MongoDB service: `mongod` (Windows) or `sudo systemctl start mongod` (Linux)
- Verify connection string in `.env`
- Check if port 27017 is available

## 📈 Test Data

Try creating a plan with:

- Name: Test User
- Email: test@example.com
- Age: 25
- Height: 175
- Weight: 80
- Target Weight: 75
- Goal: Lose Weight
- Weeks: 12
- Activity: Moderate
- Experience: Intermediate

Then update progress for week 1:

- Weight: 79 kg
- Workouts: 5/7
- Notes: Great start!

## 🎓 Learning the Code

### Frontend Structure (HTML)

- **Navigation**: Sticky navbar at top
- **Hero Section**: Welcome banner
- **Form Section**: User input collection
- **Results Section**: Displays generated plan
- **Features Section**: 6 feature cards
- **Dashboard Section**: Progress tracking
- **Contact Section**: Support info
- **Footer**: Copyright info

### Frontend Styling (CSS)

- Modern gradients (purple theme)
- Responsive grid layout
- Smooth animations
- Mobile-first design
- Professional color scheme

### Frontend Logic (JavaScript)

- Form validation
- Plan generation algorithm
- API communication
- Progress tracking
- Data persistence

### Backend Structure (Node.js)

- Express server setup
- MongoDB connection
- Route definitions
- Data validation
- Error handling

### MongoDB Schema

- User profile data
- Fitness goal and metrics
- Workout history
- Weekly progress records
- Completion tracking

## 💡 Tips for Best Results

1. **Consistency is Key** - Follow the plan for best results
2. **Track Weekly** - Update progress every week
3. **Adjust as Needed** - Modify plan based on progress
4. **Hydration** - Drink plenty of water
5. **Sleep** - Get 7-8 hours for recovery
6. **Progress Photos** - Take weekly photos for visual tracking
7. **Meal Prep** - Prepare meals in advance
8. **Rest Days** - Don't skip rest and recovery

## 🚀 Next Steps

- Set up user authentication
- Add email notifications
- Create mobile app
- Add workout video library
- Integrate fitness trackers
- Build community features
- Add payment system

## 📚 API Documentation

### Create Plan

```
POST /api/fitness/create-plan
```

### Update Progress

```
PUT /api/fitness/update-progress/{userId}
```

### Get Progress

```
GET /api/fitness/get-progress/{userId}
```

### Get All Plans

```
GET /api/fitness/all-plans
```

### Get Analytics

```
GET /api/fitness/analytics
```

## ❓ FAQ

**Q: Can I use this without MongoDB?**
A: No, MongoDB is required for data persistence.

**Q: Is this app mobile-friendly?**
A: Yes, it's fully responsive and works on mobile devices.

**Q: Can I modify the workout plans?**
A: Yes, edit the JavaScript `generatePlan()` function to customize.

**Q: How accurate are the calorie calculations?**
A: They use Harris-Benedict equation, which is reasonably accurate for most people.

**Q: Can I export my progress?**
A: Currently shown in dashboard. Could be enhanced with export feature.

---

**Need Help?** Check the main README.md or backend console for error messages.

Happy Training! 💪
