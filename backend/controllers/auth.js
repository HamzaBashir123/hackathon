import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

//////////////////////        Sign Up   //////////////////////
export const signup = async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (error) {
    next(error);
  }
};

//////////////////////        Sign in   //////////////////////

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found"));
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong credentials"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({
        data: others,
        message: "User SignIn ",
      });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res) => {
  try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
          const token = jwt.sign({ id: user._id }, process.env.JWT);
          
          res.cookie("access_token", token, {
              httpOnly: true
          }).status(200).send({
              status: "Success",
              message: "User sign in successfully",
              data: user._doc
          });
      } else {
          const newUser = new User({
              ...req.body,
              fromGoogle: true
          })
          const saveUser = await newUser.save();
          const token = jwt.sign({ id: saveUser._id }, process.env.JWT);
          // console.log(token, "===> access token from signin");
          res.cookie("access_token", token, {
              httpOnly: true
          }).status(200).send({
              status: "Success",
              message: "User sign in successfully",
              data: saveUser._doc
          });
      }
  } catch (error) {
      res.status(400).send({
          status: "Fail",
          message: error.message
      })
  }
};

// export const googleAuth = async (req, res, next) => {
//   try {
//       const user = await User.findOne({ email: req.body.email });
//       if (user) {
//           const token = jwt.sign({ id: user._id }, process.env.JWT);
//           res
//               .cookie("access_token", token, {
//                   httpOnly: true,
//               })
//               .status(200)
//               .json(user._doc);
//       } else {
//           const newUser = new User({
//               ...req.body,
//               fromGoogle: true,
//           });
//           const savedUser = await newUser.save();
//           const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
//           res
//               .cookie("access_token", token, {
//                   httpOnly: true,
//               })
//               .status(200)
//               .json(savedUser._doc);
//       }
//   } catch (err) {
//       next(err);
//     }
// };