
const userModel = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUserAlready = await userModel.findOne({ email });
    if (isUserAlready) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await userModel.hashPassword(password); // Make sure this method exists!
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken(); // Make sure this method exists on the model
    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Signup Error:", err); // Log full error for debugging
    res.status(400).json({ error: "Signup failed", details: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
