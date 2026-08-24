import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  age: { type: Number, required: true },
  fitnessLevel: { type: String, required: true },
  team: { type: String, required: true },
});

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true },
  mascot: { type: String, required: true },
  coach: { type: String, required: true },
  members: { type: [String], required: true },
  totalPoints: { type: Number, required: true },
});

const activitySchema = new Schema({
  username: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: Number,
  points: { type: Number, required: true },
  completedAt: { type: Date, required: true },
});

const leaderboardSchema = new Schema({
  username: { type: String, required: true, unique: true },
  team: { type: String, required: true },
  points: { type: Number, required: true },
  activitiesCompleted: { type: Number, required: true },
  rank: { type: Number, required: true },
});

const workoutSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fitnessLevel: { type: String, required: true },
  category: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  exercises: { type: [String], required: true },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);