const express = require("express");
const school = require("../models/school");
const router = express.Router();
const User = require("../models/student");
const UserSession = require('../models/usersession');

//////////////////////////////////////
// Sign-up (School privilege fro their students)
//////////////////////////////////////

router.post("/account/signup", (req, res, next) => {
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
          message: "Error: User credentials are already in use",
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


//////////////////////
// Sign-In
//////////////////////
router.post("/account/signin", (req, res, next) => {
  const { body } = req;
  const { name, password, schoolId } = body;

  if (!schoolId) {
    return res.send({
      success: false,
      message: "Error: Organization cannot be blank.",
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
      name: name,
      schoolId: schoolId,
    },
    (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Internal server error",
        });
      }
      if (users.length != 1) {
        return res.send({
          sucess: false,
          message: "Error: Invalid username",
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          sucess: false,
          message: "Error: Invalid Username or Password!",
        });
      }

      const newUserSession = new UserSession();
      newUserSession.userId = user._id;
      newUserSession.save((err, doc) => {
        if (err) {
          return res.send({
            sucess: false,
            message: "Error: Internal server error when trying to create User session.",
          });
        }

        return res.send({
          success: true,
          message: "Valid sign in",
          token: doc._id,
          id: user._id,
          schoolId: user.schoolId
        });
      });
    }
  );
});

//////////////////////
// Verify User
//////////////////////
router.get("/account/verify", (req, res, next) => {
  const { query } = req;
  const { token } = query;

  UserSession.find(
    {
      _id: token,
      isDeleted: false,
    },
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Invalid Token",
        });
      }

      const session = sessions[0];
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: "Error: User already logged in.",
        });
      } else {
        return res.send({
          success: true,
          userId: session.userId,
          message: "good",
        });
      }
    }
  );
});


//////////////////////
// Logout
//////////////////////

router.get("/account/logout", (req, res, next) => {
  const { query } = req;
  const { token } = query;

  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
      },
    },
    null,
    (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: "Error: User session could not be terminated",
        });
      }

      return res.send({
        success: true,
        message: "User session successfully terminated",
      });
    }
  );
});

module.exports = router;
