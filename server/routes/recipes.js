const express = require('express');
const router = express.Router();
const axios = require('axios');
const recipesUtils = require('../modules/recipesUtils');

const api_domain = 'https://api.spoonacular.com/recipes';

// METHOD: GET
// ROUTE: /getRandomRecipes
// DESC: get three random recipes
router.get('/getRandomRecipes', (req, res, next) => {
  recipesUtils
    .getRandomRecipes()
    .then((randomRecipes) => res.status(200).send(randomRecipes))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// METHOD: GET
// ROUTE: /searchRecipeByName
// DESC: search recipes by name (optinal: add diet, cuisine, intoleramce to the search)
router.get('/searchRecipeByName', (req, res, next) => {
  const { query, number } = req.query;
  let searchParams = {};
  searchParams.query = query;
  if (number) {
    searchParams.number = number;
  } else {
    searchParams.number = 5;
  }
  searchParams.instructionsRequired = true;
  searchParams.apiKey = process.env.spooncular_apiKey;

  //check if the user add more search params
  recipesUtils.setQueryParams(req.query, searchParams);

  recipesUtils
    .searchRecipes(searchParams)
    .then((recipesFound) => res.status(200).send(recipesFound))
    .catch((error) => {
      console.log(error);
      res.status(error.status).send(error.message)
    });
});

// METHOD: GET
// ROUTE: /getRecipeInstructios
// DESC: get instructions for specific recipe 
router.get('/getRecipeInstructions', async (req, res, next) => {
  console.log(`${req.query.recipeId}`);
  recipesUtils
    .getRecipeInstructions(`${req.query.recipeId}`)
    .then((instructions) => res.send(instructions))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
