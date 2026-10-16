import UserModel from '../models/userModel.js';

const UserController = {
  async getAll(req, res) {
    try {
      const users = await UserModel.getAll();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getById(req, res) {
    const { id } = req.params;

    try {
      const user = await UserModel.getById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async create(req, res) {
    const { email, password, name, phone, profileimage, role } = req.body || {};

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password and name are required' });
    }

    try {
      const user = await UserModel.create({
        email,
        password,
        name,
        phone: phone || null,
        profileimage: profileimage || null,
        role: role || '0',
      });

      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default UserController;
