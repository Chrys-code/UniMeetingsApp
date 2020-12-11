const express = require("express");
const router = express.Router();
const Org = require("../models/school");
const OrgSession = require("../models/orgsession.js");

//////////////////////////////////////
// Sign-up (School privilege fro their students)
//////////////////////////////////////
// School sign up: Inserted into DB upon negotiation / contract
//////////////////////////////////////

//////////////////////
// Sign-In
//////////////////////

router.post("/signin", (req, res, next) => {
  const { body } = req;
  const { orgPassword, orgId } = body;

  if (!orgPassword) {
    return res.send({
      success: false,
      message: "Error: Name cannot be blank.",
    });
  }

  if (!orgId) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank.",
    });
  }

  Org.find(
    {
      _id: orgId,
      password: orgPassword,
    },
    (err, orgs) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Internal server error",
        });
      } 

      if (orgs.length !=1) {
        return res.send({
          success: false,
          message: "Error: Invalid username",
        });
      }

      const org = orgs[0];
      if (!org.validPassword(orgPassword)) {
        return res.send({
          sucess: false,
          message: "Error: Invalid Username or Password!",
        });
      }


      //signin
      const newOrgSession = new OrgSession();
      newOrgSession.orgId = orgId;
      newOrgSession.save((err, doc)=> {
        if (err) {
          return res.send({
            sucess: false,
            message: "Error: Internal server error when trying to create Org session.",
          });
        }

        return res.send({
          success: true,
          message: "Valid sign in",
          token: doc._id,
          id: orgId,
        });
      })
    }
  );
});

//////////////////////
// Verify user
// For organization there is no auto sign in...
// Actions still require valid org session
//////////////////////
router.get("/verify", (req, res, next) => {
    const { query } = req;
    const { token } = query;
  
    OrgSession.find(
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
            message: "OrgSession is active",
          });
        }
      }
    );
  });
  
  
  //////////////////////
  // Logout
  //////////////////////
  
  router.get("/logout", (req, res, next) => {
    const { query } = req;
    const { token } = query;
  
    OrgSession.findOneAndUpdate(
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
            message: "Error: OrgSession session could not be terminated",
          });
        }
  
        return res.send({
          success: true,
          message: "Success: OrgSession successfully terminated",
        });
      }
    );
  });
  
  module.exports = router;
  