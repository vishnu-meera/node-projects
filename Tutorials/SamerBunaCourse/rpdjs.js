var rdp = require('node-rdp');
 
rdp({
  address: '10.7.44.20',
  username: 'reicorpnet\vsanka2',
  password: 'Rei@2017'
}).then(function() {
  console.log('At this, point, the connection has terminated.');
});

