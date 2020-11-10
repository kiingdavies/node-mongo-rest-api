//POST    users   create users
const formidable = require("formidable");
const detect = require("detect-file-type"); // used to detect the image type
const { v1: uuidv1 } = require("uuid"); //to create a unique id for the image
const fs = require("fs"); //import filesystem
const path = require("path");
const { Db } = require("mongodb");

module.exports = (req, res) => {
    const form = formidable.IncomingForm(); //create the form variable wich creates an isntance of an HTML form
    form.parse(req, (err, fields, files) => {
        //files can be a type of array if there are multiple files
        if (err) {
            return res.send("Error in file(s)");
        }
        // console.log(`name: ${fields.name}`); //A
        // console.log(`lastName: ${fields.lastName}`); //AA
        // console.log(`picture: ${files.picture.path}`); //path to the image to upload
        detect.fromFile(files.picture.path, (err, result) => {
            // console.log(result.ext); //gives us the image extension
            // console.log(result.mime); //gives us the image mime i.e type is it image or mp4
            //console.log(pictureName); //This should geneerate <unique image id>.ext (bfccbd70-233f-11eb-be77-bbc3d0e588bd.png)
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
                    name: fields.name,
                    lastName: fields.lastName,
                    picture: pictureName,
                };
                try {
                    db.collection("users").insertOne(user, (err, dbResponse) => {
                        if (err) {
                            return res.send("mongo can not create user");
                        }
                        return res.send("ok here");
                    });
                } catch (ex) {
                    return res.status(500).send("System under update");
                }
            });
        });
    });
}; // end module
