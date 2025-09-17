export interface TennisCourt {
  id: string;
  name: string;
  location: string;
  address: string;
  rating: number;
  reviewCount: number;
  price: number;
  surface: 'Hard' | 'Clay' | 'Grass' | 'Synthetic';
  indoor: boolean;
  lights: boolean;
  image: string;
  description: string;
  amenities: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const generateMockReviews = (courtId: string): Review[] => {
  const reviews: Review[] = [];
  const reviewCount = Math.floor(Math.random() * 15) + 5;

  for (let i = 0; i < reviewCount; i++) {
    reviews.push({
      id: `${courtId}-review-${i}`,
      userId: `user-${i}`,
      userName: `Player${i + 1}`,
      rating: Math.floor(Math.random() * 5) + 1,
      comment: [
        "Great court with excellent lighting!",
        "Well maintained surface, highly recommend.",
        "Good value for money, friendly staff.",
        "Court was in perfect condition.",
        "Amazing facilities, will definitely come back.",
        "Clean and well-organized court.",
        "Professional setup with good amenities.",
        "Courts are always well-maintained.",
        "Great location, easy to find.",
        "Excellent playing experience overall."
      ][Math.floor(Math.random() * 10)],
      date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: Math.floor(Math.random() * 10)
    });
  }

  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const courtNames = [
  "Central Park Tennis Center", "Riverside Tennis Club", "Sunset Courts", "Elite Tennis Academy",
  "Metro Sports Complex", "Green Valley Courts", "Downtown Tennis Hub", "Mountain View Courts",
  "Ocean Breeze Tennis", "Golden Gate Tennis Club", "City Sports Center", "Parkside Tennis",
  "Highland Tennis Courts", "Valley Sports Club", "Riverside Athletic", "Sunny Side Courts",
  "Metropolitan Tennis", "Garden District Courts", "Harbor View Tennis", "Crestwood Sports",
  "Brookside Tennis Club", "Hillcrest Courts", "Lakeside Tennis Center", "Pine Valley Courts",
  "Westside Tennis Academy", "Eastbrook Sports", "Northgate Tennis", "Southfield Courts",
  "Midtown Tennis Club", "Ridgeview Courts", "Fairview Tennis", "Oakwood Sports Center",
  "Springfield Tennis", "Millbrook Courts", "Woodland Tennis", "Cedar Hills Sports",
  "Maple Grove Tennis", "Birchwood Courts", "Pinecrest Tennis", "Willowbrook Sports",
  "Rosewood Tennis Club", "Magnolia Courts", "Dogwood Tennis", "Cherry Blossom Sports",
  "Lilac Tennis Center", "Jasmine Courts", "Iris Sports Club", "Tulip Tennis",
  "Daffodil Courts", "Hyacinth Tennis", "Peony Sports", "Orchid Tennis Club",
  "Lotus Courts", "Lily Tennis", "Rose Sports Center", "Carnation Courts",
  "Marigold Tennis", "Sunflower Sports", "Daisy Courts", "Poppy Tennis Club"
];

const locations = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ",
  "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA",
  "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH", "Charlotte, NC",
  "San Francisco, CA", "Indianapolis, IN", "Seattle, WA", "Denver, CO", "Washington, DC",
  "Boston, MA", "El Paso, TX", "Nashville, TN", "Detroit, MI", "Oklahoma City, OK",
  "Portland, OR", "Las Vegas, NV", "Memphis, TN", "Louisville, KY", "Baltimore, MD",
  "Milwaukee, WI", "Albuquerque, NM", "Tucson, AZ", "Fresno, CA", "Sacramento, CA",
  "Mesa, AZ", "Kansas City, MO", "Atlanta, GA", "Long Beach, CA", "Colorado Springs, CO",
  "Raleigh, NC", "Miami, FL", "Virginia Beach, VA", "Omaha, NE", "Oakland, CA",
  "Minneapolis, MN", "Tulsa, OK", "Arlington, TX", "Tampa, FL", "New Orleans, LA"
];

const surfaces: ('Hard' | 'Clay' | 'Grass' | 'Synthetic')[] = ['Hard', 'Clay', 'Grass', 'Synthetic'];
const amenities = [
  "Parking", "Restrooms", "Water Fountains", "Pro Shop", "Locker Rooms",
  "Café", "WiFi", "Air Conditioning", "Heating", "Sound System",
  "Video Analysis", "Coaching", "Tournament Hosting", "Equipment Rental"
];

export const mockTennisCourts: TennisCourt[] = courtNames.map((name, index) => {
  const location = locations[index % locations.length];
  const surface = surfaces[Math.floor(Math.random() * surfaces?.length)];
  const reviews = generateMockReviews(`court-${index}`);
  const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return {
    id: `court-${index}`,
    name,
    location,
    address: `${Math.floor(Math.random() * 9999) + 1} ${['Main St', 'Oak Ave', 'Pine Rd', 'Elm St', 'Cedar Ln'][Math.floor(Math.random() * 5)]}, ${location}`,
    rating: Math.round(avgRating * 10) / 10,
    reviewCount: reviews?.length,
    price: Math.floor(Math.random() * 50) + 20,
    surface,
    indoor: Math.random() > 0.6,
    lights: Math.random() > 0.3,
    image: `https://picsum.photos/400/300?random=${index}`,
    description: `A ${surface.toLowerCase()} court facility located in ${location}. ${surface === 'Hard' ? 'Perfect for all skill levels with consistent bounce.' : surface === 'Clay' ? 'Great for players who enjoy longer rallies.' : surface === 'Grass' ? 'Premium grass courts for traditional tennis experience.' : 'Modern synthetic surface with excellent playability.'} ${Math.random() > 0.5 ? 'Features professional lighting and climate control.' : 'Outdoor courts with natural lighting and fresh air.'}`,
    amenities: amenities.slice(0, Math.floor(Math.random() * 8) + 3),
    reviews
  };
});

export const getCourtById = (id: string): TennisCourt | undefined => {
  return mockTennisCourts.find(court => court.id === id);
};

export const searchCourts = (query: string): TennisCourt[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockTennisCourts.filter(court =>
    court.name.toLowerCase().includes(lowercaseQuery) ||
    court.location.toLowerCase().includes(lowercaseQuery) ||
    court.address.toLowerCase().includes(lowercaseQuery)
  );
};
