import jwt from "jsonwebtoken";

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    const payload = {
      username: username,
      role: "admin",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "login successful",
      token: token,
    });
  } else {
    return res.status(401).json({
      errors: "invalid username or password",
    });
  }
};

const protectedRoute = (req, res) => {
  return res.status(200).json({
    message: "You are authorized to access this route",
    data: req.user,
  });
};

export default {
  login,
  protectedRoute,
};
