const router = require('express').Router();
const bcrypt = require('bcryptjs');


const generateToken = require('../config/generate-token.js');
const Users = require('./auth-model.js');




router.post('/register', (req, res) => {
  // implement registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome, ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid User/Pass'});
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
