import bcrypt from 'bcryptjs';
import express, { Express, Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import generateTokenAndSetCookie from '../utils/generateToken';
import { ServerError } from '../types/types';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      throw new Error('All fields are required');
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate JWT token
      generateTokenAndSetCookie(newUser._id.toString(), res);
      await newUser.save();

      res.locals.signup = {
        _id: newUser._id,
        fullNam: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      };

      console.log(res.locals.signup);
      return next();
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    return next({
      log: `Error in the authController.newUsers: ${error}`,
      status: 500,
      message: {
        err: `Unable to create new user, check logs for more details.`,
      },
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || '',
    );

    if (!user || !isPasswordValid) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    return next({
      log: `Error in the authController.login: ${error}`,
      status: 500,
      message: {
        err: `Unable to create login, check logs for more details.`,
      },
    });
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.locals.logout = 'Logout';
  return next();
};
