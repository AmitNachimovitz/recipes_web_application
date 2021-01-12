const express = require('express');
const router = express.Router();
const dbUtils = require('../modules/dbUtils');
const usersUtils = require('../modules/usersUtils');
const recipesUtils = require('../modules/recipesUtils');

// DESC: check the has cookie and is authorize to complete the request
router.use(async function(req, res, next) {
  if (req.session && req.session.user_id) {
    try {
      const user = (await dbUtils.checkIdOnDB(`${req.session.user_id}`))[0];
      if (user != null) {
        req.username = user.username;
        next();
      } else {
        //res.redirect('/');
      }
    } catch (error) {
      next();
    }
  } else {
    //res.redirect('/');
  }
});

// METHOD: GET
// ROUTE: /getUserRecipesData
// DESC: get user recipes data - check if the user watced the recipes and if it is in his favorites 
router.get('/getUserRecipesData', async (req, res, next) => {
  try {
    let recipeDict = {};
    let recipesIds = JSON.parse(req.query.recipes_ids);

    let promises = [];
    recipesIds.map((id) =>
      promises.push(usersUtils.getRecipeInfo(`${req.username}`, `${id}`))
    );

    let recipesInfo = await Promise.all(promises);
    recipesInfo.forEach((recipe) => {
      recipeDict[recipe.recipeId] = recipe;
    });

    res.status(200).send(recipeDict);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// METHOD: POST
// ROUTE: /addFavoriteRecipe
// DESC: add recipe to the user favorite recipes 
router.post('/addFavoriteRecipe', async (req, res, next) => {
  try {
    await dbUtils.setFavoriteRecipe(
      `${req.username}`,
      `${req.body.recipe_id}`,
      1
    );
    res
      .status(201)
      .send({ message: 'recipe added to favorite', success: true });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// METHOD: POST
// ROUTE: /addWatchedRecipe
// DESC: add recipe to the watched recipes 
router.post('/addWatchedRecipe', async (req, res, next) => {
  try {
    await dbUtils.addWatchedRecipe(`${req.username}`, `${req.body.recipe_id}`);
    await usersUtils.addLastVistedRecipe(`${req.username}`, `${req.body.recipe_id}`);
    res.status(201).send({ message: 'add to watched recipes', success: true });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// METHOD: GET
// ROUTE: /getLastVisitedRecipes
// DESC: get the three last visited recipes of the user 
router.get('/getLastVisitedRecipes', async (req, res, next) => {
  try {
    const lastVisitedRecipes = (
      await dbUtils.getLastVisitedPages(`${req.username}`)
    )[0];
    
    if(lastVisitedRecipes){
      const recipeDict = await recipesUtils.getRecipesInfo(Object.values(lastVisitedRecipes));
      res.status(200).send(recipeDict);
    }

    else {
      res.sendStatus(204);
    }

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// METHOD: GET
// ROUTE: /getUserFamilyRecipes
// DESC: get family recipes for user 
router.get('/getUserFamilyRecipes', async (req, res, next) => {
  try {
    const familyRecipes = await dbUtils.getFamilyRecipes(req.username);
    const recipeDict = await usersUtils.getFamilyRecipeData(familyRecipes);

    res.status(200).send(recipeDict);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// METHOD: GET
// ROUTE: /getUserPersonalRecipes
// DESC: get personal recipes for user 
router.get('/getUserPersonalRecipes', async (req, res, next) => {
  try {
    const personalRecipes = await dbUtils.getPersonalRecipes(req.username);
    const recipeDict = await usersUtils.getPersonalRecipeData(personalRecipes);

    res.status(200).send(recipeDict);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// METHOD: GET
// ROUTE: /getUserFavoriteRecipes
// DESC: get favorite recipes for user 
router.get('/getUserFavoriteRecipes', async (req, res, next) => {
  try {
    const favoriteRecipes = await dbUtils.getFavoriteRecipes(req.username);
    let recipesIdList = [];
    favoriteRecipes.map((recipe) => {
      recipesIdList.push(recipe.recipe_id);
    });
    const recipeDict = await recipesUtils.getRecipesInfo(recipesIdList);

    res.status(200).send(recipeDict);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
