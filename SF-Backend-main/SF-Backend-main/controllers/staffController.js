const User = require("../models/User");
const fallbackStore = require("../utils/fallbackStore");
const mongoose = require("mongoose");

const isMongoAvailable = () => mongoose.connection.readyState === 1;
const shouldUseFallback = (req) =>
  !isMongoAvailable() || !mongoose.Types.ObjectId.isValid(req.user?.id);

// Get all staff and admin users
const getAllStaff = async (req, res, next) => {
  try {
    if (shouldUseFallback(req)) {
      return res.status(200).json(fallbackStore.listStaff());
    }

    const staff = await User.find({ role: { $in: ["admin", "staff"] } })
      .select("-password");
    res.status(200).json(staff);
  } catch (error) {
    next(error);
  }
};

// Get staff by ID
const getStaffById = async (req, res, next) => {
  try {
    if (shouldUseFallback(req)) {
      const staff = fallbackStore.findStaffById(req.params.id);
      if (!staff) {
        return res.status(404).json({ message: "Staff not found" });
      }
      return res.status(200).json(staff);
    }

    const staff = await User.findById(req.params.id).select("-password");
    
    if (!staff || (staff.role !== "admin" && staff.role !== "staff")) {
      return res.status(404).json({ message: "Staff not found" });
    }
    
    res.status(200).json(staff);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Staff not found" });
    }
    next(error);
  }
};

// Update staff
const updateStaff = async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;

    if (shouldUseFallback(req)) {
      if (email) {
        const existingEmail = fallbackStore.findUserByEmail(email);
        if (existingEmail && existingEmail._id !== req.params.id && existingEmail.id !== req.params.id) {
          return res.status(400).json({ message: "Email already in use" });
        }
      }

      if (phone) {
        const existingPhone = fallbackStore.findUserByPhone(phone);
        if (existingPhone && existingPhone._id !== req.params.id && existingPhone.id !== req.params.id) {
          return res.status(400).json({ message: "Phone number already in use" });
        }
      }

      const staff = fallbackStore.findStaffById(req.params.id);
      if (!staff) {
        return res.status(404).json({ message: "Staff not found" });
      }

      const updateData = {};
      if (name) updateData.name = name;
      if (phone) updateData.phone = phone;
      if (email) updateData.email = email;

      const updatedUser = fallbackStore.updateUser(req.params.id, updateData);
      if (!updatedUser || (updatedUser.role !== "admin" && updatedUser.role !== "staff")) {
        return res.status(404).json({ message: "Staff not found" });
      }

      return res.status(200).json({
        message: "Staff updated successfully",
        user: updatedUser,
      });
    }

    const { name: updatedName, phone: updatedPhone, email: updatedEmail } = req.body;
    
    // Prevent duplicate email
    if (updatedEmail) {
      const existingEmail = await User.findOne({ email: updatedEmail, _id: { $ne: req.params.id } });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }
    
    // Prevent duplicate phone
    if (updatedPhone) {
      const existingPhone = await User.findOne({ phone: updatedPhone, _id: { $ne: req.params.id } });
      if (existingPhone) {
        return res.status(400).json({ message: "Phone number already in use" });
      }
    }

    const updateData = {};
    if (updatedName) updateData.name = updatedName;
    if (updatedPhone) updateData.phone = updatedPhone;
    if (updatedEmail) updateData.email = updatedEmail;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user || (user.role !== "admin" && user.role !== "staff")) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({
      message: "Staff updated successfully",
      user
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Staff not found" });
    }
    next(error);
  }
};

// Activate / Deactivate staff
const updateStaffStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (status !== "active" && status !== "inactive") {
      return res.status(400).json({ message: "Invalid status value. Use 'active' or 'inactive'." });
    }

    const isActive = status === "active";

    if (shouldUseFallback(req)) {
      const staff = fallbackStore.findStaffById(req.params.id);
      if (!staff) {
        return res.status(404).json({ message: "Staff not found" });
      }
      fallbackStore.updateUser(req.params.id, { isActive });
      return res.status(200).json({
        message: "Status updated successfully"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select("-password");

    if (!user || (user.role !== "admin" && user.role !== "staff")) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({
      message: "Status updated successfully"
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Staff not found" });
    }
    next(error);
  }
};

module.exports = {
  getAllStaff,
  getStaffById,
  updateStaff,
  updateStaffStatus
};
