export interface CityLocalities {
  city: string;
  state: string;
  localities: string[];
}

export const metroCityLocalities: CityLocalities[] = [
  {
    city: "Bangalore",
    state: "Karnataka",
    localities: [
      "Koramangala",
      "Marathahalli",
      "Electronic City",
      "Sarjapur",
      "Indiranagar",
      "Whitefield",
      "HSR Layout",
    ],
  },
  {
    city: "Ahmedabad",
    state: "Gujarat",
    localities: [
      "Navrangpura",
      "Bodakdev",
      "Vastrapur",
      "Satellite",
      "Maninagar",
    ],
  },
  {
    city: "Jaipur",
    state: "Rajasthan",
    localities: [
      "Vaishali Nagar",
      "Malviya Nagar",
      "Mansarovar",
      "C-Scheme",
      "Jagatpura",
    ],
  },
  {
    city: "Surat",
    state: "Gujarat",
    localities: ["Adajan", "Vesu", "City Light", "Athwa", "Varachha"],
  },
  {
    city: "Lucknow",
    state: "Uttar Pradesh",
    localities: [
      "Gomti Nagar",
      "Aliganj",
      "Hazratganj",
      "Indira Nagar",
      "Alambagh",
    ],
  },
  {
    city: "Kanpur",
    state: "Uttar Pradesh",
    localities: [
      "Swaroop Nagar",
      "Civil Lines",
      "Kakadeo",
      "Arya Nagar",
      "Govind Nagar",
    ],
  },
  {
    city: "Nagpur",
    state: "Maharashtra",
    localities: [
      "Dharampeth",
      "Civil Lines",
      "Sadar",
      "Manish Nagar",
      "Pratap Nagar",
    ],
  },
  {
    city: "Indore",
    state: "Madhya Pradesh",
    localities: ["Vijay Nagar", "Palasia", "Bhawarkuan", "Rau", "Bhawarkua"],
  },
  {
    city: "Thane",
    state: "Maharashtra",
    localities: [
      "Hiranandani Estate",
      "Ghodbunder Road",
      "Panchpakhadi",
      "Majiwada",
      "Vasant Vihar",
    ],
  },
  {
    city: "Bhopal",
    state: "Madhya Pradesh",
    localities: [
      "Arera Colony",
      "MP Nagar",
      "Kolar Road",
      "Gulmohar",
      "Shahpura",
    ],
  },
  {
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    localities: [
      "Maddilapalem",
      "MVP Colony",
      "Dwaraka Nagar",
      "Seethammadhara",
      "Gajuwaka",
    ],
  },
  {
    city: "Pimpri-Chinchwad",
    state: "Maharashtra",
    localities: ["Akurdi", "Nigdi", "Chinchwad", "Pimpri", "Wakad"],
  },
  {
    city: "Patna",
    state: "Bihar",
    localities: [
      "Boring Road",
      "Kankarbagh",
      "Patliputra Colony",
      "Rajendra Nagar",
      "Danapur",
    ],
  },
  {
    city: "Vadodara",
    state: "Gujarat",
    localities: ["Alkapuri", "Gotri", "Akota", "Manjalpur", "Waghodia Road"],
  },
  {
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    localities: [
      "Indirapuram",
      "Vaishali",
      "Raj Nagar",
      "Kaushambi",
      "Crossings Republik",
    ],
  },
  {
    city: "Ludhiana",
    state: "Punjab",
    localities: [
      "Sarabha Nagar",
      "Model Town",
      "Pakhowal Road",
      "BRS Nagar",
      "Civil Lines",
    ],
  },
  {
    city: "Agra",
    state: "Uttar Pradesh",
    localities: [
      "Tajganj",
      "Civil Lines",
      "Sanjay Place",
      "Dayal Bagh",
      "Kamla Nagar",
    ],
  },
  {
    city: "Nashik",
    state: "Maharashtra",
    localities: [
      "Gangapur Road",
      "Indira Nagar",
      "Panchavati",
      "College Road",
      "Deolali",
    ],
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
    localities: [
      "Andheri",
      "Bandra",
      "Powai",
      "Borivali",
      "Lower Parel",
      "Dadar",
    ],
  },
  {
    city: "Delhi",
    state: "Delhi",
    localities: [
      "South Delhi",
      "Dwarka",
      "Rohini",
      "Lajpat Nagar",
      "Saket",
      "Karol Bagh",
    ],
  },
  {
    city: "Kolkata",
    state: "West Bengal",
    localities: [
      "Salt Lake",
      "New Town",
      "Park Street",
      "Howrah",
      "Ballygunge",
    ],
  },
  {
    city: "Chennai",
    state: "Tamil Nadu",
    localities: ["T Nagar", "Velachery", "Adyar", "OMR", "Anna Nagar"],
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    localities: [
      "Gachibowli",
      "Madhapur",
      "Banjara Hills",
      "Begumpet",
      "Kondapur",
    ],
  },
  {
    city: "Pune",
    state: "Maharashtra",
    localities: [
      "Koregaon Park",
      "Kothrud",
      "Hinjewadi",
      "Viman Nagar",
      "Baner",
    ],
  },
];

export function getLocalitiesByCity(cityName: string): string[] {
  const city = metroCityLocalities.find(
    (c) => c.city.toLowerCase() === cityName.toLowerCase()
  );
  return city
    ? city.localities
    : [
        // Fallback generic localities if city is missing from the list
        "City Center",
        "Old Town",
        "Industrial Area",
        "Railway Station",
        "University Area",
      ];
}
