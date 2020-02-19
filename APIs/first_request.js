// const request = require('request');
// request('http://www.google.com', function(error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

// const request = require('request');
const rp = require('request-promise');

rp('https://jsonplaceholder.typicode.com/users/1')
  .then(body => {
    const parsedData = JSON.parse(body);
    console.log(`${parsedData.name} lives in ${parsedData.address.city}.`);
  })
  .catch(err => {
    console.log('Error!', err);
  });
