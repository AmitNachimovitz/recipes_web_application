const axios = require("axios");
const dbUtils = require('../modules/dbUtils');

//The function updates the last visited recipes of the user
function setLastVisitedRecipes(newVisitedRecipe, userLastVisitedRecipes){
    let dbArrayLength = userLastVisitedRecipes.length;
    for(let j = dbArrayLength - 1; j > 0; j--){    
        userLastVisitedRecipes[j] = userLastVisitedRecipes[j - 1];    
    }  

    userLastVisitedRecipes[0] = newVisitedRecipe; 

    return userLastVisitedRecipes;
}

async function addLastVistedRecipe(userName, newVisitedRecipes){
    try {
        let userLastVisitedRecipes = (
          await dbUtils.getLastVisitedPages(userName))[0];

        if (userLastVisitedRecipes) {
          let lastVisited = Object.values(userLastVisitedRecipes);
          const index = lastVisited.indexOf(newVisitedRecipes);
          if (index > -1){
            lastVisited.splice(index, 1);
            lastVisited.push('NULL');
          }
          lastVisited = setLastVisitedRecipes(newVisitedRecipes, lastVisited);
          await dbUtils.setLastVisitedPages(userName, lastVisited);
        } else {
          await dbUtils.addLastVisitedPages(userName, newVisitedRecipes);
        }
      } catch (error) {
        console.log(error);
      }
}

//The function receives username and recipe id and returns the info about the recipe -
//if the recipe watched bu the user and if it is a favorite recipe  
async function getRecipeInfo(username, id) {
    let recipe = await dbUtils.getUserInfoOnRecipe(`${username}`, `${id}`);

    let recipeData = {
        recipeId: `${id}`,
        isWatched: 'false',
        isFavorite: 'false' 
    };

    //the user watched the recipe
    if (recipe.length != 0) {
        recipe = recipe[0];
        recipeData.isWatched = `${recipe.is_watched}`;
        recipeData.isFavorite = `${recipe.is_favorite}`;
    }

    return recipeData;
}

//The function receives recipes ids and returns the info about the recipes (general info, ingredients and instructions)
async function getPersonalRecipeData(recipeIds) {
    const recipeDict = {};

    for (let recipe of recipeIds) {
      const recipeIngredients = await dbUtils.getRecipeIngredients(recipe.recipe_id);
      const recipeInstructions = await dbUtils.getRecipeInstructions(recipe.recipe_id);
      recipeDict[recipe.recipe_id] = {
        id: recipe.recipe_id,
        name: recipe.recipe_name,
        readyInMinutes: recipe.ready_in_minutes,
        aggregateLikes: recipe.aggregate_likes,
        vegetarian: recipe.vegetarian,
        vegan: recipe.vegan,
        glutenFree: recipe.gluten_free,
        image: recipe.img_url,
        ingredients: recipeIngredients,
        instructions: recipeInstructions
        };
   }

   return recipeDict;
}

//The function receives recipes ids and returns the info about the recipes (general info, ingredients and instructions)
async function getFamilyRecipeData(recipeIds) {
    const recipeDict = {};

    for (let recipe of recipeIds) {
      const recipeIngredients = await dbUtils.getRecipeIngredients(recipe.recipe_id);
      const recipeInstructions = await dbUtils.getRecipeInstructions(recipe.recipe_id);
      recipeDict[recipe.recipe_id] = {
        id: recipe.recipe_id,
        name: recipe.recipe_name,
        author: recipe.author,
        whenPrepared: recipe.when_prepared,
        readyInMinutes: recipe.ready_in_minutes,
        aggregateLikes: recipe.aggregate_likes,
        vegetarian: recipe.vegetarian,
        vegan: recipe.vegan,
        glutenFree: recipe.gluten_free,
        image: recipe.img_url,
        ingredients: recipeIngredients,
        instructions: recipeInstructions
        };
   }

   return recipeDict;
}

exports.getRecipeInfo = getRecipeInfo; 
exports.setLastVisitedRecipes = setLastVisitedRecipes;
exports.getPersonalRecipeData = getPersonalRecipeData;
exports.getFamilyRecipeData = getFamilyRecipeData;
exports.addLastVistedRecipe = addLastVistedRecipe;
