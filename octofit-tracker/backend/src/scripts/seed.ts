import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/octofit.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      { username: 'maya', email: 'maya@mergington.edu', displayName: 'Maya Rodriguez', age: 16, fitnessLevel: 'intermediate', team: 'Trail Blazers' },
      { username: 'liam', email: 'liam@mergington.edu', displayName: 'Liam Chen', age: 17, fitnessLevel: 'beginner', team: 'Court Kings' },
      { username: 'zoe', email: 'zoe@mergington.edu', displayName: 'Zoe Williams', age: 15, fitnessLevel: 'advanced', team: 'Trail Blazers' },
    ]);

    await Team.insertMany([
      { name: 'Trail Blazers', mascot: 'Mountain lion', coach: 'Paul Octo', members: ['maya', 'zoe'], totalPoints: 410 },
      { name: 'Court Kings', mascot: 'Falcon', coach: 'Jessica Cat', members: ['liam'], totalPoints: 185 },
    ]);

    await Activity.insertMany([
      { username: 'maya', type: 'running', durationMinutes: 32, distanceKm: 5.1, points: 85, completedAt: new Date('2026-08-21') },
      { username: 'liam', type: 'walking', durationMinutes: 45, distanceKm: 3.4, points: 55, completedAt: new Date('2026-08-22') },
      { username: 'zoe', type: 'strength training', durationMinutes: 40, points: 95, completedAt: new Date('2026-08-23') },
    ]);

    await Leaderboard.insertMany([
      { username: 'zoe', team: 'Trail Blazers', points: 235, activitiesCompleted: 8, rank: 1 },
      { username: 'maya', team: 'Trail Blazers', points: 175, activitiesCompleted: 6, rank: 2 },
      { username: 'liam', team: 'Court Kings', points: 185, activitiesCompleted: 5, rank: 3 },
    ]);

    await Workout.insertMany([
      { title: 'Run and Reset', description: 'A steady cardio session with a gentle cooldown.', fitnessLevel: 'beginner', category: 'cardio', durationMinutes: 25, exercises: ['5 minute warm-up walk', '15 minute easy run', '5 minute stretch'] },
      { title: 'Core Circuit', description: 'Build stability with a focused bodyweight circuit.', fitnessLevel: 'intermediate', category: 'strength', durationMinutes: 30, exercises: ['Plank', 'Bird dog', 'Dead bug', 'Mountain climbers'] },
      { title: 'Power Intervals', description: 'Short bursts of effort for advanced athletes.', fitnessLevel: 'advanced', category: 'cardio', durationMinutes: 35, exercises: ['Dynamic warm-up', '6 sprint intervals', 'Walking recovery', 'Cooldown'] },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
