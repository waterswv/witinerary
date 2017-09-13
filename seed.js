let db = require('./models');

let wineryList = [];

wineryList.push({
  name: 'Unti',
  description: 'Dry Creek Winery',
  url: 'https://www.untiwines.com',
  fullAddress: '1234 Healdsburg Ave Healdsburg, CA',
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
    lat: 37.7594696,
    long: -122.4248613
  }
});

wineryList.push({
  name: 'Roth',
  description: 'Alexander Valley Winery',
  url: 'https://www.rothestatewines.com',
  fullAddress: '1234 Main Ave Windsor, CA',
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
    lat: 37.7594696,
    long: -122.4248613
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
