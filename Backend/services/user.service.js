//user.service.js
const model = require('../schema/user.model');
const bcrypt = require('bcryptjs');

const services = {
  async createUser(name, email, password) {
    try {
      const newUser = await model.create({ name, email, password });
      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error('Error creating user');
    }
  },

  async findUser(email) {
    try {
      const user = await model.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error('Error finding user');
    }
  },

  async comparePassword(plainPassword, hashedPassword) {
    try {
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      return isMatch;
    } catch (error) {
      console.log(error);
      throw new Error('Error comparing password');
    }
  },
};

module.exports = services;
