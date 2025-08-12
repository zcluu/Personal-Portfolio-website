<script setup>
import {RouterView} from 'vue-router'
import {ref, watch, onMounted} from "vue";
import SwitchDarkButton from "@/components/SwitchDarkButton.vue";

const isDark = ref(false);

const switchBtnClassName = ref("switch-btn-dark");

watch(isDark, () => {
  switchBtnClassName.value = isDark.value ? 'switch-btn-white' : 'switch-btn-dark'

  const html = document.documentElement
  if (isDark.value) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }

  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
})

onMounted(() => {
  const theme = localStorage.getItem('theme')
  if (theme === 'dark') {
    isDark.value = true
  }
})

</script>

<template>
  <el-container class="dark">
    <el-header style="display: flex;">
      <div style="flex: 1"></div>
      <el-space :size="30">
        <el-link
            href="https://scholar.google.com/citations?user=byXIEVMAAAAJ&hl=en"
            target="_blank"
        >Google Scholar
        </el-link>
        <el-link
            href="https://cslzc.py00.top/#/"
            target="_blank"
        >About Me
        </el-link>
        <el-link href="mailto:zclu@zju.edu.cn">Contact Me</el-link>
        <SwitchDarkButton/>
      </el-space>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>
