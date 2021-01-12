<template>
  <b-container fluid id="container">
    <b-row id="searchRow"> 
      <div id="searchContainer">
        <img id="bg" src="../assets/images/search_bg.jpg"/>
        <mdb-form-inline id="form" class="md-form active-cyan-2 ">
          <mdb-input v-model="query" type="text" placeholder="Search" aria-label="Search"/>
          <mdbIcon icon="search" />
          <img v-on:click="search" id="searchIcon" src="../assets/images/search.png" />
        </mdb-form-inline>
      </div>  
    </b-row> 
    <b-row id="optionsRow">
        <b-col class="options">
          <label class="labels">Diet</label>
          <b-form-select  v-model="selectedDiet" :options="dietOptions"></b-form-select>
        </b-col>
        <b-col class="options">
          <label class="labels">Cuisine</label>
          <multiselect  v-model="selectedCuisine" placeholder="Pick cuisine" :options="cuisineOptions" :multiple="true" :close-on-select="false"></multiselect>
        </b-col>
        <b-col class="options">
          <label class="labels">Intolerances</label>
          <multiselect  v-model="selectedIntolerances" placeholder="Intolerances" :options="intolerancesOptions" :multiple="true" :close-on-select="false"></multiselect>
        </b-col>    
        <b-col class="options">
          <label class="labels">Number of Results</label>
          <b-form-select v-model="selectedResultsNum" :options="options"></b-form-select>
        </b-col>
        <b-col class="options">
          <label class="labels">Sort Results</label>
          <b-form-select v-model="selectedSort" :options="sortOptions"></b-form-select>
      </b-col>
    </b-row>
    <b-row>
      <label id="no-results" v-if="isResultsFound==false">No results found.</label>
    </b-row>
    <b-row>
      <b-col>
        <div id="content">
          <h1 class="text">Search.</h1>
          <h1 class="text">Make.</h1>
          <h1 class="text">Eat.</h1> 
          <Decorator :key="icons" v-bind:amount="icons" v-show="isSearch" />
        </div>  
      </b-col>
      <b-col>  
        <div id="resultsContainer">
          <recipe-preview-list v-bind:data="searchResults" id="results"/>
        </div>  
      </b-col>  
      <b-col>
        <Decorator :key="icons" v-bind:amount="icons + 1" v-show="isSearch" />
      </b-col>  
    </b-row> 
  </b-container>
</template>

