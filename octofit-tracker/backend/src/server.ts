import express from 'express';
import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from './models/octofit.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    status: 'ok',
    health: '/api/health',
    endpoints: ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'],
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const collectionResponse = (resource: string, find: () => Promise<unknown[]>) => async (_request: express.Request, response: express.Response) => {
  try {
    response.json({ data: await find(), resource, apiBaseUrl });
  } catch (error) {
    console.error(`Error loading ${resource}:`, error);
    response.status(500).json({ error: `Unable to load ${resource}` });
  }
};

app.get('/api/users/', collectionResponse('users', () => User.find().lean()));
app.get('/api/teams/', collectionResponse('teams', () => Team.find().lean()));
app.get('/api/activities/', collectionResponse('activities', () => Activity.find().lean()));
app.get('/api/leaderboard/', collectionResponse('leaderboard', () => Leaderboard.find().sort({ rank: 1 }).lean()));
app.get('/api/workouts/', collectionResponse('workouts', () => Workout.find().lean()));

mongoose.connect(connectionString).then(() => {
  app.listen(port, () => {
    console.log(`OctoFit API listening at ${apiBaseUrl}`);
  });
}).catch((error) => {
  console.error('Error connecting to octofit_db:', error);
  process.exit(1);
});