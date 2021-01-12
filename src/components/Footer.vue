<template>
<b-container fluid id="container">
  <b-row id="img_row">
    <b-col>
        <img src="../assets/images/footer/orange.jpg" class="footer_img" />
    </b-col>
    <b-col>
        <img src="../assets/images/footer/pancake.jpg" class="footer_img" />
    </b-col>
    <b-col>
        <img src="../assets/images/footer/coffee.jpg" class="footer_img" />   
    </b-col>
    <b-col>
        <img src="../assets/images/footer/strawberry.jpg" class="footer_img" />
    </b-col>
    <b-col>
        <img src="../assets/images/footer/chocolate.jpg" class="footer_img" />
    </b-col>
    <b-col>
        <img src="../assets/images/footer/croissant.jpg" class="footer_img" />
    </b-col>
    <b-col>
        <img src="../assets/images/footer/carrots.jpg" class="footer_img" />
    </b-col>
  </b-row>
  <b-row>
      <b-col>
        <div id="copyrights">© 2020 Copyright: Yaar May-Paz &amp; Amit Nachimovitz
        </div>
      </b-col>
  </b-row>    
</b-container>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
    };
  }
}
</script>
<style lang="scss" scoped>
@font-face {
    font-family: 'PoiretOne';
    src: url("../assets/fonts/PoiretOne-Regular.ttf");
    font-weight: normal;
    font-style: normal;
  }
#container{
    margin-top: 200px;
    height: 400px;
    background-color: black;
}

#img_row{
    padding-top: 50px;
}

.col{
    padding-left: 0px;
    padding-right: 0px;
    margin-right: 0px;
    margin-left: 0px;
}

.footer_img{
    width: 190px;
    height: 240px;
    object-fit: cover;
}

#copyrights{
    padding-top: 60px;
    font-size: 8pt;
    font-family: 'PoiretOne';
    color: white;
}

</style>