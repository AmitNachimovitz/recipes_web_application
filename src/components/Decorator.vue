<template>
  <b-container id="container">
    <img :style="image.style" class="image" :key="image.id" :src="getImgUrl(image.src)" v-for="image in addedImage">
  </b-container>    
</template>

<script>
export default {
  name: "Decorator",
    data() {
        return {
        nextId: 100,    
        images: [
            '1.png',
            '2.png',
            '3.png',
            '4.png',
            '5.png',
            '6.png',
            '7.png',
            '8.png', 
        ],
        addedImage: [],
        imgTop: 0,
        imgLeft: 0,
        imgHeight: 80,
        imgWidth: 80,
        containerWidth: 300,
        selectedImage: ''
        }
    },
      props: {
        amount: {
          type: Number,
          required: true
        }
      },  
    mounted() {
      let numIcons = this.amount; 
      if (numIcons >= 3) numIcons++;
      for (let i = 0; i < numIcons; i++) {
        this.randomImage();
        i == 0 ? this.randomPosition(0) : this.randomPosition(350); 
        this.addImage();
      }
    },
    methods: {
    getImgUrl(pic) {
        return require('../assets/images/decorator/' + pic)
    },
    randomImage() {
        const idx = Math.floor(Math.random() * this.images.length);
        this.selectedImage = this.images[idx];
    },
    randomPosition(offset) {
        const randomPos = twoSizes => Math.round(Math.random() * twoSizes);
        this.imgTop = this.imgTop + offset;
        this.imgLeft = randomPos(100 - this.imgWidth);
    },
    addImage(){
        this.addedImage.push({
        style: {
            top: `${this.imgTop}px`,
            left: `${this.imgLeft}px`,
            height: `${this.imgHeight}px`,
            width: `${this.imgWidth}px`
        },
        src: this.selectedImage,
        id: this.nextId++
        });
    }
  }
}
</script>

<style lang="scss" scoped>
#container{
    max-width: 300px;
}
.image {
  position: relative;
}
</style>