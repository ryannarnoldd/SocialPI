import db from "../config/connection.js";
import Thought from '../models/Thought.js';
import User from '../models/User.js';

const seedDatabase = async () => {
  try {
    // Connect to database
    await db();

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    console.info('Database cleaned.');
    return
  } catch (err) {
    return err;
  }}

seedDatabase();
  