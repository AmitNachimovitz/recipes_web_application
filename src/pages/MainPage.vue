<template>
  <b-container id="contatiner" fluid> 
    <b-row>
      <b-col>
        <div id="randomListContainer">
          <h2 class="list_headers">Explore these recipes</h2>
          <RecipePreviewList :data="randomRecipes"/>
           <button v-on:click="getRandomRecipes">
              <img src="../assets/images/load.png" class="icons"/>
          </button>
        </div>  
      </b-col>
      <b-col cols=2>
        <div id="contentContainer">
          <blockquote class="quote">
            “All you need is love. But a little chocolate now and then doesn't hurt.”
          </blockquote>   
          <blockquote class="quote">
            “Ask not what you can do for your country. Ask what’s for lunch.”
          </blockquote>  
        </div>  
      </b-col>  
      <b-col>
        <div id="loginContainer" v-if="!this.$root.store.username">
          <img id="long" src="../assets/images/long1.jpg"/>
          <Login id="c_login" />
        </div>
        <div v-else id="lastListContainer">
          <h2 class="list_headers">Last watched recipes</h2>
          <last-viewed-recipes />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LastViewedRecipes from "../components/LastViewed";
import Login from "../components/Login.vue";

export default {
  components: {
    RecipePreviewList,
    'last-viewed-recipes': LastViewedRecipes,
    Login
  },
  data (){
    return {
      randomRecipes: []
    }
  },
  mounted() {
    this.getRandomRecipes();
  },
  methods: {
    async getUserRecipesData(recipes) {

        try {
            if (this.$root.store.username) {
                const recipesIds = Object.keys(recipes);
                const responseUsersDetails = await this.axios.get(
                "http://localhost:3000/api/users/getUserRecipesData?recipes_ids=[" + recipesIds + "]", {
                    query: {
                        recipes_ids: recipesIds
                    }
                });

                if (responseUsersDetails.status == '200') {
                    return responseUsersDetails.data;
                }

                else {
                    console.log("Failed to get details on recipes");
                    return "";
                }
            }

        } catch (error) {
            console.log("Failed to get details on recipes");
        }
    },
    async getRandomRecipes() {
        try {
            const randomResponse = await this.axios.get(
            "http://localhost:3000/api/recipes/getRandomRecipes"
            );

            if (randomResponse.status != 200) {
                console.log("Failed to get random recipes");
            }
            
            else {
                let recipes = randomResponse.data;
                //this is a logged in user
                let recipesDetails = undefined;
                if (this.$root.store.username) {
                    recipesDetails = await this.getUserRecipesData(recipes);
                }
                
                Object.keys(recipes).forEach(recipe => {      
                  if (this.$root.store.username) {       
                    recipes[recipe].isWatched = recipesDetails[recipe].isWatched;
                    recipes[recipe].isFavorite = recipesDetails[recipe].isFavorite;
                  }
                recipes[recipe].isPublic = true;
                });

                this.randomRecipes = Object.values(recipes);
            }
        } catch (error) {
            console.log(error);
        }
    }
  }
};
</script>

<style lang="scss" scoped>
@font-face {
    font-family: 'PoiretOne';
    src: url("../assets/fonts/PoiretOne-Regular.ttf");
    font-weight: normal;
    font-style: normal;
  }
@font-face {
  font-family: "NanumPenScript";
  src: url("../assets/fonts/NanumPenScript-Regular.ttf");
  font-weight: normal;
  font-style: normal;
}  
#contatiner{
  padding-top: 10px;
  margin-left: auto;
  margin-right: auto;
}

#loginContainer{
  display: inline-block;  
  position: relative;
  z-index:1;
  margin-top: 80px;
}

#randomListContainer{
  display: inline-block;  
}

#lastListContainer{
  display: inline-block;
}
.list_headers{
  font-family: "PoiretOne";
  font-weight: bold;
  font-size: 1.8em;
}

#contentContainer{
  margin-top: 400px;
}

.quote{
  font-family: "NanumPenScript";
  margin-left: auto;
  margin-right: auto;
  font-size: 20pt;
  margin-bottom: 300px;
}

#c_login {  
  color: white;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -80%);
  z-index:2;
}

#bg{
  width: 450px;
  height: auto;
  object-fit: cover;
}

#long{
  padding-top: 30px;
  width: 450px;
  height: 1240px;
  object-fit: cover;
  position: relative;
}

.icons {
  width: 40px;
  height: 40px;
}
</style>
