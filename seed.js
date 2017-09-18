let db = require('./models');

let wineryList = [];

wineryList.push({
  name: 'Unti',
  description: 'Dry Creek Winery',
  url: 'https://www.untiwines.com',
  fullAddress: '4202 Dry Creek Rd, Healdsburg, CA 95448',
  contactPhone: '415-987-0987',
  contactEmail: 'unti@untiwines.com',
  hours: '10AM - 5PM Thurs-Sun',
  tastingByAppt: true,
  varietals: ['Pinot Noir', 'Rose', 'Grenache'],
  wineClub: false,
  twitter: '@untiwines',
  facebook: 'facebook.com/untiwines',
  wineRegion: 'Dry Creek Valley',
  maps: {
    lat: 38.6640092,
    long: -122.9342897
  }
});

wineryList.push({
  name: 'Roth',
  description: 'Alexander Valley Winery',
  url: 'https://www.rothestatewines.com',
  fullAddress: '10309 Chalk Hill Rd, Healdsburg, CA 95448',
  contactPhone: '415-987-0000',
  contactEmail: 'roth@rothestatewines.com',
  hours: '10AM - 5PM 7 Days a week',
  tastingByAppt: false,
  varietals: ['Pinot Noir', 'Rose', 'Chardonnay', 'Cabernet Sauvignon'],
  wineClub: true,
  twitter: '@rothestate',
  facebook: 'facebook.com/rothwines',
  wineRegion: 'Alexander Valley',
  maps: {
    lat: 38.5706633,
    long: -122.7795547
  }
});

wineryList.push({
  name: "Cellars of Sonoma",
  description: "Collective tasting room of 8 small producers",
  url: "www.cellarsofsonoma.com",
  fullAddress: "133 4th St. Santa Rosa, CA 95405",
  contactPhone: "707-578-1826",
  contactEmail: "",
  hours: "",
  tastingByAppt: true,
  twitter: "",
  facebook: "",
  wineRegion: "",
  maps: {
    lat: 38.4381061,
    long: -122.7197686
    },
  varietals: [""]
});

wineryList.push({
  name: "Bella Vineyards ",
  description: "Head into our wine caves to test the small-lot zin!",
  url: "www.bellawinery.com",
  fullAddress: "9711 West Dry Creek Road Healdsburg, CA 95448",
  contactPhone: "707-473-9171",
  contactEmail: "",
  hours: "Daily 11AM - 4:30PM",
  tastingByAppt: false,
  twitter: "",
  facebook: "",
  wineRegion: "",
  maps: {
  lat: 38.7056274,
  long: -122.9804787
  },
  varietals: [
  "Chardonnay, Pinot Noir, Zinfandel"
  ]
});

// wineryList.forEach(function(winery){
//
// });

db.Winery.remove({}, function(err, wineries){
  db.Winery.create(wineryList, function(err, wineries) {
    if (err) {return console.log('Error', err);}
    console.log('All Wineries: ', wineries);
    console.log('Created ', wineries.length, ' wineries');
    process.exit();
  });
});
