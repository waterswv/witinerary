let db = require('./models');

let wineryList = [];
let wineMapList = [];

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

wineryList.push({
  name: "Comstock Wines ",
  description: "We consider your experience to be our final step",
  url: "www.comstockwines.com",
  fullAddress: "1290 Dry Creek Road Healdsburg CA 95448",
  contactPhone: "707-723-3011",
  contactEmail: "info@comstockwines.com",
  hours: "Fri-Mon 10:30AM - 4:30PM",
  tastingByAppt: false,
  twitter: "",
  facebook: "",
  wineRegion: "",
  maps: {
  lat: 38.6326374,
  long: -122.8973365
  },
  varietals: [
  "Chardonnay, Pinot Noir, Merlot, Zinfandel"
  ]
});

wineryList.push({
  name: "Fog Crest Vineyards",
  description: "Linger awhile on sunny hilltop patio and enjoy panoramic views & current releases",
  url: "www.fogcrestvineyards",
  fullAddress: "7606 Occidental Rd Sebastopol, CA 95472",
  contactPhone: "707-829-2006",
  contactEmail: "info@fogcrestvineyards.com",
  hours: "Daily 11AM - 5PM",
  tastingByAppt: false,
  twitter: "",
  facebook: "",
  wineRegion: "",
  maps: {
  lat: 38.4286098,
  long: -122.8444916
  },
  varietals: [
  "Chardonnay, Pinot Noir, Rose'"
  ]
});

wineMapList.push({
  title: 'Bethany & Bryan in Healdsburg',
  createdDate: '9/18/17',
  scheduleDate: '10/21/17',
  startTime: 'Noon',
  endTime: '4:00pm',
  wineRegion: 'Dry Creek',
  startLocation: {
  lat: 38.610265,
  long: -122.8720387
  },
  endLocation: {
    lat: 37.7851801,
    long: -122.4379697
  }
});

wineMapList.push({
  title: 'Best Friend Crew',
  createdDate: '9/18/17',
  scheduleDate: '11/2/17',
  startTime: '10:00AM',
  endTime: '4:00pm',
  wineRegion: 'Alexander Valley',
  startLocation: {
  lat: 38.610265,
  long: -122.8720387
  },
  endLocation: {
    lat: 37.7851801,
    long: -122.4379697
  }
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

db.WineMap.remove({}, function(err, wineMaps){
  db.WineMap.create(wineMapList, function(err, wineMaps) {
    if (err) {
      return console.log('Error', err);
    }
    console.log('All WineMaps: ', wineMaps);
    console.log('Created ', wineMaps.length, ' WineMaps');
    process.exit();
  });
});
