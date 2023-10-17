const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require('../../models/User')

// @route     GET api/auth
// @desc      Test route
// @access    Public

router.get("/", auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     POST api/auth
// @desc      Authenticate user & get token
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
      const { name, email, password } = req.body;
  
      try {
        // See if the user exists
        let user = await User.findOne({ email });
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exists" }] });
        }
  
        // Get users gravatar
        const avatar = gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm",
        });
  
        //this not saves it to db, creates only an instance
        user = new User({
          name,
          email,
          avatar,
          password,
        });
  
        // Encrypt passwords
  
        // Generate a cryptographic salt using bcrypt.
        const salt = await bcrypt.genSalt(10);
  
        //Hash the user's password using bcrypt with the generated salt.
        user.password = await bcrypt.hash(password, salt);
  
        await user.save();
  
        // Return jsonwebtoken
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 999999 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  ); 

module.exports = router;
