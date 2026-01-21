const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
    weekNumber: Number,
    currentWeight: Number,
    workoutsCompleted: Number,
    notes: String,
    date: { type: Date, default: Date.now }
});

const UserPlanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: String,
    email: String,
    age: Number,
    gender: String,
    height: Number,
    weight: Number,
    currentWeight: Number,
    targetWeight: Number,
    goal: String,
    weeks: Number,
    weekNumber: { type: Number, default: 0 },
    activityLevel: String,
    experience: String,
    workoutPlan: String,
    nutritionPlan: String,
    progressTracking: String,
    workout: String,
    diet: String,
    tasks: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    progress: [ProgressSchema],
    completionPercentage: { type: Number, default: 0 }
});

module.exports = mongoose.model("UserPlan", UserPlanSchema);
