import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection as typeof mongoose.connection & {
  on(event: string, listener: (...args: unknown[]) => void): void;
};

mongoose
  .connect(connectionString)
  .then(() => {
    console.log('Connected to octofit_db');
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  });

db.on('error', console.error.bind(console, 'connection error:'));

export default db;
