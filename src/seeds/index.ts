import db from '../config/connection.js';
import Thought from '../models/Thought.js';
import User from '../models/User.js';

// Array of names for generating random users
const names = [
  'Aaran', 'Aaren', 'Aarez', 'Aarman', 'Aaron', 'Aaron-James', 'Aarron', 'Aaryan', 'Aaryn', 'Aayan',
  'Aazaan', 'Abaan', 'Abbas', 'Abdallah', 'Abdalroof', 'Smith', 'Jones', 'Coollastname', 'Ze',
  'Zechariah', 'Zeek', 'Zeeshan', 'Zen', 'Zendel', 'Zenith', 'Zennon', 'Zeph', 'Zion', 'Ziyaan'
];

// Array of thought texts for generating random thoughts
const thoughts = [
  'I love programming!', 'Node.js is amazing.', 'React makes development fun!', 
  'Coding late at night is so peaceful.', 'Why is debugging so hard?', 
  'MongoDB is pretty cool.', 'JavaScript forever!', 'Just learned about TypeScript!',
  'Social networks are fascinating.', 'I need coffee!', 'Is AI taking over the world?',
  'The weather is perfect for coding today.', 'Learning something new every day.'
];

// Array of reaction texts for generating random reactions
// const reactions = [
//   'Totally agree!', 'This is awesome!', 'Hilarious!', 'Very insightful.', 
//   'I think the same!', 'Could not have said it better.', 'Interesting perspective.', 
//   'Haha, love this!', 'Good point.', 'Well said!'
// ];

// Helper function to get a random item from an array
const getRandomArrItem = (arr: any) => arr[Math.floor(Math.random() * arr.length)];

// Function to generate a random user
const getRandomUser = () => {
  const firstName = getRandomArrItem(names);
  // const lastName = getRandomArrItem(names);
  const username = `${firstName}_${Math.floor(Math.random() * 1000)}`;
  const email = `${username.toLowerCase()}@example.com`;
  
  return { username, email, password: 'password123' };
};

// Function to generate a random thought
const getRandomThought = (userId: string) => ({
  thoughtText: getRandomArrItem(thoughts),
  username: userId,
  reactions: [],
});

const seedDatabase = async () => {
  try {
    // Connect to database
    await db();

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    console.info('Database cleaned.');

    // Generate users
    const users = await Promise.all(
      Array.from({ length: 10 }).map(() => User.create(getRandomUser()))
    );

    console.info('Users created.');

    // Generate thoughts for some users
    const thoughtPromises = users.map(async (user) => {
      const thought = getRandomThought(user.username);
      const newThought = await Thought.create(thought);

      // Add thought to the user's thoughts array
      await User.findByIdAndUpdate(user._id, { $push: { thoughts: newThought._id } });

      // Optionally add reactions to the thought
      // const reactionCount = Math.floor(Math.random() * 4); // Up to 3 reactions per thought
      // const reactionData = Array.from({ length: reactionCount }).map(() => ({
      //   reactionText: getRandomArrItem(reactions),
      //   username: getRandomArrItem(users).username,
      // }));
      // newThought.reactions = reactionData;
      await newThought.save();
      return newThought;
    });

    await Promise.all(thoughtPromises);

    console.info('Thoughts and reactions created.');
    console.info('Seeding complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

seedDatabase();
