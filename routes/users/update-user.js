//PATCH  user by id picture 
const formidable = require("formidable");
const detect = require("detect-file-type"); // used to detect the image type
const { v1: uuidv1 } = require("uuid"); //to create a unique id for the image
const fs = require("fs"); //import filesystem
const path = require("path");
const { Db } = require("mongodb");


const ObjectID = require("mongodb").ObjectID;

module.exports = (req, res) => {
    // res.send('You have reached the update a user by id route it works!!!');
    const form = formidable.IncomingForm(); //create the form variable wich creates an isntance of an HTML form
    form.parse(req, (err, fields, files) => {
        //files can be a type of array if there are multiple files
        if (err) {
            return res.send("Error in file(s)");
        }
        
        detect.fromFile(files.picture.path, (err, result) => {

            const pictureName = uuidv1() + "." + result.ext;
            const allowedImageTypes = ["jpg", "jpeg", "png"]; //List of allowed image ext
            if (!allowedImageTypes.includes(result.ext)) {
                return res.send("Image not allowed");
            }
            //this helps us move the image from old path to new path
            const oldPath = files.picture.path;
            const newPath = path.join(__dirname, "..", "..", "pictures", pictureName); //sending the oldPath to the pictures folder in the directory
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.log("can not move file");
                    return;
                }

                // this part below saves the user data to mongodb
                const user = {
                    firstName: fields.firtsName,
                    lastName: fields.lastName,
                    number: fields.number,
                    picture: pictureName,
                };
                //PATCH   users/:id update user id 
                //Find one user in the company collection and update his profile:
                try {
                    const id = new ObjectID(req.params.id);
                    const newvalues = { $set:  { firstName: user.firstName, lastName: user.lastName, number: user.number, picture: user.picture  }};
                    db.collection("users").updateOne({ _id: id }, newvalues, (err, result) => {
                        if (err) throw err;
                        console.log(result);
                        return res.send(result);
                    });
                } catch (ex) {
                    return res.status(500).send("System under update");
                }
            });
        });
    });
}; // end module
