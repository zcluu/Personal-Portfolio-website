<script setup>
import {ref, watch, inject, onMounted} from "vue";
import {useRoute} from "vue-router";
import imageData from '@/assets/imageData.json';

const route = useRoute();

const imagesColNum = inject("imagesColNum");

const allImages = ref([]);
const images = ref([]);
for (const folder_info of imageData.all) {
  if (route.params.folder === folder_info.folder) {
    for (const image of folder_info.images) {
      allImages.value.push(image);
    }
  }
}

const pageNum = ref(1);
const pageSize = ref(10);

const updatePageSize = () => {
  console.log(imagesColNum.value)
  pageSize.value = imagesColNum.value * 5;
}
watch(imagesColNum, (val) => {
  updatePageSize();
})

const updatePage = () => {
  const start = (pageNum.value - 1) * pageSize.value;
  const end = pageNum.value * pageSize.value;
  const newImages = allImages.value.slice(start, end);
  images.value = newImages;
}
watch(pageNum, () => {
  updatePage();
})
watch(pageSize, () => {
  updatePage();
})

onMounted(() => {
  updatePage();
  updatePageSize();
})

</script>

<template>
  <h1>{{ route.params.folder }}</h1>
  <el-row :gutter="20">
    <el-col :xs="24"
            :sm="24"
            :md="12"
            :lg="8"
            v-for="(image, index) in images"
            :key="image.path"
            style="margin-top: 20px;"
    >
      <transition name="el-fade-in-linear">
        <el-image loading="lazy"
                  :src="image.path"
                  :alt="image.filename"
                  :preview-src-list="[image.path]"
                  style="border: 2px solid var(--el-border-color)"
        />
      </transition>
    </el-col>
  </el-row>
  <el-pagination layout="prev, pager, next"
                 :total="allImages.length"
                 :pageSize="pageSize"
                 v-model:current-page="pageNum"
                 @update:current-page="updatePage"
  />
</template>

<style scoped>

</style>