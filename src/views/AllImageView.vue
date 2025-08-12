<script setup>
import router from "@/router/index.js";
import {inject} from "vue";
import imageData from '@/assets/imageData.json';

const latestImages = imageData.latest;
const allImages = imageData.all;

const getVisibleImages = inject("getVisibleImages");
</script>

<template>
  <div class="">
    <div class="latest-box">
      <h1>Latest Photos</h1>
      <div class="latest-photos">
        <el-row :gutter="20">
          <el-col :xs="24"
                  :sm="24"
                  :md="12"
                  :lg="8"
                  v-for="(image, index) in getVisibleImages(latestImages)" :key="index"
                  style="margin-top: 20px;"
          >
            <el-image loading="lazy"
                      :src="image.path"
                      :alt="image.filename"
                      style="border: 2px solid var(--el-border-color)"
            />
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="folder-box"
         v-for="folder_image in allImages" :key="folder_image"
    >
      <el-link @click="()=>{
          router.push({
            name:'FolderImageView',
            params:{
              folder: folder_image.folder
            }
          })
        }"
               underline="never"
               type="default"
      ><h1>{{ folder_image.folder }}</h1>
      </el-link>
      <el-row :gutter="20">
        <el-col :xs="24"
                :sm="24"
                :md="12"
                :lg="8"
                v-for="(image, index) in getVisibleImages(folder_image.images)"
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
    </div>
  </div>
</template>

<style scoped>

</style>