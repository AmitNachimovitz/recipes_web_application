const DB = require('../modules/DB')

//The function returns user names
function getUserNames() {
    return DB.execQuery('SELECT username FROM users');
}

//The function register new user
function regiterNewUser (userName, firstName, lastName, country, password, email, imgURL) {
    DB.execQuery(
    `INSERT INTO users VALUES (default, '${userName}', '${firstName}', '${lastName}', '${country}', '${password}', '${email}', '${imgURL}')`
  );
}

//The fucntion returns the user id by the user name
function getUserIdByUserName(userName) {
    return DB.execQuery(`SELECT * FROM users WHERE username = '${userName}'`);
}

//The function checks if the user exist in the db
function checkIdOnDB(userId) {
    return DB.execQuery(`SELECT * FROM users WHERE user_id = '${userId}'`);
}

//The fucntion returns the info of user on recipe - is watched $ is favorite
function getUserInfoOnRecipe(userName, recipeId) {
    return (DB.execQuery(
        `SELECT * FROM user_info_recipes WHERE username = '${userName}' AND recipe_id = '${recipeId}'`));
}

//The fucntion set the favorite status of the recipe
async function setFavoriteRecipe(userName, recipeId, isFavorite) {
    const isExist = await getUserInfoOnRecipe(`${userName}`, `${recipeId}`);

    if (isExist.length != 0) {
        DB.execQuery(
            `UPDATE user_info_recipes SET is_favorite = '${isFavorite}' WHERE username = '${userName}' AND recipe_id = '${recipeId}'`
        );
    }

    else {
        DB.execQuery(
            `INSERT INTO user_info_recipes(username, recipe_id, is_favorite, is_watched) VALUES ('${userName}', '${recipeId}', '1', '0')`
        );
    }
}

//The function add recipe to watched recipe of the user
async function addWatchedRecipe(userName, recipeId) {
    const isExist = await getUserInfoOnRecipe(`${userName}`, `${recipeId}`);

    if (isExist.length == 0) {
        DB.execQuery(
            `INSERT INTO user_info_recipes(username, recipe_id, is_favorite, is_watched) VALUES ('${userName}', '${recipeId}', '0', '1')`
        );
    }
    
    else if (isExist[0].is_watched == 0) {
        DB.execQuery(
            `UPDATE user_info_recipes SET is_watched = '1' WHERE username = '${userName}' AND recipe_id = '${recipeId}'`
        );
    }
}

//The function returns the three last visited recipes
function getLastVisitedPages(userName) {
    return DB.execQuery(`SELECT first_recipe_id, second_recipe_id, third_recipe_id FROM last_visited_recipes WHERE username = '${userName}'`);
}

//The function sets the three last visited recipes 
async function setLastVisitedPages(userName, userLastVisitedRecipes){
    DB.execQuery(`UPDATE last_visited_recipes SET first_recipe_id = '${userLastVisitedRecipes[0]}', second_recipe_id = '${userLastVisitedRecipes[1]}', third_recipe_id = '${userLastVisitedRecipes[2]}' WHERE username = '${userName}'`);
}

//The function adds recipes to last visited
async function addLastVisitedPages(username, userLastVisitedRecipe){
    DB.execQuery(`INSERT INTO last_visited_recipes(username, first_recipe_id) VALUES ('${username}', '${userLastVisitedRecipe}')`);
}

//The function returns the families recipes of the user
function getFamilyRecipes(username) {
    return DB.execQuery(`SELECT personal_recipes.recipe_id, personal_recipes.username, personal_recipes.recipe_name, 
    personal_recipes.ready_in_minutes, personal_recipes.aggregate_likes, personal_recipes.vegetarian, personal_recipes.vegan, personal_recipes.gluten_free, personal_recipes.img_url,
     family_recipes.author, family_recipes.when_prepared FROM personal_recipes INNER JOIN family_recipes ON personal_recipes.recipe_id = family_recipes.recipe_id WHERE username = '${username}' AND is_family = 1;`);  
}

//The function returns the personal recipes of the user
function getPersonalRecipes(username) {
    return DB.execQuery(`SELECT personal_recipes.recipe_id, personal_recipes.username, personal_recipes.recipe_name, 
    personal_recipes.ready_in_minutes, personal_recipes.aggregate_likes, personal_recipes.vegetarian, personal_recipes.vegan, personal_recipes.gluten_free, personal_recipes.img_url FROM personal_recipes WHERE username = '${username}' AND is_family = 0;`);  
}

//The function returns the ingredients of specific recipe
async function getRecipeIngredients(recipeID) {
    return DB.execQuery(`SELECT name, amount FROM recipe_ingredients WHERE recipe_id = '${recipeID}'`);  
}

//The function returns the instructions of specific recipe
async function getRecipeInstructions(recipeID) {
    return DB.execQuery(`SELECT number, step FROM recipe_instructions WHERE recipe_id = '${recipeID}'`);  
}

function getFavoriteRecipes(username) {
    return DB.execQuery(`SELECT recipe_id FROM user_info_recipes WHERE username = '${username}' AND is_favorite = 1`);
}

exports.regiterNewUser = regiterNewUser;
exports.getUserNames = getUserNames;
exports.getUserIdByUserName = getUserIdByUserName;
exports.checkIdOnDB = checkIdOnDB;
exports.addWatchedRecipe = addWatchedRecipe;
exports.setFavoriteRecipe = setFavoriteRecipe;
exports.getUserInfoOnRecipe = getUserInfoOnRecipe;
exports.getLastVisitedPages = getLastVisitedPages;
exports.setLastVisitedPages = setLastVisitedPages;
exports.addLastVisitedPages = addLastVisitedPages;
exports.getFamilyRecipes = getFamilyRecipes;
exports.getPersonalRecipes = getPersonalRecipes;
exports.getRecipeIngredients = getRecipeIngredients;
exports.getRecipeInstructions = getRecipeInstructions;
exports.getFavoriteRecipes = getFavoriteRecipes;
