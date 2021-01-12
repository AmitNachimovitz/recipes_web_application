<template>
  <div id="app">
    <div id="banner">
      <div id="logo">
        <img src="./assets/images/scaledLogo.png" />
      </div>
    </div>
    <div id="nav" >
      <b-navbar>
        <b-navbar-nav id="navbar" fill>
          <b-nav-item>
            <router-link :to="{ name: 'main' }">Recipes</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{ name: 'search' }">Search</router-link>
          </b-nav-item>
          <b-nav-item v-if="!this.$root.store.username">
            <router-link :to="{ name: 'register' }">Register</router-link>  
          </b-nav-item>
          <b-nav-item v-if="!this.$root.store.username">
            <router-link :to="{ name: 'login' }">Login</router-link>  
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{ name: 'about' }">About</router-link>  
          </b-nav-item>
          <b-nav-item id="logout" v-on:click="Logout" v-if="this.$root.store.username">
            Logout
          </b-nav-item>
            <div id="hello">
              Hello
            </div>  
          <b-nav-item-dropdown  v-if="this.$root.store.username" class="user-dropdown" :text="this.$root.store.username">
            <b-dropdown-item class="item">
              <router-link :to="{ name: 'favoriteRecipes' }">Favorite Recipes</router-link>
            </b-dropdown-item>
            <b-dropdown-item class="item">
              <router-link :to="{ name: 'familyRecipes' }">Family Recipes</router-link> 
            </b-dropdown-item>
            <b-dropdown-item class="item">
              <router-link :to="{ name: 'personalRecipes' }">Personal Recipes</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <div v-else id="guest">
            guest
          </div>  

        </b-navbar-nav>  
      </b-navbar>
    </div>
    <router-view />
    <Footer/>  
  </div>
</template>
<script>
import Footer from "./components/Footer";
export default {
  name: "App",
  components:{
    Footer
  },
    data (){
    return {
      paddingSize: 350,
    }
  },
  methods: {
    async Logout() {  
      try {
        const response = await this.axios.post(
          "http://localhost:3000/logout"
        );
      } catch (err) {
        
      }
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
      this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
@font-face {
    font-family: 'IndieFlower';
    src: url("./assets/fonts/IndieFlower.ttf");
    font-weight: normal;
    font-style: normal;
  }

#app {
  text-align: center;
  min-height: 100vh;
  margin-right: auto;
  margin-left:  auto;
  max-width: 100%;
  padding-right: 0px;
  padding-left:  0px;
}

#logo{
  object-fit: contain;
  margin: auto;
  padding-top: 20px;
  padding-bottom:20px;
}

#banner{
  text-align: center;
  max-width: 100%;
  height: 200px;
}

#logout{
  font-weight: bold;
  font-size: 1.3em; 
}

#navbar{
  margin-right: auto;
  margin-left: auto;
}

#nav {
  //margin: auto;
  padding-top: 20px;
  margin-right: 10px;
  margin-left: auto;
  width: 100%;
  height: 100px;
}

#nav a {
  font-family: "indieFlower";
  font-weight: bold;
  font-size: 1.3em; 
  color:  black;
}

#nav a.router-link-exact-active {
  color: black;
}

.user-dropdown{
  padding-top: 2px;
  font-family: "indieFlower";
  color:  black;
  font-size: 1.3em;
}

#hello{
  margin-top: 10px;
  padding-left: 150px;
  font-family: "indieFlower";
  font-weight: bold;
  font-size: 1.6em; 
  color:  black;
}

.item {
 font-family: "indieFlower";  
  font-size: 11pt; 
}

#guest{
  margin-top: 10px;
  margin-left: 5px;
  font-family: "indieFlower";
  font-weight: bold;
  font-size: 1.6em; 
  color:  black;
}
</style>
