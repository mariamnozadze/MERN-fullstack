const express = require("express");
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult } = require("express-validator");

const User = require('../../models/User');

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring
    const {name, email, password} = req.body;

    try {       
    // See if the user exists
    let user = await User.findOne({email});
    if(user) {
        res.status(400).json({errors: [{msg: 'User already exists'}]});
    }

    // Get users gravatar
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    });

    //this not saves it to db, creates only an instance
    user = new User({
        name,
        email,
        avatar,
        password
    })

    // Encrypt passwords

    // Return jsonwebtoken 

    res.send("User route");
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
  }
);

module.exports = router;
