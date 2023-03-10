const express = require("express");
const routers = express.Router();
const User = require("../models/usermodel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "chinmayisagoodboy";
const fetchuser = require("../middware/fetch");

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
routers.post(
  "/",
  // validation using expresss validator
  body("name", "Enter valid name").isLength({ min: 3 }),
  body("email", "Enter a valid password").isEmail(),
  body("password", "Password must be at least 5 character").isLength({
    min: 5,
  }),
  async (req, res) => {
    try {
      let sucess= false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ sucess:false,errors: errors.array() });
      }

      //  Hash the password
      const salt = await bcrypt.genSalt(10);
      const myPlaintextPassword = await req.body.password;
      const hashpass = await bcrypt.hash(myPlaintextPassword, salt);
      // create new user
      const result = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashpass,
      });

      // jwt  data

      const data = {
        result: {
          id: result.id,
        },
      };

      const autotoken = jwt.sign(data, JWT_SECRET);
      console.log(result);
      //  res.status(200).send(result)
      res.status(200).json({sucess:true,autotoken});
    } catch (e) {
      console.log(e);
      res.status(500).json({error:"Internal Server Error"});
    }
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required

routers.post(
  "/login",
  [
    body("email", "Enter a valid password").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        
        return res.json({success,error:"please try to login with valid credential"});
      }

      const comparepassword =  await bcrypt.compare(password, user.password);
      if (!comparepassword) {
        
        return res.json({success,error:"please try to login with valid credential"});
      }
      // jwt  data

      const data = {
        user: {
          id: user.id,
        },
      };

      const autotoken = jwt.sign(data, JWT_SECRET );
      //  res.status(200).send(result)
      success = true;
      res.status(200).json({ success, autotoken });
    } catch (e) {
      res.status(500).json({error: "Internal Server Error"});
    }
  }
);

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
routers.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = routers;
