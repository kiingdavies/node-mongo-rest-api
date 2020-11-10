const express = require('express');
const app = express();
const path = require('path');
const mongoClient = require("mongodb").MongoClient;

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
const rPostUsers = require(path.join(__dirname, "routes", "users", "post-users.js"));
app.post('/users', rPostUsers);

/*
GET     users               get all users
GET     users/1             get user with id of 1
DELETE  users            delete all users
DELETE  users/1          delete user id 1
PATCH   users/1           update user id 1
*/
app.listen(80, err => {
    if (err) { console.log("Server error"); return }
    console.log("Server listening on PORT 80...");
})