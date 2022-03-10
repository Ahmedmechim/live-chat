const User = require("../models/user");
let config = require("config");
let secret = config.get("secret");
let bc = require("bcryptjs");
let jwt = require("jsonwebtoken");

// create a user
exports.signUp = async (req, res) => {
    let { userName, email, password, role } = req.body;
    let isExist = await User.findOne({ email });
    if (isExist) {
      res.status(400).json({ msg: "try an other email" });
    }
    try {
      let newUser = new User({ userName, email, password, role });
      if(password){
        let salt = await bc.genSalt(10);
      let hash = await bc.hashSync(password, salt);
      newUser.password = hash;
      }
      await newUser.save();
      let payload = {
        id: newUser._id,
        userName: newUser.userName,
      };
      let token = jwt.sign(payload, secret);
      res.send({ token, newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // login
exports.login=async(req,res)=>{
    let {email,password}=req.body
    try {
        let thisUser=await User.findOne({email})
        if(!thisUser){
            res.status(400).json({msg:"email or password incorrect"})
        }
        if(thisUser.password){
          let isMatch= await bc.compare(password,thisUser.password)
          if(!isMatch){
              res.status(400).json({msg:"email or password incorrect"})
          }
        }
        let payload={
            id:thisUser._id,
            role:thisUser.role
        }
        let token = jwt.sign(payload,secret)
        res.send({
            token,
            thisUser
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// get a user
exports.getUser=async(req,res)=>{
    res.send(req.user)
  }
  