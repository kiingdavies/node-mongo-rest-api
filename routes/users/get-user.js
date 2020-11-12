const ObjectID = require("mongodb").ObjectID;

module.exports = (req, res) => {
    // res.send('You have reached the get a user by id route it works');

    //GET     users/1  get user with id of 1
    //Find one user in the company collection:
    try {
        const id = new ObjectID(req.params.id);
        db.collection("users").findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            console.log(result);
            return res.send(result);
        });
    } catch (ex) {
        return res.status(500).send("System under update");
    }
}; // end module
