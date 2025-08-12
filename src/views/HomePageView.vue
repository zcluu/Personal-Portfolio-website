<script setup>
import {ref, watch, provide, onMounted, onUnmounted} from "vue";

const imagesColNum = ref(3);
const windowWidth = ref(window.innerWidth);
const galleryPadding = ref('lg-padding');

const updateColNum = () => {
  if (windowWidth.value < 992) {
    imagesColNum.value = 1
    galleryPadding.value = 'md-padding'
  } else if (windowWidth.value < 1200) {
    imagesColNum.value = 2
    galleryPadding.value = 'lg-padding';
  } else {
    imagesColNum.value = 3
    galleryPadding.value = 'xl-padding';
  }
}
watch(windowWidth, () => {
  updateColNum();
})
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
}
onMounted(() => {
  window.addEventListener("resize", () => updateWidth())
  updateWidth()
  updateColNum()
})
onUnmounted(() => {
  window.removeEventListener("resize", () => updateWidth())
})

const getVisibleImages = (images) => {
  if (images.length > imagesColNum.value * 2) {
    return images.slice(0, imagesColNum.value * 2);
  } else {
    const imagesCount = Math.floor(images.length / imagesColNum.value) * imagesColNum.value;
    return images.slice(0, imagesCount)
  }
}

provide('getVisibleImages', getVisibleImages)
provide('imagesColNum', imagesColNum)
</script>


<template>
  <div class="image-gallery" :class="galleryPadding">
    <router-view/>
  </div>
</template>

<style scoped>
.image-gallery {
  padding: 0 clamp(20px, 10vw, 200px);
}

.md-padding {
  padding: 0 3%;
}

.lg-padding {
  padding: 0 7%;
}

.xl-padding {
  padding: 0 10%;
}

.image-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>
