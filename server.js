const express = require('express');
const app = express();
const path = require('path');
const mongoClient = require("mongodb").MongoClient;

// const routes = require('express').Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

// ###################################
const mongoUrl = "mongodb://localhost:27017/";//connect to mongo server which is default 27017
global.db = ''; //global.db makes the db accessable globally
mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, res) => { //connection to mongo
    if (err) { console.log("Database error"); return }
    db = res.db('company'); //connection to the global.db which automatically creates a db in mongo called company
    console.log("Mongo Database listening on PORT 27017");
}); //

// ###################################
//variable for post-users (__dirname is pointing to the current file ie server.js)
// const rPostUsers = require(__dirname+"/routes/users/post-users.js");
//Post a new user
const rPostUsers = require(path.join(__dirname, "routes", "users", "post-users.js"));
app.post('/users', rPostUsers);

//Get one user by id route
const rGetUser = require(path.join(__dirname, "routes", "users", "get-user.js"));
app.get('/users/:id', jsonParser, rGetUser);

//update one user by id route
const rUpdateUser = require(path.join(__dirname, "routes", "users", "update-user.js"));
app.patch('/users/:id', jsonParser, rUpdateUser);

//Get all users route
const rGetUsers = require(path.join(__dirname, "routes", "users", "get-users.js"));
app.get('/users', rGetUsers);

//Delete one user by id route
const rDeleteUser = require(path.join(__dirname, "routes", "users", "delete-user.js"));
app.delete('/users/:id', jsonParser, rDeleteUser);

/*
DELETE  users/1          delete user id 1
DELETE  users            delete all users
*/
app.listen(80, err => {
    if (err) { console.log("Server error"); return }
    console.log("Server listening on PORT 80...");
})