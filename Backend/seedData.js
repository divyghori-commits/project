import dns from 'dns';
try {
  dns.setServers(['1.1.1.1', '8.8.8.8']);
} catch (e) {
  // Ignore if not permitted
}

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Movie from './Model/Movie.js';
import Show from './Model/Show.js';
import HeroSettings from './Model/HeroSettings.js';

const moviesData = [
  {
    title: 'Dune: Part Two',
    overview: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.',
    poster_path: 'https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s520b4q.jpg',
    trailer_url: 'https://www.youtube.com/watch?v=Way9Dexny3w',
    genres: [
      { id: 878, name: 'Science Fiction' },
      { id: 12, name: 'Adventure' },
      { id: 28, name: 'Action' }
    ],
    casts: [
      { name: 'Timothée Chalamet', profile_path: 'https://image.tmdb.org/t/p/original/BE2sdjpgsa2rNTFa66f7upkaOP.jpg', character: 'Paul Atreides' },
      { name: 'Zendaya', profile_path: 'https://image.tmdb.org/t/p/original/r3A7ev7QkjI9Nn99IdEi0KyRLOB.jpg', character: 'Chani' },
      { name: 'Rebecca Ferguson', profile_path: 'https://image.tmdb.org/t/p/original/6NRrVv85T1s9ukZt6bK2Zc36kK7.jpg', character: 'Lady Jessica' },
      { name: 'Javier Bardem', profile_path: 'https://image.tmdb.org/t/p/original/1QfLps3zT0gVv9wIe9w23gB8lBv.jpg', character: 'Stilgar' },
      { name: 'Austin Butler', profile_path: 'https://image.tmdb.org/t/p/original/2eS5y87lYq9n5aJ19aO3zG9Qx9k.jpg', character: 'Feyd-Rautha' }
    ],
    release_date: new Date('2024-03-01'),
    original_language: 'en',
    lang: 'English',
    tagline: 'Long live the fighters.',
    vote_average: 8.5,
    vote_count: 5400,
    runtime: 166,
    status: 'now_showing',
    isActive: true
  },
  {
    title: 'Mission: Impossible - The Final Reckoning',
    overview: 'Ethan Hunt and team continue their search for the terrifying AI known as the Entity — which has infiltrated intelligence networks all over the globe — with the world\'s governments and a mysterious ghost from Hunt\'s past on their trail. Joined by new allies and armed with the means to shut the Entity down for good, Hunt is in a race against time to prevent the world as we know it from changing forever.',
    poster_path: 'https://image.tmdb.org/t/p/original/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/1p5aI299YBnqrEEvVGJERk2MXXb.jpg',
    trailer_url: 'https://www.youtube.com/watch?v=NOhDyHN4t78',
    genres: [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 53, name: 'Thriller' }
    ],
    casts: [
      { name: 'Tom Cruise', profile_path: 'https://image.tmdb.org/t/p/original/gThaIXgpCm3ugYAgYqRk7n9Hchp.jpg', character: 'Ethan Hunt' },
      { name: 'Hayley Atwell', profile_path: 'https://image.tmdb.org/t/p/original/l2z3h5hH1u14jUo6rE3r9G7jB2L.jpg', character: 'Grace' },
      { name: 'Ving Rhames', profile_path: 'https://image.tmdb.org/t/p/original/4DLiR15pT42tDquz3s11Q7J912.jpg', character: 'Luther Stickell' },
      { name: 'Simon Pegg', profile_path: 'https://image.tmdb.org/t/p/original/2EhL1W93222jP8H7vF7f4J0Q2L.jpg', character: 'Benji Dunn' }
    ],
    release_date: new Date('2025-05-23'),
    original_language: 'en',
    lang: 'English',
    tagline: 'Our lives are the sum of our choices.',
    vote_average: 8.4,
    vote_count: 19885,
    runtime: 170,
    status: 'now_showing',
    isActive: true
  },
  {
    title: 'Thunderbolts*',
    overview: 'After finding themselves ensnared in a death trap, seven disillusioned castoffs and antiheroes must embark on a dangerous covert mission that will force them to confront the darkest corners of their pasts.',
    poster_path: 'https://image.tmdb.org/t/p/original/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg',
    trailer_url: 'https://www.youtube.com/watch?v=-sAOWhvheK8',
    genres: [
      { id: 28, name: 'Action' },
      { id: 878, name: 'Science Fiction' },
      { id: 12, name: 'Adventure' }
    ],
    casts: [
      { name: 'Florence Pugh', profile_path: 'https://image.tmdb.org/t/p/original/7EnLQ4K2qE9cT1t8J5o1U5W9b5P.jpg', character: 'Yelena Belova' },
      { name: 'Sebastian Stan', profile_path: 'https://image.tmdb.org/t/p/original/nNAbX4Zf7Y4w1cQ5y9vB6qD6B.jpg', character: 'Bucky Barnes' },
      { name: 'David Harbour', profile_path: 'https://image.tmdb.org/t/p/original/chPkhYSrXfBtpNspRY0kdfZg6W5.jpg', character: 'Alexei Shostakov / Red Guardian' },
      { name: 'Wyatt Russell', profile_path: 'https://image.tmdb.org/t/p/original/5H7hD2aYF4QW2e7j8X7l5L4P5a.jpg', character: 'John Walker / U.S. Agent' }
    ],
    release_date: new Date('2025-05-02'),
    original_language: 'en',
    lang: 'English',
    tagline: 'Careful who you assemble.',
    vote_average: 7.8,
    vote_count: 23569,
    runtime: 127,
    status: 'now_showing',
    isActive: true
  },
  {
    title: 'A Minecraft Movie',
    overview: 'Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination. To get back home, they\'ll have to master this world while embarking on a magical quest with an unexpected, expert crafter, Steve.',
    poster_path: 'https://image.tmdb.org/t/p/original/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg',
    trailer_url: 'https://www.youtube.com/watch?v=1pHDWnXmK7Y',
    genres: [
      { id: 10751, name: 'Family' },
      { id: 35, name: 'Comedy' },
      { id: 12, name: 'Adventure' },
      { id: 14, name: 'Fantasy' }
    ],
    casts: [
      { name: 'Jack Black', profile_path: 'https://image.tmdb.org/t/p/original/rtCx09gn9umjhApNDVBTne8f9L5.jpg', character: 'Steve' },
      { name: 'Jason Momoa', profile_path: 'https://image.tmdb.org/t/p/original/6A1P0rFhL5T4qL3v4o5Y3e7Y8Z.jpg', character: 'Garrett "The Garbage Man" Garrison' },
      { name: 'Emma Myers', profile_path: 'https://image.tmdb.org/t/p/original/qZ5cW3k4B8X7L2t6h5V8v9z2b1.jpg', character: 'Natalie' },
      { name: 'Danielle Brooks', profile_path: 'https://image.tmdb.org/t/p/original/hY4T4m8r7X1h2K8l3J4b5W6x7.jpg', character: 'Dawn' }
    ],
    release_date: new Date('2025-04-04'),
    original_language: 'en',
    lang: 'English',
    tagline: 'Be there and be square.',
    vote_average: 7.5,
    vote_count: 15225,
    runtime: 101,
    status: 'now_showing',
    isActive: true
  },
  {
    title: 'Chhaava',
    overview: 'A high-octane historical action drama based on the epic life of Chhatrapati Sambhaji Maharaj, the courageous and legendary second ruler of the Maratha Empire, detailing his heroic battles and uncompromising honor.',
    poster_path: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/75/Chhaava_film_poster.jpg/250px-Chhaava_film_poster.jpg',
    backdrop_path: 'https://i.redd.it/chhava-movie-posters-all-the-poster-quality-looks-amazing-v0-yrkyntyg93ee1.jpg?width=600&format=pjpg&auto=webp&s=be9d64efdcdcb22d7344d5857b4532c42ed7f89c',
    trailer_url: 'https://www.youtube.com/watch?v=hs3w32RG8L8',
    genres: [
      { id: 36, name: 'History' },
      { id: 28, name: 'Action' },
      { id: 18, name: 'Drama' }
    ],
    casts: [
      { name: 'Vicky Kaushal', profile_path: 'https://image.tmdb.org/t/p/original/5e3y8aQ9p7k3w0G5Z1x9B3c4D.jpg', character: 'Chhatrapati Sambhaji Maharaj' },
      { name: 'Rashmika Mandanna', profile_path: 'https://image.tmdb.org/t/p/original/8hL6h3n5B9t7w1K5p8G4b3F.jpg', character: 'Yesubai Bhonsale' },
      { name: 'Akshaye Khanna', profile_path: 'https://image.tmdb.org/t/p/original/3nL2v9h7L1m8K4F5w6X7Y8Z.jpg', character: 'Emperor Aurangzeb' }
    ],
    release_date: new Date('2025-02-14'),
    original_language: 'hi',
    lang: 'Hindi',
    tagline: 'A warrior. A legacy. A battle for history.',
    vote_average: 8.3,
    vote_count: 14600,
    runtime: 161,
    status: 'now_showing',
    isActive: true
  },
  {
    title: 'Deadpool & Wolverine',
    overview: 'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.',
    poster_path: 'https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/yDHYTjA3R0jFYba16jBB1jv82E9.jpg',
    trailer_url: 'https://www.youtube.com/watch?v=73_1biulkYk',
    genres: [
      { id: 28, name: 'Action' },
      { id: 35, name: 'Comedy' },
      { id: 878, name: 'Science Fiction' }
    ],
    casts: [
      { name: 'Ryan Reynolds', profile_path: 'https://image.tmdb.org/t/p/original/4SYTH5FRAxKuTvMm9294htVIW2b.jpg', character: 'Wade Wilson / Deadpool' },
      { name: 'Hugh Jackman', profile_path: 'https://image.tmdb.org/t/p/original/4Xujtewxqt6aU0Y8158970.jpg', character: 'Logan / Wolverine' },
      { name: 'Emma Corrin', profile_path: 'https://image.tmdb.org/t/p/original/a0W6sL9o5h6Z2w3g4T5V6b7.jpg', character: 'Cassandra Nova' }
    ],
    release_date: new Date('2024-07-26'),
    original_language: 'en',
    lang: 'English',
    tagline: 'Come together.',
    vote_average: 7.8,
    vote_count: 5800,
    runtime: 128,
    status: 'now_showing',
    isActive: true
  },
  {
    title: 'Lilo & Stitch',
    overview: 'The wildly funny and touching live-action reimagining of the lonely Hawaiian girl named Lilo and the fugitive alien Stitch who crash lands on Earth and helps mend her broken family.',
    poster_path: 'https://image.tmdb.org/t/p/original/mKKqV23MQ0uakJS8OCE2TfV5jNS.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg',
    trailer_url: 'https://www.youtube.com/watch?v=umiKiW4En9g',
    genres: [
      { id: 10751, name: 'Family' },
      { id: 35, name: 'Comedy' },
      { id: 878, name: 'Science Fiction' }
    ],
    casts: [
      { name: 'Maia Kealoha', profile_path: 'https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg', character: 'Lilo Pelekai' },
      { name: 'Chris Sanders', profile_path: 'https://image.tmdb.org/t/p/original/cbZrB8crWlLEDjVUoak8Liak6s.jpg', character: 'Stitch (voice)' },
      { name: 'Zach Galifianakis', profile_path: 'https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg', character: 'Dr. Jumba Jookiba' }
    ],
    release_date: new Date('2025-05-23'),
    original_language: 'en',
    lang: 'English',
    tagline: 'Hold on to your coconuts.',
    vote_average: 7.9,
    vote_count: 27500,
    runtime: 108,
    status: 'now_showing',
    isActive: true
  },
  {
    title: 'In the Lost Lands',
    overview: 'A queen sends the powerful and feared sorceress Gray Alys to the ghostly wilderness of the Lost Lands in search of a magical power, where she and her guide, the drifter Boyce, must outwit and outfight both man and demon.',
    poster_path: 'https://image.tmdb.org/t/p/original/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg',
    trailer_url: 'https://www.youtube.com/watch?v=WpW36ldAqnM',
    genres: [
      { id: 28, name: 'Action' },
      { id: 14, name: 'Fantasy' },
      { id: 12, name: 'Adventure' }
    ],
    casts: [
      { name: 'Milla Jovovich', profile_path: 'https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg', character: 'Gray Alys' },
      { name: 'Dave Bautista', profile_path: 'https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg', character: 'Boyce' },
      { name: 'Arly Jover', profile_path: 'https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg', character: 'Ash' }
    ],
    release_date: new Date('2025-03-07'),
    original_language: 'en',
    lang: 'English',
    tagline: 'She seeks the power to free her people.',
    vote_average: 7.2,
    vote_count: 15000,
    runtime: 102,
    status: 'now_showing',
    isActive: true
  },
  {
    title: 'Havoc',
    overview: 'When a drug heist swerves lethally out of control, a bruised detective fights his way through a criminal underworld to rescue a politician\'s estranged son while unraveling a deep web of corruption and conspiracy.',
    poster_path: 'https://image.tmdb.org/t/p/original/ubP2OsF3GlfqYPvXyLw9d78djGX.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/65MVgDa6YjSdqzh7YOA04mYkioo.jpg',
    trailer_url: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
    genres: [
      { id: 28, name: 'Action' },
      { id: 80, name: 'Crime' },
      { id: 53, name: 'Thriller' }
    ],
    casts: [
      { name: 'Tom Hardy', profile_path: 'https://image.tmdb.org/t/p/original/d8AoqjxZyy2w0X64m6iY4k5.jpg', character: 'Walker' },
      { name: 'Forest Whitaker', profile_path: 'https://image.tmdb.org/t/p/original/83gA2DqD9bZ1gG1H7vF.jpg', character: 'Lawrence' },
      { name: 'Timothy Olyphant', profile_path: 'https://image.tmdb.org/t/p/original/4D2m4F5lQ6wG7a1H.jpg', character: 'Vincent' }
    ],
    release_date: new Date('2025-06-15'),
    original_language: 'en',
    lang: 'English',
    tagline: 'No law. Only disorder.',
    vote_average: 7.4,
    vote_count: 8900,
    runtime: 107,
    status: 'coming_soon',
    isActive: true
  },
  {
    title: 'Inception',
    overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to regain his old life as payment for a task considered to be impossible: inception, the implantation of another person\'s idea into a target\'s subconscious.',
    poster_path: 'https://image.tmdb.org/t/p/original/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
    trailer_url: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
    genres: [
      { id: 28, name: 'Action' },
      { id: 878, name: 'Science Fiction' },
      { id: 53, name: 'Thriller' }
    ],
    casts: [
      { name: 'Leonardo DiCaprio', profile_path: 'https://image.tmdb.org/t/p/original/wo2hJpn04vbtmh0B9utCFdsQ2v9.jpg', character: 'Dom Cobb' },
      { name: 'Joseph Gordon-Levitt', profile_path: 'https://image.tmdb.org/t/p/original/dhv9yHk6r7u7r6Xf8k5m4z5h.jpg', character: 'Arthur' },
      { name: 'Elliot Page', profile_path: 'https://image.tmdb.org/t/p/original/hKq9d7o5y0h2X2B2a4k3.jpg', character: 'Ariadne' },
      { name: 'Tom Hardy', profile_path: 'https://image.tmdb.org/t/p/original/d8AoqjxZyy2w0X64m6iY4k5.jpg', character: 'Eames' }
    ],
    release_date: new Date('2010-07-16'),
    original_language: 'en',
    lang: 'English',
    tagline: 'Your mind is the scene of the crime.',
    vote_average: 8.8,
    vote_count: 36000,
    runtime: 148,
    status: 'now_showing',
    isActive: true
  }
];

