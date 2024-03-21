import Reward from "../models/Reward.js";

import expressAsyncHandler from "express-async-handler";

const addReward = expressAsyncHandler(async (req, res) => {
  const userExists = await Reward.findOne({ user: req.user._id });
  console.log(userExists);

  if (userExists) {
    if (userExists) {
      userExists.reward += 20;
      await userExists.save();
      return res.status(200).json({ message: "Added Bro" });
    } else {
      return res.status(200).json({ message: "not added" });
    }
  } else {
    return res.status(400).json({ message: "not found" });
  }
});

const redemeReward = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  const userExists = await Reward.findOne({ user: userId });

  if (userExists) {
    userExists.reward -= 200;
    await userExists.save();
    return res.status(200).json({
      message: "Reward is Claimed!",
    });
  } else {
    return res.status(400).json({ message: "user not found" });
  }
});

export { addReward, redemeReward };
