<template>
    <b-container fluid id="container">
        <h1 id="header">Favorite Recipes</h1>
        <b-row>
            <b-col>
                <Decorator :key="favoriteRecipes.length" v-if="favoriteRecipes" :amount="favoriteRecipes.length"  />
            </b-col> 
            <b-col>
                <recipe-preview-list :data="favoriteRecipes"/>
            </b-col>
            <b-col>
                <Decorator :key="favoriteRecipes.length" v-if="favoriteRecipes" :amount="favoriteRecipes.length" />
            </b-col>
        </b-row>
    </b-container> 
</template>

<script>
import Decorator from "../components/Decorator";
import RecipePreviewList from "../components/RecipePreviewList.vue";
export default {
    components: {
        'recipe-preview-list' : RecipePreviewList,
        Decorator
    },
    data () {
        return {
            favoriteRecipes: []
        }
    },
    async created() {
        try {
            const response = await this.axios.get(
                "http://localhost:3000/api/users/getUserFavoriteRecipes"
            );
            if (response.status !== 200) {
                console.log("get favorite recipes failed");
            }
            this.favoriteRecipes = Object.values(response.data);
        }
        catch(error) {
          console.log(error);
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

#header{
  font-family: 'PoiretOne';
  font-weight: bold;
  margin-bottom: 40px;
}

#container{  
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}
</style>