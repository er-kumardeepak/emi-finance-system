const User = require("../models/User");
const fallbackStore = require("../utils/fallbackStore");
const mongoose = require("mongoose");

const isMongoAvailable = () => mongoose.connection.readyState === 1;
const shouldUseFallback = (req) =>
  !isMongoAvailable() || !mongoose.Types.ObjectId.isValid(req.user?.id);

const canAccessUser = (req, userId) => {
  return req.user.role === "admin" || req.user.id === userId;
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    if (shouldUseFallback(req)) {
      return res.status(200).json(fallbackStore.listUsers());
    }

    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Get user by ID
const getUserById = async (req, res, next) => {
  try {
    if (!canAccessUser(req, req.params.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (shouldUseFallback(req)) {
      const user = fallbackStore.findUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...publicUser } = user;
      return res.status(200).json(publicUser);
    }

    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Create new user
const createUser = async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (shouldUseFallback(req)) {
      const existingUser = fallbackStore.findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use" });
      }

      const user = fallbackStore.createUser({
        name,
        email,
        phone,
        password,
        role: role || "staff",
      });
      const { password: savedPassword, ...publicUser } = user;

      return res.status(201).json({
        message: "User created successfully",
        user: publicUser,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const user = new User({ name, email, phone, password, role: role || "staff" });
    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

// Update user
const updateUser = async (req, res, next) => {
  try {
    if (!canAccessUser(req, req.params.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, email, phone } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = String(name).trim();
    if (email !== undefined) updateData.email = String(email).trim().toLowerCase();
    if (phone !== undefined) updateData.phone = String(phone).trim();

    if (shouldUseFallback(req)) {
      const user = fallbackStore.updateUser(req.params.id, updateData);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...publicUser } = user;
      return res.status(200).json({ message: "User updated successfully", user: publicUser });
    }

    if (updateData.email) {
      const existingEmail = await User.findOne({ email: updateData.email, _id: { $ne: req.params.id } });
      if (existingEmail) {
        return res.status(409).json({ message: "Email already in use" });
      }
    }

    if (updateData.phone) {
      const existingPhone = await User.findOne({ phone: updateData.phone, _id: { $ne: req.params.id } });
      if (existingPhone) {
        return res.status(409).json({ message: "Phone already in use" });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    next(error);
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  try {
    if (shouldUseFallback(req)) {
      const deleted = fallbackStore.deleteUser(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
