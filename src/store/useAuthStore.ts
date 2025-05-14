// src/store/useAuthStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // 真实项目可在这里初始化从 localStorage 读取
  const username = ref<string | null>(localStorage.getItem('username'))
  const role = ref<string | null>(localStorage.getItem('role'))

  function login(name: string, userRole?: string) {
    username.value = name
    role.value = userRole || null
    localStorage.setItem('username', name)
    if (userRole) localStorage.setItem('role', userRole)
  }

  function logout() {
    username.value = null
    role.value = null
    localStorage.removeItem('username')
    localStorage.removeItem('role')
  }

  return { username, role, login, logout }
})
