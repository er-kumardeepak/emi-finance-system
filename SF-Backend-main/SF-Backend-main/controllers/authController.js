const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fallbackStore = require("../utils/fallbackStore");
const mongoose = require("mongoose");

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const DEMO_ADMIN_EMAIL = "admin123@gmail.com";
const DEMO_ADMIN_PASSWORD = "Admin@123";

const isMongoAvailable = () => mongoose.connection.readyState === 1;
const shouldUseFallback = (req) =>
  !isMongoAvailable() || !mongoose.Types.ObjectId.isValid(req.user?.id);

const createDemoAdminFallback = () => ({
  _id: "demo-admin",
  name: "Demo Admin",
  email: DEMO_ADMIN_EMAIL,
  phone: "9999999999",
  role: "admin",
  isActive: true,
  matchPassword: async () => true,
});

const isDemoLogin = (email, password) => {
  return (
    email &&
    password &&
    email.toLowerCase() === DEMO_ADMIN_EMAIL &&
    password === DEMO_ADMIN_PASSWORD
  );
};

// Register Staff (Admin Only)
const registerStaff = async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    if (req.user && shouldUseFallback(req)) {
      const existingUser = fallbackStore.findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          message: "Email already registered",
        });
      }

      const user = fallbackStore.createUser({
        name,
        email,
        phone,
        password,
        role: role || "staff",
      });

      const token = generateToken(user._id, user.role);

      return res.status(201).json({
        message: "Staff registered successfully",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      phone,
      password,
      role: role || "staff",
    });

    await user.save();

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "Staff registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Register initial admin (only when no admin exists)
const registerInitialAdmin = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    if (!isMongoAvailable()) {
      const existingAdmin = fallbackStore.findUserByEmail(email);
      if (existingAdmin && existingAdmin.role === "admin") {
        return res.status(403).json({
          message: "Admin already exists. Please log in.",
        });
      }

      const existingUser = fallbackStore.findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          message: "Email already registered",
        });
      }

      const user = fallbackStore.createUser({
        name,
        email,
        phone,
        password,
        role: "admin",
      });

      const token = generateToken(user._id, user.role);

      return res.status(201).json({
        message: "Initial admin registered successfully",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
    }

    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      return res.status(403).json({
        message: "Admin already exists. Please log in.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const user = new User({
      name,
      email,
      phone,
      password,
      role: "admin",
    });

    await user.save();

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "Initial admin registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const { email, phone, password } = req.body;

    // Validation
    if (!password || (!email && !phone)) {
      return res.status(400).json({
        message: "Email/phone and password are required",
      });
    }

    let user = null;
    try {
      if (isMongoAvailable()) {
        if (email) {
          user = await User.findOne({ email: email.toLowerCase() });
        } else if (phone) {
          user = await User.findOne({ phone });
        }
      } else if (email) {
        user = fallbackStore.findUserByEmail(email);
      } else if (phone) {
        user = fallbackStore.findUserByPhone(phone);
      }
    } catch (dbError) {
      console.warn("User lookup failed, using demo fallback:", dbError.message);
    }

    if (!user && isDemoLogin(email, password)) {
      user = createDemoAdminFallback();
    }

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: "User account is deactivated",
      });
    }

    const isPasswordValid = user.matchPassword
      ? await user.matchPassword(password)
      : user.password === password;
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get current user
const getCurrentUser = async (req, res, next) => {
  try {
    if (shouldUseFallback(req)) {
      const fallbackUser = fallbackStore.findUserById(req.user.id);
      if (!fallbackUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({
        id: fallbackUser._id,
        name: fallbackUser.name,
        email: fallbackUser.email,
        phone: fallbackUser.phone,
        role: fallbackUser.role,
      });
    }

    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerStaff,
  registerInitialAdmin,
  login,
  getCurrentUser,
};
