
<template>
 <recipe-preview-list :data="lastViewed" />
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
export default {
  name: "LastViewed",
  components: {
    'recipe-preview-list' : RecipePreviewList
  },
  data() {
      return {
          lastViewed: []
      }
  },
  async created() {
    const lastVisitResponse = await this.axios.get(
        "http://localhost:3000/api/users/getLastVisitedRecipes"
        );

    if (lastVisitResponse.status != '200') {
        console.log("Last visited recipes not exists");
    }

    else {
        //check if the user has viewed recipes
        if (lastVisitResponse.data) {
            let tmpRecipes = lastVisitResponse.data;
            //get user data recipes (is view & is favorite)
            let recipesDetails =  await this.getUserRecipesData(tmpRecipes);
            if (recipesDetails != "") {
                Object.keys(tmpRecipes).forEach(recipe => {              
                    tmpRecipes[recipe].isWatched = recipesDetails[recipe].isWatched;
                    tmpRecipes[recipe].isFavorite = recipesDetails[recipe].isFavorite;
                    tmpRecipes[recipe].isPublic = true;
                });
            }
            this.lastViewed = Object.values(tmpRecipes);
        }
    }
  },
  methods: {
    async getUserRecipesData(recipes) {

        try {
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

        } catch (error) {
            console.log("Failed to get details on recipes");
        }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
