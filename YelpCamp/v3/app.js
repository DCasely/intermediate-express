var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Campground = require('./models/campground'),
  seedDB = require('./seeds2');

seedDB();
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Campground.create(
//   {
//     name: 'Granite Hill',
//     image:
//       'https://pixabay.com/get/52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c7d2d7ad5974ecc58_340.jpg',
//     description:
//       'This is a huge granite hill, no bathrooms. No water. Beautiful granite!'
//   },
//   function(err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('NEWLY CREATED CAMPGROUND');
//       console.log(campground);
//     }
//   }
// );

app.get('/', function(req, res) {
  res.render('landing');
});

// INDEX - show all campgrounds
app.get('/campgrounds', function(req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { campgrounds: allCampgrounds });
    }
  });
});

// CREATE - add new campground to DB
app.post('/campgrounds', function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc };
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect('/campgrounds');
    }
  });
});

// NEW - show form to create new campground
app.get('/campgrounds/new', function(req, res) {
  res.render('new.ejs');
});

// SHOW - shows more info about one campground
app.get('/campgrounds/:id', function(req, res) {
  // find the campground with provided ID
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      // render show template with that campground
      res.render('show', { campground: foundCampground });
    }
  });
});

app.listen(3000, function() {
  console.log('LISTENING ON PORT 3000');
});
