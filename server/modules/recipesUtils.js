const axios = require('axios');
const recipes_api_url = 'https://api.spoonacular.com/recipes';
const apiKey = process.env.spooncular_apiKey;

//The function set the users parameters to be searched
function setQueryParams(userQueryParams, searchParams) {
  //identify user query params
  const paramsList = ['diet', 'cuisine', 'intolerances'];
  paramsList.forEach((param) => {
    if (userQueryParams[param]) {
      searchParams[param] = userQueryParams[param];
    }
  });
}

//The function search for recipes with Search Recipes api
async function searchRecipes(searchParams) {
  let searchResponse = await axios.get(`${recipes_api_url}/search?`, {
    params: searchParams,
  });

  const recipesIdList = extractResultsIds(searchResponse);
  if (recipesIdList.length == 0) {
        throw { status: 204, message: 'No results found' };
    }
  //get recipe info by id
  let recipesInfo = await getRecipesInfo(recipesIdList);
  return recipesInfo;
}

//The function receives response from spooncular and extract the recipes ids
function extractResultsIds(searchResponse) {
  let recipes = searchResponse.data.results;
  let recipesIdList = [];
  recipes.map((recipe) => {
    recipesIdList.push(recipe.id);
  });

  return recipesIdList;
}

//The function receives recipes ids and returns inforamtion of the recipes from spooncular
async function getRecipesInfo(recipesIdList) {
  let promises = [];
  recipesIdList = recipesIdList.filter(recipe => recipe)
  recipesIdList.map((id) => {
    if(id != 'null' && id !='NULL'){
      promises.push(axios.get(`${recipes_api_url}/${id}/information?apiKey=${apiKey}`));
    }
  }
  );

  let recipesDict = {};
  let recipesInfoResponse = await Promise.all(promises);
  recipesInfoResponse.forEach((recipe) => {
    let recipeData = extractReleventInfo(recipe.data);
    let id = recipeData.id;
    recipesDict[id] = recipeData;
  });
  return recipesDict;
}

//The function returns three random recipes from spooncular
async function getRandomRecipes() {
  let searchResponse = await axios.get(
    `${recipes_api_url}/complexSearch?query=&sort=random&maxFat=1000&number=3&instructionsRequired=true&apiKey=${apiKey}`
  );

  const recipesIdList = extractResultsIds(searchResponse);
  //get recipe info by id
  let recipesInfo = await getRecipesInfo(recipesIdList);

  return recipesInfo;
}

//The function receives recipes info and extract the relevant inforamtion for the user
function extractReleventInfo(recipesInfo) {
  let {
    id,
    title,
    readyInMinutes,
    aggregateLikes,
    vegetarian,
    vegan,
    glutenFree,
    image,
    servings,
    extendedIngredients,
  } = recipesInfo;

  extendedIngredients = extendedIngredients.map((i) => ({ 
    name: i.name,
    amount: i.amount + ' ' + i.unit
  }
));
  return {
    id: id,
    name: title,
    readyInMinutes: readyInMinutes,
    aggregateLikes: aggregateLikes,
    vegetarian: vegetarian,
    vegan: vegan,
    glutenFree: glutenFree,
    image: image,
    servings: servings,
    ingredients: extendedIngredients,
  };
}

//The function receives recipe id and returns instructions of the specific recipe from spooncular
async function getRecipeInstructions(recipeId) {
  let recipesInstructions = await axios.get(
    `${recipes_api_url}/${recipeId}/analyzedInstructions?apiKey=${apiKey}`
  );

  recipesInstructions = recipesInstructions.data[0].steps.map((i) => ({ 
        number: i.number,
        step: i.step
      }
 ));

  return recipesInstructions;
}

exports.setQueryParams = setQueryParams;
exports.searchRecipes = searchRecipes;
exports.getRandomRecipes = getRandomRecipes;
exports.getRecipeInstructions = getRecipeInstructions;
exports.getRecipesInfo = getRecipesInfo;
