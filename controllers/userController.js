import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import Job from "../models/JobModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const updateUser = async (req, res) => {
  console.log(req.file);
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const uploadedImage = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);

    newUser.avatar = uploadedImage.secure_url;
    newUser.avatarPublicId = uploadedImage.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "user updated" });
};
