const User = require("../models/User");
const jwt = require("jsonwebtoken");


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

   
    const isApproved = role === "admin" ? false : true;

    const user = new User({ name, email, password, role, isApproved });
    await user.save();

    res.status(201).json({ message: "User registered. Await approval if admin." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid email or password" });
    if (!user.isApproved) return res.status(401).json({ message: "Admin approval pending" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getPendingAdmins = async (req, res) => {
  try {
    const pendingAdmins = await User.find({ role: "admin", isApproved: false });
    res.json(pendingAdmins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.approveAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await User.findById(adminId);

    if (!admin || admin.role !== "admin") {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.isApproved = true;
    await admin.save();

    res.json({ message: "Admin approved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
