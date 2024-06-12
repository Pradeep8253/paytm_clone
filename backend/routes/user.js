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

// update routes

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
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

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

export default router;
