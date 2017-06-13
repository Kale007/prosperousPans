'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const jwtCheck = require('./middleware/auth');

//required to call ./cron.js file
// const Cron = require('./cron.js')

const app = express();

// var express = require('express');
// const app = require('../app');


// app.use(jwtCheck);

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(middleware.auth.session);
// app.use(middleware.passport.initialize());
// app.use(middleware.passport.session());
// app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

// *** FOR PASSPORT AUTH ***
// app.use('/', routes.auth);
// app.use('/', routes.api);
// app.use('/api', routes.api);
// app.use('/api/profiles', routes.profiles);

// *** FOR RETRIEVING USERS
app.use('/users', routes.users);
app.use('/get-profile', routes.getProfile);
app.use('/experience', routes.experience);

// *** FOR INSERTING NEW CONNECTIONS
app.use('/insert-connection', routes.insertConnection);
app.use('/check-match', routes.checkMatch);
app.use('/insert-reason', routes.insertReason);

// *** FOR DASHBOARD
app.use('/get-connect', routes.getConnect);

// *** FOR CHAT
app.use('/chat-list', routes.chat);
app.use('/profile-user', routes.profile);
app.use('/login', routes.login);



// *** FOR GRAPH DB
app.use('/create-graphDB', routes.createGraphDB)
app.use('/populate-full-graphDB', routes.populateFullGraphDB)
app.use('/recommendation', routes.recommendation)
app.use('/priority-recommendation', routes.priorityRecommendation)

// *** GET MATCHES THROUGH GRAPH DB AND POSTGRES
app.use('/get-matches', routes.getMatches)

module.exports = app;
