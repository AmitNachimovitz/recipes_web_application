<template>
  <div class="recipe-preview">
    <div class="recipe-body">
      <router-link
        :to="{ name: 'recipe', params: { recipe: recipe }  }"
      >
        <img :src="recipe.image" class="recipe-image" /> 
      </router-link>
      <div :title="recipe.name" class="recipe-title">{{ recipe.name }}</div> 
    </div>
    <div class="recipe-footer">
      <div v-if="this.$root.store.username">
        <div v-if="recipe.isPublic">
          <img :src="viewURL" class="leftIcons" />
          <img :src="favoriteURL" v-on:click="addFavorite" class="leftIcons" />
        </div>
      </div>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
        <li>{{ recipe.servings }} Number of servings</li>
        <li v-if="recipe.vegetarian"> <img src="../assets/images/vegeterian2.png" class="icons"/>
        <img v-if="recipe.vegan" src="../assets/images/vegan3.jpg" class="icons"/>
        <img v-if="recipe.glutenFree" src="../assets/images/gluten_free.jpg" class="icons"/> </li>
      </ul>
    </div>
  </div>
</template>

<script>
import viewed from "../assets/images/view.png";
import notViewed from "../assets/images/no-view.png";
import notFavorite from "../assets/images/no-favorite.png";
import favorite from "../assets/images/favorite.png";

export default {
  mounted() {
    if (this.recipe.isPublic) {
      this.viewURL = this.recipe.isWatched == "true" ? viewed : notViewed;
      this.favoriteURL = this.recipe.isFavorite == "true" ? favorite : notFavorite;
    }

  },
  data() {
    return {
      viewURL: "",
      favoriteURL: ""
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    async addFavorite() {
      //the item isn't defined as favorite
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
            this.recipe.isFavorite = true;
          }

          else {
            console.log("add favorite recipe failed");
          }
        } catch(error) {
          console.log(error);
        }
      }
    },
    changeView() {
      this.viewURL = viewed;
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
.recipe-preview {
  margin-left: auto;
  margin-right: auto;
  font-family: 'PoiretOne';
  color: black;
  display: block;
  width: 450px;
  height: 100%;
  position: relative;
}
.recipe-preview > .recipe-body {
  position: relative;
  text-align: center;
  color: black;
}

.recipe-preview .recipe-body .recipe-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.recipe-preview .recipe-footer {
  text-align: center;
}

.recipe-preview .recipe-body .recipe-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 28pt;
  font-weight: bold;
  color: white;
  width: 400px;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding-top: 5px;
  list-style-type: none;
   margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  margin-left: 80px;
  font-size: 14pt;
  font-weight: bold;
  width: 200px;
}

.icons {
  width: 50px;
  height: 50px;
}

.leftIcons {
  float: left;
  width: 40px;
  height: 40px;
}
</style>