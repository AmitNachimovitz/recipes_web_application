<template>
    <b-container fluid id="container">
        <h1 id="header">Family Recipes</h1>
        <b-row>
            <b-col>
                <Decorator :key="familyRecipes.length" v-if="familyRecipes" :amount="familyRecipes.length" />
            </b-col> 
            <b-col>
                <recipe-preview-list :data="familyRecipes"/>
            </b-col>
            <b-col>
                <Decorator :key="familyRecipes.length" v-if="familyRecipes" :amount="familyRecipes.length" />
            </b-col>
        </b-row>
    </b-container>                
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import Decorator from "../components/Decorator";
export default {
    components: {
        'recipe-preview-list' : RecipePreviewList,
        Decorator
    },
    data () {
        return {
            familyRecipes: []
        }
    },
    async created() {
        try {
            const response = await this.axios.get(
                "http://localhost:3000/api/users/getUserFamilyRecipes"
            );
            if (response.status !== 200) {
                console.log("get user family recipes failed");
            }
            this.familyRecipes = Object.values(response.data);
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