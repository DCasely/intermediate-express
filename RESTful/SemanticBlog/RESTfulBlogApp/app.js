var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  app = express();

// APP CONFIG
mongoose.connect('mongodb://localhost/restful_blog_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

var Blog = mongoose.model('Blog', blogSchema);

// RESTFUL ROUTES

app.get('/', function(req, res) {
  res.redirect('/blogs');
});

app.get('/blogs', function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log('ERROR!');
    } else {
      res.render('index', { blogs: blogs });
    }
  });
});

app.listen(3000, function() {
  console.log('SERVER IS RUNNING ON PORT 3000');
});
