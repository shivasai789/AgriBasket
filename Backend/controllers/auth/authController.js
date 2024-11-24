const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user)
      return res.json({
        success: false,
        message:
          "User Alreay exists with the same email! Please try again with another email",
      });

    const hashedPassword = await bcrypt.hash(password, 15);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration Successfull",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.json({
        success: false,
        message: "Invalid Password! Please try again",
      });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.username
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    // res.cookie("token", token, { httpOnly: true, secure: true }).json({
    //   success: true,
    //   message: "Logged in Successfully",
    
    // }); 

    res.status(200).json({
      success: true,
      message: 'Logged in Successfully',
      token,
      user: {
        email: user.email,
        role: user.role,
        id: user._id,
        userName: user.username
      },
    })


  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout
const logoutUser = async (req,res) => {
  res.clearCookie('token').json({
    success: true,
    message: "Logged out Successfully!",
  })
}

//auth middleware
// const authMiddleware = async (req,res,next) => {
//   const token = req.cookies.token;
//   if(!token){
//     return res.json({
//       success: false,
//       message: "Unauthorized User!",
//     })
//   }

//   try{
//     const decoded = jwt.verify(token,'CLIENT_SECRET_KEY');
//     req.user = decoded;
//     next()
//   }
//   catch(error){
//     res.status(401).json({
//       success: false,
//       message: "Unauthorized User!",
//     })
//   }
// }

const authMiddleware = async (req,res,next) => {
  const authHeader = req.headers.authorization 
  const token = authHeader && authHeader.split(" ")[1]
  if(!token){
    return res.json({
      success: false,
      message: "Unauthorized User!",
    })
  }

  try{
    const decoded = jwt.verify(token,'CLIENT_SECRET_KEY');
    req.user = decoded;
    next()
  }
  catch(error){
    res.status(401).json({
      success: false,
      message: "Unauthorized User!",
    })
  }
}

module.exports = { registerUser,loginUser,logoutUser,authMiddleware };
