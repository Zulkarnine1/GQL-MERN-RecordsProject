const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.login = async (_, args, context) => {
  try {
    const { email, password } = args;

    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Invalid input data.");

    let passMatched = await bcrypt.compare(password, user.password);
    if (!passMatched) throw new Error("Invalid input data.");

    let processedUser = { ...user._doc, _id: user.id, password: null };

    const token = await jwt.sign({ userId: user.id }, process.env.SECRET_KEY_JWT, { expiresIn: "24h" });

    return { token, tokenExpiration: 24, user: processedUser };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.createUser = async (_, args, context) => {
  try {
    const { email, name, password } = args.user;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) throw new Error("Invalid input data.");

    const hashedPass = await bcrypt.hash(password, 12);

    const newUser = new User({ email, password: hashedPass, name, records: [] });
    await newUser.save();

    let processedUser = { ...newUser._doc, _id: newUser.id, password: null };

    const token = await jwt.sign({ userId: user.id }, process.env.SECRET_KEY_JWT, { expiresIn: "24h" });

    return { token, tokenExpiration: 24, user: processedUser };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
