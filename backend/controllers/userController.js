import userModel from "../models/user-model.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET)
}


const loginUser = async (req,res) =>{
    try {
        const {email ,password} = req.body;
         const user = await userModel.findOne({email});

         if(!user){
            return res.status(400).json({ success: false, message: "user does not exits." });
         }
         const isMatch = await bcrypt.compare(password,user.password);
         if(isMatch){
            const token =createToken(user._id);
            res.json({success:true,token})
         }
        else{
            res.json({success:false,message:"invalid credentials"});
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Input validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please provide a valid email." });
        }

        if (!password || password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long." });
        }

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists with this email." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.status(201).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_MAIL && password === process.env.ADMIN_PASSWORD) {
      const payload = { email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.json({ success: true, token });
    } else {
      return res.status(401).json({ success: false, message: "Enter correct credentials" });
    }

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export {loginUser ,registerUser , adminLogin}