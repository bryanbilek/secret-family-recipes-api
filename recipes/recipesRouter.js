const router = require('express').Router();
const Recipes = require('./recipesModel');

//GET /api/recipes
router.get('/', (req, res) => {
    Recipes.find()
        .then(recipes => {
            res.status(200).json(recipes);
        })
        .catch(error => {
            res.status(500).json({ message: 'Problem getting recipes' });
        });
});

//GET /api/recipes/:id
router.get('/:id', (req, res) => {
    Recipes.findById(req.params.id)
        .then(recipe => {
            res.status(200).json(recipe);
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem retrieving recipe' });
        });
});

//GET /api/recipes/:id/favorites
router.get('/:id/favorites', (req, res) => {
    Recipes.findFavorites(req.params.id)
        .then(favs => {
            res.status(200).json(favs);
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem retrieving favorites' });
        });
});

//GET /api/recipes/:id/ingrediants
router.get('/:id/ingrediants', (req, res) => {
    Recipes.findIngrediants(req.params.id)
        .then(ingredients => {
            res.status(200).json(ingredients);
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem getting ingredients' });
        });
});

//GET /api/recipes/:id/steps
router.get('/:id/steps', (req, res) => {
    Recipes.findSteps(req.params.id)
        .then(steps => {
            res.status(200).json(steps);
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem getting steps' });
        });
});


//POST /api/recipes/add_recipe
router.post('/add_recipe', (req, res) => {
    Recipes.addRecipe(req.body)
        .then(recipes => {
            res.status(201).json(recipes);
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem creating recipe' });
        });
});

//POST /api/recipes/add_steps
router.post('/add_steps', (req, res) => {
    Recipes.addStep(req.body)
        .then(step => {
            res.status(201).json(step);
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem creating step' });
        });
});

//POST /api/recipes/add_ingrediant
router.post('/add_ingrediant', (req, res) => {
    Recipes.addIngrediant(req.body)
        .then(ingrediant => {
            res.status(201).json(ingrediant);
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem creating ingrediant' });
        });
});

//POST /api/recipes/add_fav
router.post('/add_fav', (req, res) => {
    Recipes.addFavorite(req.body)
        .then(fav => {
            res.status(201).json(fav);
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem creating favorite' });
        });
});


//PUT /api/recipes/:id
router.put('/:id', (req, res) => {
    Recipes.updateRecipe(req.params.id, req.body)
        .then(recipe => {
            res.status(201).json(recipe);
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem updating recipe' });
        });
});

//PUT /api/recipes/edit_steps/:id
router.put('/edit_steps/:id', (req, res) => {
    Recipes.updateSteps(req.body, req.params.id)
        .then(step => {
            res.status(201).json({ message: 'Successfully updated step' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem updating step' });
        });
});

//PUT /api/recipes/edit_ingrediants/:id
router.put('/edit_ingrediants/:id', (req, res) => {
    Recipes.updateIngrediants(req.body, req.params.id)
        .then(ingrediant => {
            res.status(201).json({ message: 'Successfully updated ingrediant' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem updating ingrediant' });
        });
});


//DELETE /api/recipes/:id
router.delete('/:id', (req, res) => {
    Recipes.removeRecipe(req.params.id)
        .then(recipe => {
            res.status(204).json({ message: 'Successfully deleted recipe' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem deleting recipe' });
        });
});

//DELETE /api/recipes/delete_step/:id
router.delete('delete_step/:id', (req, res) => {
    Recipes.removeStep(req.params.id)
        .then((deleted) => {
            res.status(204).json({ message: 'Successfully deleted step' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem deleting step' });
        });
});

//DELETE /api/recipes/delete_ingrediant/:id
router.delete('delete_ingrediant/:id', (req, res) => {
    Recipes.removeIngrediant(req.params.id)
        .then(ingrediant => {
            res.status(204).json({ message: 'Successfully deleted ingrediant' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem deleting ingrediant' });
        });
});

module.exports = router;