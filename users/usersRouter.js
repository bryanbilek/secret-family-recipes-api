const router = require('express').Router();
const Users = require('./usersModel');

//GET /api/users
router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ message: 'Problem getting users' });
        });
});

//GET /api/users/:id
router.get('/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem retrieving user' });
        });
});

//GET /api/users/:id/recipes
router.get('/:id/recipes', (req, res) => {
    Users.findUserRecipes(req.params.id)
        .then(recipe => {
            res.status(200).json(recipe);
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem retrieving recipes' });
        });
});

//GET /api/users/:id/recipes/:id
router.get('/:id/recipes/:id', (req, res) => {
    Users.findUserRecipes(req.params.id)
        .then(recipe => {
            if (recipe) {
                Users.findUserRecipesById(req.params.id)
                    .then(recipeId => {
                        res.status(200).json(recipeId);
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem retrieving recipes' });
        });
});

//POST /api/users
router.post('/', (req, res) => {
    Users.insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem creating user' });
        });
});

//POST /api/users/:id/recipes
router.post('/:id/recipes', (req, res) => {
    Users.findUserRecipes(req.params.id)
        .then(recipe => {
            if (recipe) {
                Users.insertRecipe(req.body, req.params.id)
                    .then(newRecipe => {
                        res.status(201).json(newRecipe);
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem retrieving recipes' });
        });
});

//PUT /api/users/:id
router.put('/:id', (req, res) => {
    Users.update(req.params.id, req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Problem updating user' });
        });
});

//PUT /api/users/:id/recipes/:id
router.put('/:id/recipes/:id', (req, res) => {
    Users.findUserRecipes(req.params.id)
        .then(recipe => {
            if (recipe) {
                Users.updateUserRecipe(req.params.id, req.body)
                    .then(newRecipe => {
                        res.status(201).json(newRecipe);
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem retrieving recipes' });
        });
});

//DELETE /api/users/:id
router.delete('/:id', (req, res) => {
    Users.remove(req.params.id)
        .then(user => {
            res.status(201).json(user);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Problem deleting user' });
        });
});

//DELETE /api/users/:id/recipes/:id
router.delete('/:id/recipes/:id', (req, res) => {
    Users.findUserRecipes(req.params.id)
        .then(recipe => {
            if (recipe) {
                Users.removeUserRecipe(req.params.id)
                    .then(newRecipe => {
                        res.status(201).json(newRecipe);
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem retrieving recipes' });
        });
});

module.exports = router;