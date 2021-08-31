const jwt = require("jsonwebtoken");

exports.authenticationCheck = async (req) => {
  try {
    if (!req.headers.authorization) return { userId: null, isAuthenticated: null };

    const token = req.headers.authorization.split(" ")[1];

    const tokenVerification = await jwt.verify(token, process.env.SECRET_KEY_JWT);

    if (!tokenVerification) return { userId: null, isAuthenticated: null };

    return { userId: tokenVerification.userId, isAuthenticated: true };
  } catch (error) {
    console.log(error);
    return { userId: null, isAuthenticated: null };
  }
};
