<template>
 <mdb-container id="listContainer">
    <mdb-col>
      <mdb-row v-for="item in data" :key="item.id" class="row">
        <figure class="recipePreview">
          <recipe-preview :recipe="item" />
        </figure>
      </mdb-row>  
    </mdb-col>      
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbIcon, mdbBtn, mdbLightbox, mdbCarousel, mdbCard, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbNavItem } from "mdbvue";
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
    mdbContainer,
    mdbRow,
    mdbCol,
  },
  props: {
    data  : {
      type: Array,
      required: true
    },
  }
};
</script>

<style lang="scss" scoped>
.recipePreview{
  padding-top: 40px;
}

</style>
