<!-- src/components/Header.vue -->
<template>
  <el-header class="header">
    <div class="nav-container">
      <div class="nav-left">
        <!-- 用普通按钮替代菜单 -->
        <el-button type="text" @click="goHome">首页</el-button>
      </div>
      <div class="nav-right">
        <!-- 未登录，显示登录和注册 -->
   <!-- <el-button type="text" @click="goLogin">登录</el-button>
        <el-button type="primary" plain @click="goRegister">注册</el-button> -->
      <div v-if="!isLoggedIn">
        <el-button type="text" @click="goLogin">登录</el-button>
        <el-button type="primary" plain @click="goRegister">注册</el-button>
      </div>
        <!-- 已登录，显示登出 -->
        <el-button v-else type="text" @click="doLogout">登出</el-button>
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'
// 添加computed计算属性
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/useAuthStore'

const router = useRouter()

const auth = useAuthStore()
const { username } = storeToRefs(auth)

const isLoggedIn = computed(() => !!username.value)

function goHome() {
  router.push('/home') // 导航到首页路径
}

function goLogin() {
  router.push('/login')
}

function goRegister() {
  router.push('/register')
}

function doLogout()  { 
  auth.logout(); 
  router.push('/home') 
}
</script>


<style scoped>
.header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-left .menu {
  border-bottom: none;
}

.nav-right {
  display: flex;
  gap: 10px;
}
</style>