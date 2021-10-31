//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const User = require('./models/user');
const connectDB = require('./config/connectDb');

const homeStartingContent = "In this modern era, sources of non-renewable energy are depleting rapidly due to excess use. Hence, Energy conservation has become prominent. To create awareness about this, we created this website. This page is for sharing various techniques and updates related to energy conservation. It is public and hence visible to every registered user. Go green... Happy conserving!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
connectDB();

let posts = [];

app.get('/', function (req, res) {
  res.render('login2');
});
app.post('/', async function (req, res) {
  try {
    var result = await User.find({
      email: req.body.em,
      password: req.body.pass,
    });
    if (!result) res.send('Try again!');
    res.render('dash');
  } catch (err) {
    console.log(err);
  }
});
app.get('/home', function (req, res) {
  res.render('home');
});
app.get('/achievements', function (req, res) {
  res.render('achievements');
});

app.get('/blog', function (req, res) {
  res.render('blog', {
    startingContent: homeStartingContent,
    posts: posts,
  });
});

app.get('/about', function (req, res) {
  res.render('about', { aboutContent: aboutContent });
});

app.get('/contact', function (req, res) {
  res.render('contact', { contactContent: contactContent });
});

app.get('/compose', function (req, res) {
  res.render('compose');
});

app.post('/compose', function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  posts.push(post);

  res.redirect('/');
});

app.get('/login', function (req, res) {
  res.redirect('/');
});

let creds = [];

var count = 0;
app.post('/login', function (req, res) {
  const cred = {
    uid: req.body.em,
    content: req.body.pass,
  };
  console.log(req.body.em);
  creds.forEach(function (pred) {
    if (pred.uid == cred.uid && pred.content == cred.content) {
      res.render('dash');
      count++;
    }
  });
  if (count == 0) res.send('/');
});

app.get('/register', function (req, res) {
  res.render('register');
});
app.post('/register', function (req, res) {
  var cred = {
    name: req.body.name,
    uid: req.body.email,
    content: req.body.password,
  };
  const newUser = new User({
    name: cred.name,
    email: cred.uid,
    password: cred.content,
  });
  newUser
    .save()
    .then(() => {
      res.render('login2');
    })
    .catch((err) => {
      console.log(err);
    });
});

var img = 0;
var year = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

app.get('/dash', function (req, res) {
  res.render('dash');
});
app.get('/posts', function (req, res) {
  res.render('blog');
});
app.get('/posts/:postName', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render('post', {
        title: post.title,
        content: post.content,
      });
    }
  });
});

var i = 6;
app.post('/dash', function (req, res) {
  res.render('dash');
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});
