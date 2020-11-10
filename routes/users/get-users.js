//GET  users get all users
module.exports = (req, res) => {
    // res.send('You have reached the get all users route it works');

    //Find all users in the company collection:
    db.collection("users")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            return res.send(result);
        });

        //Find one user in the company collection:
        // db.collection("user").findOne({}, function(err, result) {
        //     if (err) throw err;
        //     console.log(result.firstName);
        //     return res.send(result.firstName);
        //   });
}; // end module