<script>
  import { mdbIcon, mdbFormInline, mdbInput } from 'mdbvue';
  import Multiselect from 'vue-multiselect';
  import RecipePreviewList from "../components/RecipePreviewList";
  import Decorator from "../components/Decorator";
  export default {
    components: {
      mdbIcon,
      mdbFormInline,
      mdbInput,
      Decorator,
      Multiselect,
      'recipe-preview-list': RecipePreviewList
    },
    data() {
      return {
        isSearch: false,
        query: "",
        options: ['5', '10', '15'],
        selectedResultsNum: '5',
        dietOptions: ['None', 'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 
        'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30'],
        selectedDiet: 'None',
        cuisineOptions: ['African', 'American', 'British', 'Cajun', 'Caribbean','Chinese', 
        'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 
        'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 
        'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'],
        selectedCuisine: [],
        intolerancesOptions: ['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 
        'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'],
        selectedIntolerances: [],
        searchResults: [],
        selectedSort: 'None',
        sortOptions: ['None', 'Preparation time', 'Recipe popularity'],
        isResultsFound: true,
        icons: 0
      };
    },
    created() {
      let lastResults = JSON.parse(sessionStorage.getItem('lastSearch'));
      if (lastResults) {
        this.searchResults = lastResults;
        this.isSearch = true;
        this.icons = this.searchResults.length;
      }
    },    
    methods: {
      search: async function() {
        try {
          const response = await this.axios.get(
            "http://localhost:3000/api/recipes/searchRecipeByName", {
              params: {
                query: this.query,
                number: this.selectedResultsNum,
                ...(this.selectedDiet != 'None' ? {diet: `${this.selectedDiet}`} : {}),
                ...(this.selectedCuisine.length > 0 ? {cuisine: `${this.selectedCuisine}`} : {}),
                ...(this.selectedIntolerances.length > 0 ? {intolerance: `${this.selectedIntolerances}`} : {})
              }
          });

          //there are results
          if (response.status == '200') {
            let tmpResults = response.data; 
            this.isSearch = true;
            this.isResultsFound = true;

            tmpResults = await this.setUserData(tmpResults);
            tmpResults = Object.values(tmpResults);

            //need to sort the results
            if (this.selectedSort != 'None') {
              tmpResults = await this.sortResults(tmpResults);
            }

            this.searchResults = tmpResults;
            this.icons = this.searchResults.length; 
            sessionStorage.setItem('lastSearch', JSON.stringify(this.searchResults));
          }  
          
          //there are no results
          else {
            this.isResultsFound = false;
            this.searchResults = {};
            this.isSearch = false;
            this.icons = 0;
          }

        }
        catch(error) {
          console.log(error);
        }
      },
      async sortResults(searchResults) {
        if (this.selectedSort === 'Preparation time'){
          searchResults.sort((recipeA, recipeB) => {
            return recipeA.readyInMinutes - recipeB.readyInMinutes;
          });
        }

        else {
          searchResults.sort((recipeA, recipeB) => {
            return recipeA.aggregateLikes - recipeB.aggregateLikes;
          });
        }

        return searchResults;
        
      },
      async setUserData(tmpRecipes) {
        //get user data recipes (is view & is favorite)
        let recipesDetails = undefined;
        if (this.$root.store.username) {
          recipesDetails =  await this.getUserRecipesData(tmpRecipes);
        }

        Object.keys(tmpRecipes).forEach(recipe => {     
          if (this.$root.store.username && recipesDetails != "") {         
            tmpRecipes[recipe].isWatched = recipesDetails[recipe].isWatched;
            tmpRecipes[recipe].isFavorite = recipesDetails[recipe].isFavorite;
          }
          tmpRecipes[recipe].isPublic = true;
        });
        return tmpRecipes;
      },
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
      },
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
@font-face {
  font-family: "NanumPenScript";
  src: url("../assets/fonts/NanumPenScript-Regular.ttf");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "PoiretOne";
  src: url("../assets/fonts/PoiretOne-Regular.ttf");
  font-weight: normal;
  font-style: normal;
}
#container{
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}

.text{
  font-family: "NanumPenScript";
  font-size: 46pt;
}

#quote{
  margin-top: 1000px;
  max-width: 300px;
  font-family: "NanumPenScript";
  margin-left: auto;
  margin-right: auto;
  font-size: 20pt;
}

#content{
  margin-top: 70px;
}

#bg{  
  max-width: 100%;
  object-fit: cover;
}

#form{
  position: absolute;
  top: 13%;
  left: 50%;
  transform: translate(-50%, -100%);
  z-index:2;
}

#searchContainer{
  display: inline-block;  
  position: relative;
  z-index:1;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  margin-top: 20px;
}

.options{
  max-width: 300px;
}
#optionsRow{
  width: 90%;
  margin-left: auto;
  margin-right: auto;
   position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -100%);
  z-index:2;
}
#searchIcon{
  margin-left: 10px;
  margin-right: 10px;
  height: 30px;
  width: 30px;
}

#resultsContainer{
  margin-left: auto;
  margin-right: auto;
}

  .active-cyan-2 input[type=text]:focus:not([readonly]) {
      border-bottom: 1px solid #4dd0e1;
      box-shadow: 0 1px 0 0 #4dd0e1;
  }
  .active-cyan input[type=text] {
      border-bottom: 1px solid #4dd0e1;
      box-shadow: 0 1px 0 0 #4dd0e1;
  }
  .active-cyan .fa, .active-cyan-2 .fa {
      color: #4dd0e1;
  }
  .icons {
    width: 60px;
    height: 60px;
  }
  #no-results {
    font-family: "NanumPenScript";
    font-size: 28pt;
    margin-left: auto;
    margin-right: auto;
  }
  .labels {
    font-family: "NanumPenScript";
    font-size: 18pt;
  }
</style>