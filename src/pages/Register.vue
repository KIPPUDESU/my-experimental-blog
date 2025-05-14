<template>
  <div class="form-container">
    <el-card class="box-card">
      <h2 class="title">用户注册</h2>
      <el-form
        ref="regFormRef"
        :model="regForm"
        :rules="regRules"
        label-width="80px"
        class="reg-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="regForm.username" autocomplete="off" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="regForm.email" autocomplete="off" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="regForm.password"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item label="确认密码" prop="confirm">
          <el-input
            type="password"
            v-model="regForm.confirm"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onRegister">注册</el-button>
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
// 为自定义校验函数添加显式类型
import type { FormItemRule } from 'element-plus'

// 数据模型
const regForm = reactive({
  username: '',
  email: '',
  password: '',
  confirm: ''
})

// 校验规则（含自定义校验）
// const regRules = {
  const regRules: Record<string, FormItemRule[]> = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur','change'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不少于6位', trigger: 'blur' }
  ],
  confirm: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      // 由于 TypeScript 无法从你的匿名函数签名中推断参数类型
      // 于是把 rule、value、callback 都当成 any
      // 甚至把返回值推断为 never，导致报错

      // validator: (rule, value, callback) => {
        validator: (
          // 尝试用 FormItemRule 来描述自定义校验函数的参数类型
          // 但实际上Element使用的是 AsyncValidator 提供的更复杂的校验函数类型
          // 其中 validator 是 5 个参数 的函数，而你只写了 3 个参数。

          // 使用 any 绕过严格类型
          _rule: any,
          value: string,
          callback: (err?: Error) => void
        ) => {
        if (value !== regForm.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const regFormRef = ref<FormInstance>()
const router = useRouter()

function onRegister() {
  regFormRef.value?.validate((valid) => {
    if (valid) {
      // TODO：对接实际注册 API
      // console.log('注册成功，用户信息：', regForm)
      // router.push('/login')
      // 注册成功后
      localStorage.setItem('username', regForm.username)
      router.push('/home')
    }
  })
}

function onReset() {
  regFormRef.value?.resetFields()
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
.reg-form {
  width: 100%;
}
</style>
