const User = require('../models/user');
const generateToken = require('../config/jwt');

// Đăng ký người dùng
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  
  try {
    // Kiểm tra xem email đã tồn tại chưa
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Tạo người dùng mới
    const user = await User.create({
      name,
      email,
      password,
      role
    });

    // Nếu người dùng được tạo, trả về thông tin người dùng kèm token
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: 'user',
        active: user.active,
        addresses: user.addresses,
        created_at: user.created_at,
        updated_at: user.updated_at,
        token: generateToken(user),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

const registerAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;
  
  try {
    // Kiểm tra xem email đã tồn tại chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Tạo người dùng mới
    const user = await User.create({
      name,
      email,
      password,
      role
    });
    // Nếu người dùng được tạo, trả về thông tin người dùng kèm token
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: 'admin',
        active: user.active,
        addresses: user.addresses,
        created_at: user.created_at,
        updated_at: user.updated_at,
        token: generateToken(user),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};
// Đăng nhập người dùng
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        active: user.active,
        addresses: user.addresses,
        created_at: user.created_at,
        updated_at: user.updated_at,
        token: generateToken(user),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
    try {
      // Tìm người dùng theo ID
      const user = await User.findById(id);
  
      if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          active: user.active,
          addresses: user.addresses,
          created_at: user.created_at,
          updated_at: user.updated_at,
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
  };
  
  module.exports = { registerUser, loginUser, getUserById };
  // Lấy danh sách người dùng
  const getUsers = async (req, res) => {
    try {
      const users = await User.find({ active: { $ne: 'inactive' } }); // Lọc người dùng active
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  };
  // Sửa thông tin người dùng
  const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role, addresses } = req.body;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;
      user.addresses = addresses || user.addresses;
      user.updated_at = new Date();
      await user.save();
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  };
  // Xóa mềm người dùng
  const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.active = 'inactive'; // Đánh dấu tài khoản là inactive
      user.updated_at = new Date();
      await user.save();
      res.status(200).json({ message: 'User deleted (soft) successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  };
  module.exports = { registerUser, loginUser, getUserById, registerAdmin, getUsers, updateUser, deleteUser };
  }
