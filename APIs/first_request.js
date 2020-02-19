// const request = require('request');
// request('http://www.google.com', function(error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

console.log('Sunset in Hawaii is at...');
var request = require('request');
request('http://www.yahoo.com', function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var parsedData = JSON.parse(body);
    console.log(
      parsedData['query']['results']['channel']['astronomy']['sunset']
    );
  }
});
