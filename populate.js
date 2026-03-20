import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Job from "./models/JobModel.js";
import User from "./models/UserModel.js";
import { hashPassword } from "./utils/passwordUtils.js";

try {
  await mongoose.connect(process.env.MONGO_URI);
  let user = await User.findOne({ email: "test@test.com" });

  if (!user) {
    const password = await hashPassword("secret123");

    user = await User.create({
      name: "Test User",
      email: "test@test.com",
      password,
      role: "user",
    });
  }

  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mock_data.json", import.meta.url))
  );

  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });

  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("Success!!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
