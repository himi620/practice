import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate input fields
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await User.create({ fullName, email, password: hashedPassword });

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error in user registration:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Login successful
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Login successful",
      });
  } catch (error) {
    console.error("Error in user login:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const logout = async (_, res) => {
  try{
    return res.status(200).cookie("token"," ",{maxAge:0}).json({
      success: true,
      message: "Logout successful",
    });
  }catch(error){
    console.error("Error in user logout:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}