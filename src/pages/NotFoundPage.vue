<template>
  <div id="container">
    <h1 id="title">Oops.. No recipe was found here</h1>
    <img id="img" src="../assets/images/404.jpg"/>
    <router-link id="link" to="/" exact>Back to home page</router-link>
  </div>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: "NanumPenScript";
  src: url("../assets/fonts/NanumPenScript-Regular.ttf");
  font-weight: normal;
  font-style: normal;
}
#container{
  margin-right: auto;
  margin-right: auto;
}
#title{
  font-family: "NanumPenScript";
  font-size: 40pt;
}
#link{
  font-family: "NanumPenScript";
  font-size: 20pt;
  position: absolute;
  top: 85%;
  left: 47.5%;
  transform: translate(-30%, -10%);
  z-index:2;
  color: black;
  font-weight: bold;
}

#img{
  width: 650px;
  height: 100%;
  object-fit: cover;
  display: inline-block;  
  position: relative;
}

</style>