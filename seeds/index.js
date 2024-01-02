const mongoose = require('mongoose');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const cities = require('./cities');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // Your user ID
      author: '6529533c74a1cf9e89cbcb51',
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, suscipit.',
      price,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dbh5sgkwz/image/upload/v1700365135/YelpCamp/utsauadt6oqxxy52du0j.jpg',
          filename: 'YelpCamp/utsauadt6oqxxy52du0j',
        },
        {
          url: 'https://res.cloudinary.com/dbh5sgkwz/image/upload/v1700365137/YelpCamp/bfomud4kymokxcxmpga2.png',
          filename: 'YelpCamp/bfomud4kymokxcxmpga2',
        },
      ],
    });
    await camp.save();
  }
};
seedDB();
