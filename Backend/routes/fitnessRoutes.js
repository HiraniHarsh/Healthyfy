const express = require("express");
const router = express.Router();
const UserPlan = require("../model/UserPlan");
const authRoutes = require("./authRoutes");

const verifyToken = authRoutes.verifyToken;

// Create a new fitness plan (Protected - requires authentication)
router.post("/create-plan", verifyToken, async (req, res) => {
    try {
        const { age, gender, height, weight, targetWeight, goal, weeks, activityLevel, experience } = req.body;
        const userId = req.userId;
        const email = req.userEmail;

        // Validation
        if (!age || !gender || !height || !weight || !targetWeight || !goal || !weeks || !activityLevel || !experience) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Validate height and weight
        if (height < 100 || height > 250 || weight < 30 || weight > 300) {
            return res.status(400).json({ error: "Please enter realistic height (100-250cm) and weight (30-300kg)" });
        }

        // Check if user already has an active plan
        const existingPlan = await UserPlan.findOne({ userId: userId });
        if (existingPlan) {
            // Update existing plan instead of creating new one
            existingPlan.age = age;
            existingPlan.gender = gender;
            existingPlan.height = height;
            existingPlan.weight = weight;
            existingPlan.currentWeight = weight;
            existingPlan.targetWeight = targetWeight;
            existingPlan.goal = goal;
            existingPlan.weeks = weeks;
            existingPlan.weekNumber = 0;
            existingPlan.activityLevel = activityLevel;
            existingPlan.experience = experience;

            const { workout, diet, tasks } = generateWorkoutPlan(goal, weight, experience);
            existingPlan.workout = workout;
            existingPlan.diet = diet;
            existingPlan.tasks = tasks;
            existingPlan.workoutPlan = workout;
            existingPlan.nutritionPlan = diet;
            existingPlan.progressTracking = tasks;
            existingPlan.completionPercentage = 0;
            existingPlan.progress = [];

            await existingPlan.save();
            return res.json({ plan: existingPlan });
        }

        // Generate personalized plan content
        const { workout, diet, tasks } = generateWorkoutPlan(goal, weight, experience);

        const plan = new UserPlan({
            userId,
            email,
            age,
            gender,
            height,
            weight,
            currentWeight: weight,
            targetWeight,
            goal,
            weeks,
            weekNumber: 0,
            activityLevel,
            experience,
            workoutPlan: workout,
            nutritionPlan: diet,
            progressTracking: tasks,
            workout,
            diet,
            tasks,
            progress: [],
            completionPercentage: 0
        });

        await plan.save();

        res.status(201).json({ plan });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error while creating plan" });
    }
});

