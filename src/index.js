import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware to verify token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      errors: "Access denied!, token required",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        errors: "Invalid or expired token",
      });
    }
    req.user = user;
    next();
  });
};

//login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== "admin" && password !== "password") {
    return res.status(401).json({
      errors: "invalid username or password",
    });
  }
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
});

//protected route
app.get("/protected", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "You are authorized to access this route",
    data: req.user,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
