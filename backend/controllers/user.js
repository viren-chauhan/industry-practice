const User = require("../model/user");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    //create a Token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    //create a Token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {}
  res.status(200).json({ error: error.message });
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      throw Error("User Not Found!");
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { signupUser, loginUser, getUsers };
