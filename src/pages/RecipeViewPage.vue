<template>
  <b-container fluid id="container">
    <b-row>
      <b-col>
        <img v-if="recipe.image" :src="recipe.image" id="img"/>  
      </b-col>
    </b-row> 
    <b-row>
      <b-col>
        <div id="recipe-details">
          <div>
            <img v-if="this.$root.store.username && recipe.isPublic && favoriteURL" :src="favoriteURL" v-on:click="addFavorite" id="favorite" class="icons" />  
            <label id="title">{{ recipe.name }}</label>
          </div>
          <div id="icons-container">
            <img v-if="recipe.vegetarian" src="../assets/images/vegeterian2.png" class="icons">
            <img v-if="recipe.vegan" src="../assets/images/vegan3.jpg" class="icons"/>
            <img v-if="recipe.glutenFree" src="../assets/images/gluten_free.jpg" class="icons"/>
          </div>  
          <div v-if="recipe.author"> Recipe author: {{ recipe.author }}</div>
          <div v-if="recipe.whenPrepared">When Prepared: {{ recipe.whenPrepared}}</div>
          <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
          <div v-if="recipe.isPublic">
            <img src="../assets/images/likes.png" id="like" class="icons">
            <label> {{ recipe.aggregateLikes }} likes </label>
          </div>
          <div v-if="recipe.isPublic">Number of servings: {{ recipe.servings }}</div>
        </div>  
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div id="ingingredient-container">
          <label class="headers">Ingredients: </label>
          <ul class="lists">
            <li class="text"
              v-for="ingredient in recipe.ingredients" :key="ingredient.name+ingredient.amount">
              {{ ingredient.amount + " - " + ingredient.name }}
            </li>
          </ul>
        </div>  
      </b-col>
      <b-col>
        <div id="instructions-container">
          <label class="headers">Instructions:</label>
          <ol class="lists">
            <li class="text" v-for="instruction in instructions" :key="instruction.number">
              {{ instruction.step }}
            </li>
          </ol>
        </div>  
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import notFavorite from "../assets/images/no-favorite.png";
import favorite from "../assets/images/favorite.png";


export default {
  data() {
    return {
      recipe: null,
      favoriteURL: "",
      instructions: []
    };
  },
  async created() {

    this.recipe = this.$route.params.recipe;


    //this is a public recipe - need to get the instructions
    if (!this.recipe.instructions) {
      this.instructions = await this.getRecipeInstructions(this.recipe.id);
      this.favoriteURL = this.recipe.isFavorite == "true" ? favorite : notFavorite;
      await this.addWatched(this.recipe.id);
    }

    else {
      this.instructions = this.recipe.instructions;
    }

  },
  methods: {
    async getRecipeInstructions(id){
      try {
        const response = await this.axios.get(
          "http://localhost:3000/api/recipes/getRecipeInstructions",
          {
            params: { recipeId: id }
          }
        );

        if (response.status != '200') this.$router.replace("/NotFound");
        else {
          return response.data;
        }
        
        } catch (error) {
          console.log("response.status", response.status);
          this.$router.replace("/NotFound");
          return;
        }
    },
    async addFavorite() {
      //the item is not defined as favorite
      if (this.recipe.isFavorite == "false") {

        try {
          const response = await this.axios.post(
           "http://localhost:3000/api/users/addFavoriteRecipe", 
           {
             recipe_id: this.recipe.id
            }
          );

          if (response.status == '201') {
            this.favoriteURL = favorite;
            this.recipe.isFavorite = "true";
          }

          else {
            console.log("add favorite recipe failed");
          }
        } catch(error) {
          console.log(error);
        }
        
      }

      else {
        console.log("The item already defined as favorite");
      }
    },
    async addWatched(id) {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/api/users/addWatchedRecipe", 
          {
            recipe_id: id
          }
        );

        if (response.status != '201') {
            console.log("add watched recipe failed");
        }
      } catch(error) {
        console.log(error);
      }
    }  
  }
};
</script>

<style lang="scss" scoped>
#container{
  font-family: "PoiretOne";
  margin-top: 30px;
  max-width: 1000px;
}

#img{
  height: 100%;
  width: 550px;
  object-fit: cover;
}

#recipe-details{
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 14pt;
}

.icons {
  width: 50px;
  height: 50px;
}

#title {
  font-weight: bold;
  font-size: 28pt;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}
.text, .headers {
  font-weight: bold;
  font-size: 14pt;
  text-align: left;
}
.headers {
  font-size: 20pt;
}

#like{
  margin-right: 10px;
  width: 35px;
  height: 35px;
}

#favorite{
  margin-right: 30px;
  margin-bottom: 15px;
}

.lists{
  margin-top: 10px;
}


</style>
