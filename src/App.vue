<!-- src/App.vue -->
<template>
  <div class="layout">
    <Header v-if="showHeader" />
    <main class="main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
// 添加方法
// 根据当前路由的 name 决定是否渲染 <Header>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
// 当路由为 Login 或 Register 时不显示 Header
const showHeader = computed(() => !['login', 'register'].includes(route.name as string))
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
  padding: 20px;
  background: #f8f9fa;
}
</style>
