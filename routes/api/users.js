const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let users = require('../../Users');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(403); //forbidden without secret key
  }
}

//get all users
router.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403); //forbidden
    } else {
      res.json(users);
      authData
    }
  })
})

//get users by id
router.get('/:id', verifyToken, (req, res) => {
  const found = users.some(user => {
    return user.id === req.params.id;
  });

  if (found) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json(users.filter(user => user.id === req.params.id))
        authData
      }
    })
  } else {
    res.sendStatus(400);
  }
})

//create a new user 
router.post('/', verifyToken, (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email
  }

  if (!newUser.name || !newUser.email) {
    return res.status(400);
  }

  const existingUser = users.find((user) => user.email === newUser.email);

  if (existingUser) {
    return res.status(409).json({ message: 'User is already present' });
  }

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403); //forbidden
    } else {
      users.push(newUser);
      res.json(users);
      authData
    }
  })
})

//update user
router.put('/:id', verifyToken, (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.send(403);
    } else {
      if (found) {
        const updateUser = req.body;
        users.forEach(user => {
          if (user.id === parseInt(req.params.id)) {
            user.name = updateUser.name ? updateUser.name : user.name;
            user.email = updateUser.email ? updateUser.email : user.email;
            res.json({ message: 'user updated', user })
          }
        })
      }
    }
  })
})

//delete user
router.delete('/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id))

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403); //forbidden
    } else {
      if (found) {
        users = users.filter(user => user.id !== parseInt(req.params.id));
        res.json({
          msg: "user deleted",
          users
        })
        authData
      } else {
        res.sendStatus(400);
      }
    }
  })
})

module.exports = router