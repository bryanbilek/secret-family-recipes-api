const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./authModel');
const secrets = require('../api/secrets');

//POST to /api/auth/register
router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;
    Users.add(user)
        .then(users => {
            res.status(201).json(users);
        })
        .catch(err => {
            console.log('ERR', err)
            res.status(500).json({ message: 'Registraition failed' });
        });
});

//POST to /api/auth/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    Users.findBy({ username })
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(201).json({ message: `Welcome, ${user.username}!`, token });
            } else {
                res.status(401).json({ message: 'Invalid username or password' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem logging in' });
        });
});

//PUT to api/auth/edit_user/:id
router.put('/edit_user/:id', (req, res) => {
    const { id } = req.params.id;
    const updatedUser = req.body;
    updatedUser.id = id;
    const hash = bcrypt.hashSync(updatedUser.password, 10);
    updatedUser.password = hash;
    Users.update(req.body, req.params.id)
        .then(user => {
            res.status(204).json({ message: 'Successfully updated user' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem updating user' });
        });
});

//DELETE to api/auth/delete_user/:id
router.delete('/delete_user/:id', (req, res) => {
    Users.remove(req.params.id)
        .then(user => {
            res.status(204).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem deleting user' });
        });
});

//token
function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username
    };
    const secret = secrets.jwtSecret
    const options = {
        expiresIn: '1h'//token is good for 1 hour
    };
    return jwt.sign(payload, secret, options);
};

module.exports = router;