// Get user's plan (Protected)
router.get("/get-plan", verifyToken, async (req, res) => {
    try {
        const plan = await UserPlan.findOne({ userId: req.userId });
        
        if (!plan) {
            return res.status(404).json({ error: "Plan not found" });
        }

        res.json({ plan });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get plan by ID (Old endpoint - still available)
router.get("/get-plan/:id", async (req, res) => {
    try {
        const plan = await UserPlan.findById(req.params.id);
        
        if (!plan) {
            return res.status(404).json({ error: "Plan not found" });
        }

        res.json(plan);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Update weekly progress (Protected)
router.put("/update-progress", verifyToken, async (req, res) => {
    try {
        const { weekNumber, currentWeight, workoutsCompleted, notes } = req.body;

        // Validation
        if (!weekNumber || !currentWeight || workoutsCompleted === undefined) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const plan = await UserPlan.findOne({ userId: req.userId });

        if (!plan) {
            return res.status(404).json({ error: "Plan not found" });
        }

        // Check if progress for this week already exists
        const existingProgress = plan.progress.find(p => p.weekNumber === weekNumber);

        if (existingProgress) {
            // Update existing progress
            existingProgress.currentWeight = currentWeight;
            existingProgress.workoutsCompleted = workoutsCompleted;
            existingProgress.notes = notes;
            existingProgress.date = new Date();
        } else {
            // Add new progress
            plan.progress.push({
                weekNumber,
                currentWeight,
                workoutsCompleted,
                notes,
                date: new Date()
            });
        }

        // Calculate completion percentage
        const completedWeeks = plan.progress.length;
        plan.completionPercentage = Math.round((completedWeeks / plan.weeks) * 100);

        await plan.save();

        res.json({
            message: "Progress updated successfully",
            plan: plan
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error while updating progress" });
    }
});

// Get progress for logged in user (Protected)
router.get("/get-progress", verifyToken, async (req, res) => {
    try {
        const plan = await UserPlan.findOne({ userId: req.userId });

        if (!plan) {
            return res.status(404).json({ error: "Plan not found" });
        }

        res.json({
            weight: plan.weight,
            targetWeight: plan.targetWeight,
            goal: plan.goal,
            weeks: plan.weeks,
            progress: plan.progress,
            completionPercentage: plan.completionPercentage
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get all plans (with pagination for admin)
router.get("/all-plans", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const plans = await UserPlan.find()
            .skip(skip)
            .limit(limit)
            .select("-progress")
            .sort({ createdAt: -1 });

        const total = await UserPlan.countDocuments();

        res.json({
            plans: plans,
            total: total,
            pages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get statistics/analytics
router.get("/analytics", async (req, res) => {
    try {
        const totalUsers = await UserPlan.countDocuments();
        
        const goalBreakdown = await UserPlan.aggregate([
            { $group: { _id: "$goal", count: { $sum: 1 } } }
        ]);

        const experienceBreakdown = await UserPlan.aggregate([
            { $group: { _id: "$experience", count: { $sum: 1 } } }
        ]);

        const avgCompletion = await UserPlan.aggregate([
            { $group: { _id: null, avgCompletion: { $avg: "$completionPercentage" } } }
        ]);

        res.json({
            totalUsers: totalUsers,
            goalBreakdown: goalBreakdown,
            experienceBreakdown: experienceBreakdown,
            averageCompletion: avgCompletion[0]?.avgCompletion || 0
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Generate personalized workout plan based on goal and experience
function generateWorkoutPlan(goal, weight, experience) {
    let workout, diet, tasks;

    const proteinIntake = Math.round(weight * 2);
    const calorieDeficit = Math.round(2000 - 500);
    const calorieSurplus = Math.round(2000 + 500);

    if (goal === "lose") {
        workout = `
Cardio & HIIT Training (Weight Loss Focus):
- Monday: 40 mins moderate cardio (walking/jogging)
- Tuesday: Circuit training (20 mins) - 3 rounds of 40 secs work, 20 secs rest
- Wednesday: Rest or light yoga/stretching
- Thursday: 45 mins moderate to high intensity cardio
- Friday: HIIT training (20-30 mins)
- Saturday: 60 mins steady-state cardio
- Sunday: Rest day

Additional: Add strength training 2x per week (20 mins) for muscle preservation
        `;
        diet = `
Weight Loss Nutrition Plan:
- Daily Calorie Target: 1500-1800 calories (500 calorie deficit)
- Protein: ${proteinIntake}g daily (high protein for muscle preservation)
- Carbs: Focus on complex carbs - oats, brown rice, sweet potato, whole wheat
- Fats: Healthy fats only - nuts, olive oil, avocado (limit 25-30% of calories)
- Hydration: 3-4 liters water daily
- Meal timing: 5-6 small meals throughout the day
- Avoid: Sugary drinks, processed foods, excessive oils

Sample Daily Meal Plan:
- Breakfast: Oatmeal with berries + protein powder
- Snack: Greek yogurt with almonds
- Lunch: Grilled chicken breast + brown rice + vegetables
- Snack: Protein shake with banana
- Dinner: Fish or lean meat + sweet potato + green vegetables
        `;
        tasks = `10,000 steps daily | Drink 3-4L water | 1 cardio session | Track all meals | 7-8 hours sleep | Avoid sugary drinks | Weekly meal prep`;
    } else if (goal === "gain") {
        workout = `
Muscle Building Program (Strength Focus):
- Monday: Chest & Triceps (45-60 mins) - Focus on compound lifts first
- Tuesday: Back & Biceps (45-60 mins) - Heavy row variations
- Wednesday: Legs (50-60 mins) - Squats, deadlifts, lunges
- Thursday: Shoulders & Core (40-50 mins) - Press variations
- Friday: Full Body Compound Lifts (45 mins) - Big 3 lifts
- Saturday: Active recovery - light cardio, stretching, or sports
- Sunday: Complete rest

Strength Focus: Compound lifts (Squat, Bench, Deadlift, Rows)
Rep Range: 6-12 reps per set, 3-4 sets per exercise
        `;
        diet = `
Muscle Gaining Nutrition Plan:
- Daily Calorie Target: 2500-3000 calories (500 calorie surplus)
- Protein: ${Math.round(weight * 2.2)}g daily (CRITICAL for muscle growth)
- Carbs: 50% of total calories (for energy and recovery)
- Fats: 25% of total calories (hormonal health)
- Meal frequency: 5-6 meals per day
- Pre-workout: Carbs + Protein 1-2 hours before training
- Post-workout: Protein + Fast carbs (like banana) within 30 mins

Sample High-Protein Daily Meal Plan:
- Breakfast: 4 eggs + oatmeal + banana
- Snack: Protein shake + oats + peanut butter
- Lunch: Chicken breast (200g) + rice + vegetables
- Snack: Greek yogurt + granola + berries
- Dinner: Salmon (200g) + sweet potato + broccoli
- Before bed: Casein protein or Greek yogurt

Supplements: Whey Protein, Creatine Monohydrate, Multivitamin
        `;
        tasks = `Complete strength workout | Consume ${Math.round(weight * 2.2)}g protein | Track calories and macros | Get 8-9 hours sleep | Rest days are important | Progressive overload - increase weight weekly | Take creatine & protein supplement`;
    } else if (goal === "maintain") {
        workout = `
Maintenance Workout Plan (Balanced Fitness):
- Monday: Strength training (30-40 mins) - Upper body focus
- Tuesday: Cardio (30-40 mins) - Moderate intensity
- Wednesday: Rest or yoga/mobility work
- Thursday: Strength training (30-40 mins) - Lower body focus
- Friday: HIIT or Fun activity (30 mins) - Sports or group fitness
- Saturday: Active recreation - hiking, sports, or light cycling
- Sunday: Rest day

Balanced approach: 50% strength, 30% cardio, 20% flexibility
        `;
        diet = `
Balanced Nutrition Plan (Maintenance):
- Daily Calorie Target: 2000-2200 calories (maintenance)
- Protein: ${Math.round(weight * 1.6)}g daily
- Carbs: 45-50% of total calories (balanced source of energy)
- Fats: 25-30% of total calories
- Hydration: 2-3 liters water daily
- Balanced meals with all macronutrient groups

Meal Structure:
- Breakfast: Whole grain toast + egg whites + orange juice
- Snack: Apple + almond butter
- Lunch: Turkey sandwich + salad
- Snack: Protein bar + banana
- Dinner: Grilled chicken + brown rice + vegetables
        `;
        tasks = `Exercise 4-5 times per week | Maintain consistent diet | Drink 2-3L water daily | Weekly weight check | Balanced meals | 7-8 hours sleep | Stay active on rest days`;
    } else if (goal === "strength") {
        workout = `
Strength Building Program (Power & Strength Focus):
- Monday: Heavy Lower Body (75-90 mins)
  * Squats: 5x3 (heavy)
  * Deadlifts or Leg Press: 4x3-5
  * Lunges or Leg Curls: 3x5-8
  * Calves: 3x8-12

- Tuesday: Heavy Upper Body Push (70-80 mins)
  * Bench Press: 5x3 (heavy)
  * Incline Dumbbell Press: 4x5
  * Dips or Close Grip Bench: 3x5-8
  * Lateral Raises: 3x8-12

- Wednesday: Rest or Mobility Work (30 mins)

- Thursday: Heavy Upper Body Pull (70-80 mins)
  * Deadlifts or Rows: 5x3 (heavy)
  * Pull-ups or Lat Pulldowns: 4x5
  * Barbell Rows: 4x5-8
  * Bicep Curls: 3x8-12

- Friday: Olympic Lifts or Power Training (60 mins)
  * Cleans, Snatches, or Plyometrics
  * Focus on explosive power

- Saturday: Accessory Work (50 mins)
  * Lighter, pump-focused work
  * 8-12 rep range

- Sunday: Complete Rest

Rep Range: 3-5 reps for heavy compound lifts, 5-8 for accessory
Rest Periods: 2-5 minutes between heavy sets
        `;
        diet = `
Strength Training Nutrition (Power Builder):
- Daily Calorie Target: 2300-2800 calories (slight surplus for strength)
- Protein: ${Math.round(weight * 2.2)}g daily (muscle recovery)
- Carbs: 50-55% of calories (fuel for heavy lifts)
- Fats: 25-30% of calories (hormone production)
- Meal frequency: 5-6 meals per day
- Focus on REAL FOOD for strength athletes

Strength Builder Meal Plan:
- Breakfast: 6 egg whites + 2 whole eggs + oatmeal + banana
- Snack: Protein shake + oats + nut butter
- Lunch: Lean beef (200g) + potatoes + vegetables
- Pre-workout: Rice cakes + honey + scoop of whey
- Post-workout: Protein shake + white rice (fast carbs)
- Dinner: Salmon + pasta + broccoli

Key for Strength: Eat BIG to get BIG
Supplements: Whey Protein, Creatine, Fish Oil, Multivitamin
        `;
        tasks = `Complete heavy compound lifts | Track all lifts (weight, reps, sets) | Progressive overload every week | Consume ${Math.round(weight * 2.2)}g protein | Sleep 8+ hours | Proper warm-up (10-15 mins) | Test 1-rep max every 4 weeks`;
    } else if (goal === "endurance") {
        workout = `
Endurance Building Program (Stamina Focus):
- Monday: Long Slow Distance (45-90 mins)
  * Run/cycle/swim at conversational pace
  * Build aerobic base

- Tuesday: Interval Training/HIIT (40 mins)
  * 8-10 x 3-5 min intervals at hard effort
  * Recovery: easy pace between intervals

- Wednesday: Cross-training (40-50 mins)
  * Different sport: cycling, swimming, rowing
  * Active recovery intensity

- Thursday: Speed Work/Tempo Run (40 mins)
  * 20-30 min at comfortably hard pace
  * Build lactate threshold

- Friday: Strength & Conditioning (30-40 mins)
  * Functional strength training
  * Core work
  * Flexibility

- Saturday: Long Endurance Session (60-120 mins)
  * Build weekly volume
  * Increase by max 10% per week

- Sunday: Complete Rest + Recovery

Focus: Gradual volume increase, consistency, injury prevention
        `;
        diet = `
Endurance Athlete Nutrition:
- Daily Calorie Target: 2200-2800 calories (based on training volume)
- Carbs: HIGH CARB DIET - 55-65% of calories (fuel for endurance)
- Protein: ${Math.round(weight * 1.6)}g daily (recovery)
- Fats: 20-25% of calories (essential nutrients)
- Hydration: 3-4 liters daily + electrolytes on long sessions

Endurance Athlete Daily Meal Plan:
- Breakfast: Large bowl of oatmeal + berries + honey + milk
- Snack: Rice cakes + jam
- Lunch: Pasta + lean protein + vegetables
- Snack: Banana + energy bar
- Dinner: Potatoes + chicken + steamed vegetables
- Evening: Carb-focused snack (bread, pasta, rice)

During Long Sessions (>90 mins):
- Sports drink with 6-8% carbs
- Gels or energy bars every 45 mins
- 500-1000ml water per hour

Post-workout:
- Carbs + protein within 30 mins (3:1 or 4:1 ratio)
- Example: Pasta with chicken
        `;
        tasks = `Complete 1 long endurance session | Do 2-3 speed/intensity workouts | Hydrate with electrolytes | High carb meals on training days | Sleep 8-9 hours | Foam roll and stretch daily | Build weekly volume gradually (max 10% increase)`;
    }

    return { workout, diet, tasks };
}

// Legacy endpoint for backward compatibility
router.post("/", async (req, res) => {
    try {
        const { name, height, weight, goal, weeks } = req.body;

        if (!name || !height || !weight || !goal || !weeks) {
            return res.status(400).json({ error: "All fields are required" });
        }

        let workout, diet, tasks;

        if (goal === "lose") {
            workout = "Cardio 40 mins, Strength 3x/week";
            diet = "Calorie deficit, high protein";
            tasks = "10k steps, drink water";
        } else if (goal === "gain") {
            workout = "Weight training 5x/week";
            diet = "Calorie surplus, protein rich";
            tasks = "Track protein, proper rest";
        } else {
            workout = "Mixed training 4x/week";
            diet = "Balanced diet";
            tasks = "Stay active daily";
        }

        const plan = new UserPlan({
            name, height, weight, goal, weeks,
            workout, diet, tasks
        });

        await plan.save();

        res.json(plan);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
