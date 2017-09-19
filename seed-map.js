let db = require('./models');

let wineMapList = [];


wineMapList.push({
  title: 'Bethany & Bryan in Healdsburg',
  createdDate: '9/18/17',
  scheduleDate: '10/21/17',
  startTime: 'Noon',
  endTime: '4:00pm',
  wineRegion: 'Dry Creek'
});

wineMapList.push({
  title: 'Best Friend Crew',
  createdDate: '9/18/17',
  scheduleDate: '11/2/17',
  startTime: '10:00AM',
  endTime: '4:00pm',
  wineRegion: 'Alexander Valley'
});
// wineryList.forEach(function(winery){
//
// });


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
