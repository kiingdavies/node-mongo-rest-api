const ObjectID = require("mongodb").ObjectID;

module.exports = (req, res) => {
    // res.send('You have reached the delete a user by id route it works!!!');

    //DELETE  users/:id delete user by id
    //Find one user in the company collection and delete his profile:
    try {
        const id = new ObjectID(req.params.id);
        db.collection("users").deleteOne({ _id: id }, (err, result) => {
            if (err) throw err;
            console.log(result);
            console.log(`User with id: ${id} has been deleted successfully`);
            return res.send(result);
            
        });
    } catch (ex) {
        return res.status(500).send("System under update");
    }
}; // end module
