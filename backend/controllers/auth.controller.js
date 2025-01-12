import User from "../models/user.model.js";

export const loginUser = async(req,res) =>{
 console.log("Login User");
 res.send("Login user")
 
}



export const signupUser= async(req,res) =>{
    try {
        const {fullname,username,password,confirmPassword,gender} = req.body;
        
        if(password !== confirmPassword)
        {
            return res.status(400).json({
                error:"Passwords doesn't match",

            })
        }
        
        const user = await User.findOne({username});
        if(user)
        {
            return res.status(400).json({
                error:"Username already exists",

            })
        }
        
        // hashing password


        const boyProfilePic= `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic= `https://avatar.iran.liara.run/public/girl?username=${username}`
         
        const newUser = new User({
           fullname,
           username,
           password,
           gender,
           profilePic : gender==="male"? boyProfilePic : girlProfilePic
        })
        
        await newUser.save();
        
        
        
    } catch (error) {
        res.status(500).send({
            message:"Internal Error",
            error
        })
    }


}



export const logoutUser = async(req,res) =>{
    console.log("Logout user");
    res.send("Logout user")

}