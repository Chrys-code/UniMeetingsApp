const express = require("express");
const router = express.Router();
const User = require("../models/student");

//////////////////////////////////////
// Sign-up (School privilege fro their students)
//////////////////////////////////////

router.post("/signup", (req, res, next) => {
  const { body } = req;
  console.log("body", body);

  const { name, password, schoolId } = body;

  if (!schoolId) {
    return res.send({
      success: false,
      message: "Error: SchoolId cannot be blank.",
    });
  }
  if (!name) {
    return res.send({
      success: false,
      message: "Error: Name cannot be blank.",
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank.",
    });
  }

  User.find(
    {
      name: name
    },
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Can't find user",
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error: Username are already in use",
        });
      }

      //Save new user
      const newUser = new User();
      newUser.name = name;
      newUser.schoolId = schoolId;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Error saving user",
          });
        }
        return res.send({
          success: true,
          message: "Signed up",
        });
      });
    }
  );
});


module.exports = router;
