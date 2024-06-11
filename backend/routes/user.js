import express from "express";
import zod from "zod";
import User from "./../db.js";
import jwt from "jsonwebtoken";
import JWT_SECRET from "./../config.js";

const router = express.Router();

// signUp and signIn routes
const signUpSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signUpSchema.safeParse(body);
  if (!success) {
    res.json({
      message: "Email already registered / invalid inputs",
    });
  }

  const user = User.findOne({
    username: body.username,
  });

  if (user._id) {
    res.json({
      message: "Email already registered",
    });
  }

  const newUser = await User.create(body);
  const token = jwt.sign(
    {
      userId: newUser._id,
    },
    JWT_SECRET
  );
  res.json({
    message: "User created successfully",
    token: token,
  });
});

export default router;