const theaters = [
  {
    name: 'PVR ICON: Phoenix Palladium',
    screen: 'Screen 1 (IMAX Laser)',
    address: 'High Street Phoenix, Lower Parel, Mumbai'
  },
  {
    name: 'INOX Megaplex: Inorbit Mall',
    screen: 'Screen 2 (Dolby Atmos)',
    address: 'Inorbit Mall, Malad West, Mumbai'
  },
  {
    name: 'Cinepolis: Viviana Grand',
    screen: 'VIP Screen 3 (4DX)',
    address: 'Viviana Mall, Eastern Express Hwy, Thane'
  }
];

const showTimeTemplates = [
  { hour: 10, minute: 30, price: 250 },
  { hour: 14, minute: 0,  price: 320 },
  { hour: 17, minute: 30, price: 380 },
  { hour: 20, minute: 45, price: 450 },
  { hour: 23, minute: 15, price: 300 }
];

// Sample pre-booked seats to make layout look lively
const sampleOccupiedSeatsMap = () => {
  const map = new Map();
  const seatsToOccupy = ['A4', 'A5', 'C3', 'C4', 'D5', 'D6', 'D7', 'F4', 'F5', 'G6'];
  seatsToOccupy.forEach((seat, idx) => {
    map.set(seat, `user_mock_${(idx % 3) + 1}`);
  });
  return map;
};

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI.trim();
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully!');

    // 1. Seed Movies
    console.log('\n--- 1. SEEDING MOVIES ---');
    await Movie.deleteMany({});
    console.log('Cleared existing movies.');

    const createdMovies = await Movie.insertMany(moviesData);
    console.log(`Created ${createdMovies.length} movies successfully!`);

    const movieMap = {};
    createdMovies.forEach(m => {
      movieMap[m.title] = m;
      console.log(` - [${m.status.toUpperCase()}] ${m.title} (ID: ${m._id})`);
    });

    // 2. Seed Hero Banners (HeroSettings)
    console.log('\n--- 2. SEEDING HERO BANNERS ---');
    await HeroSettings.deleteMany({});

    const dune = movieMap['Dune: Part Two'];
    const thunderbolts = movieMap['Thunderbolts*'];
    const mi = movieMap['Mission: Impossible - The Final Reckoning'];
    const minecraft = movieMap['A Minecraft Movie'];
    const chhaava = movieMap['Chhaava'];
    const deadpool = movieMap['Deadpool & Wolverine'];

    const heroSlides = [
      {
        title: 'Dune: Part Two',
        subtitle: 'Long Live the Fighters',
        description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family in a battle for the universe.',
        backgroundImage: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s520b4q.jpg',
        posterImage: 'https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
        genres: 'Action · Adventure · Sci-Fi',
        releaseYear: '2024',
        duration: '2h 46m',
        rating: '8.5',
        buttonText: 'Book Tickets',
        buttonLink: `/movies/${dune ? dune._id : ''}`,
        order: 0,
        isActive: true
      },
      {
        title: 'Thunderbolts*',
        subtitle: 'Careful Who You Assemble',
        description: 'An irreverent team-up featuring Marvel\'s least anticipated band of misfits forced together on a dangerous covert mission.',
        backgroundImage: 'https://image.tmdb.org/t/p/original/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg',
        posterImage: 'https://image.tmdb.org/t/p/original/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg',
        genres: 'Action · Sci-Fi · Adventure',
        releaseYear: '2025',
        duration: '2h 07m',
        rating: '7.8',
        buttonText: 'Reserve Seats',
        buttonLink: `/movies/${thunderbolts ? thunderbolts._id : ''}`,
        order: 1,
        isActive: true
      },
      {
        title: 'Mission: Impossible - The Final Reckoning',
        subtitle: 'Our Lives Are The Sum Of Our Choices',
        description: 'Ethan Hunt and his team face an all-powerful AI threat that has infiltrated every global intelligence network, in a desperate race against time.',
        backgroundImage: 'https://image.tmdb.org/t/p/original/1p5aI299YBnqrEEvVGJERk2MXXb.jpg',
        posterImage: 'https://image.tmdb.org/t/p/original/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg',
        genres: 'Action · Adventure · Thriller',
        releaseYear: '2025',
        duration: '2h 50m',
        rating: '8.4',
        buttonText: 'Book Now',
        buttonLink: `/movies/${mi ? mi._id : ''}`,
        order: 2,
        isActive: true
      },
      {
        title: 'A Minecraft Movie',
        subtitle: 'Be There and Be Square',
        description: 'Four misfits are pulled through a mysterious portal into the Overworld, a cubic wonderland where they must join forces with Steve to save the realm.',
        backgroundImage: 'https://image.tmdb.org/t/p/original/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg',
        posterImage: 'https://image.tmdb.org/t/p/original/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg',
        genres: 'Family · Adventure · Fantasy',
        releaseYear: '2025',
        duration: '1h 41m',
        rating: '7.5',
        buttonText: 'Get Tickets',
        buttonLink: `/movies/${minecraft ? minecraft._id : ''}`,
        order: 3,
        isActive: true
      },
      {
        title: 'Chhaava',
        subtitle: 'The Lion of the Maratha Empire',
        description: 'A historical action spectacle depicting the extraordinary valor and strategic brilliance of Chhatrapati Sambhaji Maharaj.',
        backgroundImage: 'https://i.redd.it/chhava-movie-posters-all-the-poster-quality-looks-amazing-v0-yrkyntyg93ee1.jpg?width=600&format=pjpg&auto=webp&s=be9d64efdcdcb22d7344d5857b4532c42ed7f89c',
        posterImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/75/Chhaava_film_poster.jpg/250px-Chhaava_film_poster.jpg',
        genres: 'Historical · Action · Drama',
        releaseYear: '2025',
        duration: '2h 41m',
        rating: '8.3',
        buttonText: 'Book Tickets',
        buttonLink: `/movies/${chhaava ? chhaava._id : ''}`,
        order: 4,
        isActive: true
      },
      {
        title: 'Deadpool & Wolverine',
        subtitle: 'Come Together',
        description: 'Wade Wilson and Logan must put aside their differences and join forces to save Wade\'s world in a chaotic, action-packed multiverse adventure.',
        backgroundImage: 'https://image.tmdb.org/t/p/original/yDHYTjA3R0jFYba16jBB1jv82E9.jpg',
        posterImage: 'https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
        genres: 'Action · Comedy · Sci-Fi',
        releaseYear: '2024',
        duration: '2h 08m',
        rating: '7.8',
        buttonText: 'Book Tickets',
        buttonLink: `/movies/${deadpool ? deadpool._id : ''}`,
        order: 5,
        isActive: true
      }
    ];

    const heroDoc = await HeroSettings.create({
      backgroundImage: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s520b4q.jpg',
      title: 'Dune: Part Two',
      subtitle: 'Long Live the Fighters',
      description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
      genres: 'Action · Adventure · Sci-Fi',
      releaseYear: '2024',
      duration: '2h 46m',
      buttonText: 'Explore Movies',
      buttonLink: '/movies',
      enableSlider: true,
      autoRotate: true,
      rotationInterval: 5000,
      isActive: true,
      heroSlides
    });
    console.log(`Created HeroSettings with ${heroDoc.heroSlides.length} banner slides!`);

    // 3. Seed Shows
    console.log('\n--- 3. SEEDING SHOWS ---');
    await Show.deleteMany({});
    console.log('Cleared existing shows.');

    const now_showing_movies = createdMovies.filter(m => m.status === 'now_showing');
    const showsToInsert = [];

    // Schedule shows for today (upcoming hours) + next 6 days (total 7 days)
    const baseNow = new Date();

    for (let dayOffset = 0; dayOffset <= 6; dayOffset++) {
      const showDate = new Date(baseNow);
      showDate.setDate(baseNow.getDate() + dayOffset);

      for (let movieIndex = 0; movieIndex < now_showing_movies.length; movieIndex++) {
        const movie = now_showing_movies[movieIndex];
        const theater = theaters[movieIndex % theaters.length];

        // Assign 2 to 4 showtimes per movie per day
        const templateIndices = dayOffset % 2 === 0 ? [0, 1, 3] : [1, 2, 4];

        for (const tIdx of templateIndices) {
          const t = showTimeTemplates[tIdx];
          const showDateTime = new Date(showDate);
          showDateTime.setHours(t.hour, t.minute, 0, 0);

          // Skip times that are already in the past today
          if (showDateTime < new Date(Date.now() + 30 * 60 * 1000)) {
            // If it's today and already passed, shift to late evening or skip
            continue;
          }

          showsToInsert.push({
            movie: movie._id,
            showDateTime,
            showPrice: t.price,
            theater: {
              name: theater.name,
              screen: theater.screen,
              address: theater.address
            },
            occupiedSeats: (dayOffset < 2) ? sampleOccupiedSeatsMap() : new Map(),
            lockedSeats: new Map(),
            totalSeats: 80,
            seatLayout: { rows: 8, seatsPerRow: 10 },
            isActive: true
          });
        }
      }
    }

    // Always ensure at least 2 evening/night shows for today so user can immediately test booking!
    const todayNightShow1 = new Date(baseNow);
    todayNightShow1.setHours(baseNow.getHours() + 2, 30, 0, 0);
    const todayNightShow2 = new Date(baseNow);
    todayNightShow2.setHours(baseNow.getHours() + 5, 0, 0, 0);

    for (let i = 0; i < Math.min(3, now_showing_movies.length); i++) {
      const m = now_showing_movies[i];
      showsToInsert.push({
        movie: m._id,
        showDateTime: todayNightShow1,
        showPrice: 350,
        theater: theaters[i % theaters.length],
        occupiedSeats: sampleOccupiedSeatsMap(),
        lockedSeats: new Map(),
        totalSeats: 80,
        seatLayout: { rows: 8, seatsPerRow: 10 },
        isActive: true
      });
      showsToInsert.push({
        movie: m._id,
        showDateTime: todayNightShow2,
        showPrice: 420,
        theater: theaters[(i + 1) % theaters.length],
        occupiedSeats: new Map(),
        lockedSeats: new Map(),
        totalSeats: 80,
        seatLayout: { rows: 8, seatsPerRow: 10 },
        isActive: true
      });
    }

    const createdShows = await Show.insertMany(showsToInsert);
    console.log(`Created ${createdShows.length} shows scheduled across 7 days for ${now_showing_movies.length} movies!`);

    console.log('\n======================================');
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log(`- Movies: ${createdMovies.length}`);
    console.log(`- Hero Banners (Slides): ${heroSlides.length}`);
    console.log(`- Shows: ${createdShows.length}`);
    console.log('======================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed with error:', error);
    process.exit(1);
  }
}

seedDatabase();
