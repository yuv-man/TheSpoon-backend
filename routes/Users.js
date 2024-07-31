const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserModel = require("../models/User");


router.post('/users', async (req, res) => {
    try {
      const { name } = req.body;

      // Check if a user with the same name already exists
      const existingUser = await UserModel.findOne({ name });
      if (existingUser) {
        return res.status(400).send('User with the same name already exists');
      }

      // Create new user
      const user = new UserModel(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      console.error('Failed to create user:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.post('/users/login', async (req, res) => {
    const { name, password } = req.body;

    const user = await UserModel.findOne({ name });
    if (!user) return res.status(404).send('User not found');
    if (user.password !== password) return res.status(401).send('Invalid password');

    res.send(user);
  })

  router.get('/users', async (req, res) => {
    const users = await UserModel.find();
    res.send(users);
  });

  router.get('/users/:id', async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  });

  router.get('/users/ranking', async (req, res) => {
    const users = await UserModel.find().sort({ points: -1 });
    if (!users) return res.status(404).send('No users found');
    const userNamesAndPoints = users.map(user => ({ name: user.name, points: user.points }))
    res.send(userNamesAndPoints);
  });

  module.exports = router;