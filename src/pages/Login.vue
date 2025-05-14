<template>
  <div class="form-container">
    <el-card class="box-card">
      <h2 class="title">用户登录</h2>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="80px"
        class="login-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { useAuthStore } from '../store/useAuthStore'

// 数据模型
const loginForm = reactive({
  username: '',
  password: ''
})

// 校验规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不少于6位', trigger: 'blur' }
  ]
}

const loginFormRef = ref<FormInstance>()

const router = useRouter()

const auth = useAuthStore()

function onSubmit() {
  loginFormRef.value?.validate((valid) => {
    if (valid) {
      // TODO：对接实际登录 API
      // console.log('登录成功，用户名：', loginForm.username)
      // router.push('/home')
      auth.login(loginForm.username, 'user')
      // 可选：localStorage.setItem('role', 'admin')  // 模拟管理员
      // localStorage.setItem('role', 'admin')
      router.push('/home')
    }
  })
}

function onReset() {
  loginFormRef.value?.resetFields()
}
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.box-card {
  width: 100%;
  max-width: 400px;
  margin: 0 10px;
}
.title {
  text-align: center;
  margin-bottom: 20px;
}
.login-form {
  width: 100%;
}
</style>
