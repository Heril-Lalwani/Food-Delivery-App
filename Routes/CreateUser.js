const express = require("express");
const router = express.Router();
const User = require("../Login/models/User");
const { body, validationResult } = require("express-validator");


const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtsecret = "thisisweremuchsecretkeythatusershouldnotgetaccesstoit";



router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt)
    

    try {
      const newUser = new User({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });

      await newUser.save();
      res.json({ success: true });

    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  }
);

router.post("/loginuser", [
  body("email").isEmail(),
  body("password").isLength({ min: 5 })
], async (req, res) => {
  // Validate the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let email = req.body.email;
  try {
    // Find the user by email
    let userdata = await User.findOne({ email });
    if (!userdata) {
      return res.status(400).json({ errors: "Try Login with correct credentials" });
    }

    // Compare the provided password with the stored hash
    const pwdCompare = await bcrypt.compare(req.body.password, userdata.password);
    if (!pwdCompare) {
      return res.status(400).json({ errors: "Try Login with correct credentials" });
    }

    // Create the JWT payload
    const data = {
      user: {
        id: userdata.id
      }
    };

    // Sign and return the JWT
    const authToken = jwt.sign(data, jwtsecret);  // jwtsecret should be defined in your environment
    return res.json({ success: true, authToken: authToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});


module.exports = router;
