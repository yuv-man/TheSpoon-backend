app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  });

  app.get('/users', async (req, res) => {
    const users = await find();
    res.send(users);
  });