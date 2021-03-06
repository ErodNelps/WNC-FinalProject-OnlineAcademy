const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../model/userModel");
const passport = require("passport");
const nodemailer = require("nodemailer");



var genOTP = Math.random();
genOTP = genOTP * 1000000;
genOTP = parseInt(genOTP);

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 456,
  secure: false,
  service : 'Gmail',
  
  auth: {
    user: 'onlineacademy906@gmail.com',
    pass: 'thuong99',
  }
  
});

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, firstName, lastName, otp } = req.body;
    // validate
    otp = parseInt(otp);
    if (!email || !password || !passwordCheck || !otp)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if(otp !== genOTP)
      return res.status(400).json({msg: "Invalid OTP."})
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    if (!firstName) { firstName = email; }
    if (!lastName) { lastName = ""; }

    const newUser = new User({
      email,
      password: passwordHash,
      firstName,
      lastName,
      role: "student"
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    console.log("not pass");
    res.status(500).json({ error: err.message });
  }
});

router.post("/register/sendOTP", async(req, res) => {
  let {email} = req.body;
  if (!email)
      return res.status(400).json({ msg: "Email must be entered." });
  var mailOptions={
    to: email,
    subject: "Otp for registration is: ",
    html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + genOTP +"</h1>" // html body
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
});


router.post("/admin/add-new-user", async (req, res)=>{
  try {
    let { email, password, passwordCheck, firstName, lastName } = req.body;
    
    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    if (!firstName) { firstName = email; }
    if (!lastName) { lastName = ""; }

    const newUser = new User({
      email,
      password: passwordHash,
      firstName,
      lastName,
      role: "lecturer"
    });
    
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put("/change-email/:userid", async (req, res) => {
  let {email} = req.body
  try{
    if (!email)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    var mailOptions={
      to: email,
      subject: "Online Academy: Email Changed",
      html: "<h3>This is just to confirm a real email. Click the link below to confirm change. If it's not you, you can ignore this.</h3>"  + "<h1 style='font-weight:bold;'></h1>" +"<a>http://localhost:8080/users/confirmation/emailchanged?userid="+req.params.userid+"&email="+email+"</a>" // html body
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(400).json({ msg: 'Failed to send a confirmation email'});
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Info: %s', info);
    });

    
  } catch(err){
        res.status(500).json({ msg: err.message });
    } 
  
});

router.get("/confirmation/emailchanged", auth, (req, res) => {
    console.log("confirmed")
    User.updateOne({_id: req.query.userid}, {$set: {email: req.query.email}}).then(res =>{
      res.status(200).json(res);
    })
})

router.put("/change-name/:userid", async (req, res) => {
  let {firstName, lastName} = req.body
  try{
    if (!firstName || !lastName)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    User.updateOne({_id: req.params.userid},  {$set: {firstName: firstName, lastName: lastName}}).then(res =>{
      res.status(200).json(res);
    })
  } catch(err){
        res.status(500).json({ error: err.message });
    } 
});

router.put("/change-password/:userid", async (req, res) => {
  let {oldPassword, newPassword} = req.body
  try{
    const user = await User.findOne({ _id: req.params.userid });
    if (!user) return res.status(400).json({ msg: "User does not exist." });
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const salt = await bcrypt.genSalt();
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    User.updateOne({_id: req.params.userid},  {$set: {password: newPasswordHash}}).then(res =>{
      res.json(res);
    })
  } catch(err){
        res.status(500).json({ msg: err.message });
    } 
});

router.post("/register/resendOTP", async(req, res) => {
  let {email} = req.body;
  if (!email)
      return res.status(400).json({ msg: "Email must be entered." });

  genOTP = Math.random();
  genOTP = genOTP * 1000000;
  genOTP = parseInt(genOTP);
  var mailOptions={
    to: email,
    subject: "Otp for registration is: ",
    html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + genOTP +"</h1>" // html body
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/dashboard", auth, async(req, res) =>{
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
    email: user.email,
    password: user.password,
    role: user.role,
  })
});

router.get("/get-users-list", async (req, res) => {
  await User.find({}, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json(data);
  });
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email:user.email,
    id: user._id,
    role: user.role,
  });
});

router.get("/:id", async (req, res) => {
  const user = await User.findOne({_id: req.params.id});
  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email:user.email,
    id: user._id
  });
});

// router.get("/course/:id", auth, async (req, res) => {
//   const user = await User.findById(req.user);
//   res.json({
//     firstName: user.firstName,
//     lastName: user.lastName,
//     email:user.email,
//     id: user._id,
//     role: user.role,
//   });
// });

//watchlist

module.exports = router;