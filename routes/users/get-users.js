module.exports = (req, res) => {
    // res.send('You have reached the get all users route it works');

    //GET  users get all users
    //Find all users in the company collection:
    db.collection("users")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            return res.send(result);
        });
}; // end module
