var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
  {
    name: "Cloud's Rest",
    image:
      'https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c7d2d79dc904fc45e_340.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque. Aperiam incidunt labore sapiente aut ipsum aliquid enim delectus corporis dolore! Minus ad minima accusamus amet ullam nisi placeat est eligendi suscipit quaerat quae ducimus molestiae officiis fugit pariatur, maiores totam blanditiis? Quos expedita molestias non voluptates, odio natus saepe!'
  },
  {
    name: 'Desert Mesa',
    image:
      'https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e507441772d73d3954cc3_340.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque. Aperiam incidunt labore sapiente aut ipsum aliquid enim delectus corporis dolore! Minus ad minima accusamus amet ullam nisi placeat est eligendi suscipit quaerat quae ducimus molestiae officiis fugit pariatur, maiores totam blanditiis? Quos expedita molestias non voluptates, odio natus saepe!'
  },
  {
    name: 'Canyon Floor',
    image:
      'https://pixabay.com/get/57e0d6424b56ad14f6da8c7dda793f7f1636dfe2564c704c7d2d79dc904fc45e_340.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, eaque. Aperiam incidunt labore sapiente aut ipsum aliquid enim delectus corporis dolore! Minus ad minima accusamus amet ullam nisi placeat est eligendi suscipit quaerat quae ducimus molestiae officiis fugit pariatur, maiores totam blanditiis? Quos expedita molestias non voluptates, odio natus saepe!'
  }
];

function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('removed campgrounds!');
    // add a few campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log('added a campground');
          // create a comment
          Comment.create(
            {
              text: 'This place is great, but I wish there was internet',
              author: 'Homer'
            },
            function(err, comment) {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log('Created new comment');
              }
            }
          );
        }
      });
    });
  });

  // Add a few comments
}

module.exports = seedDB;
