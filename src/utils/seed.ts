import connection from '../config/connection.js';
// import { User, Thought } from '../models/index.js';
// import { getRandomName, getRandomthoughts } from './data.js';

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let thoughtCheck = await connection.db?.listCollections({ name: 'thought' }).toArray();
  if (thoughtCheck?.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
  if (userCheck?.length) {
    await connection.dropCollection('users');
  }

  // const users = [];
  // const thoughts = getRandomthoughts(10);

  // for (let i = 0; i < 20; i++) {
  //   const fullName = getRandomName();
  //   const first = fullName.split(' ')[0];
  //   const last = fullName.split(' ')[1];

  //   users.push({
  //     first,
  //     last,
  //     age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
  //   });
  // }

  // await User.insertMany(users);
  // await Thought.insertMany(thoughts);

  // loop through the saved thoughts, for each thought we need to generate a thought reaction and insert the thought reactions
  // console.table(users);
  // console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
