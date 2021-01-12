<template>
  <b-container fluid id="container">
    <b-row>
      <b-col>
        <div id="login_pics">
          <img id="fruits" src="../assets/images/fruits.jpg"/>
          <img id="plate" src="../assets/images/plate.jpg"/>
        </div>
      </b-col>
      <b-col>
        <div id="loginContainer">
          <img id="bake" src="../assets/images/loginBGscaled.jpg"/>
          <Login id="c_login" />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Login from "../components/Login.vue";
export default {
  name: "LoginPage",
  components: {
    Login
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 50px;
  padding-right: 5px;
  padding-left: 5px;
}

.col{
  max-width: 38%;
}

#fruits{
width: 650px;
height: 430px;
object-fit: cover;
}

#plate{
width: 650px;
height: 470px;
object-fit: cover;
padding-top: 20px;
}

#bake{
  width: 635px;
  height: 900px;
  object-fit: cover;
  display: inline-block;  
  position: relative;
}

#loginContainer{
  padding-left: 160px;
  display: inline-block;  
  position: relative;
  object-fit: cover;
  text-align: center;
  z-index:1;
}

#c_login {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-30%, -120%);
  z-index:2;
}
   
</style>