// src/store/useArticleStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Article {
  id: number
  title: string
  category: string
  content: string
  cover?: string
  createdAt: string
}

export const useArticleStore = defineStore('article', () => {
  // 文章列表
  const articles = ref<Article[]>([])

  // 从 localStorage 初始化
  function load() {
    const raw = localStorage.getItem('articles')
    articles.value = raw ? JSON.parse(raw) : []
  }

  // 保存到 localStorage
  function save() {
    localStorage.setItem('articles', JSON.stringify(articles.value))
  }

  // 新增文章时接收 cover
  function add(article: Omit<Article, 'id' | 'createdAt'>) {
    const id = Date.now()
    const createdAt = new Date().toISOString()
    articles.value.push({ id, createdAt, ...article })
    save()
  }

  // 删
  function remove(id: number) {
    articles.value = articles.value.filter(a => a.id !== id)
    save()
  }

  // 改
  function update(updated: Article) {
    const idx = articles.value.findIndex(a => a.id === updated.id)
    if (idx !== -1) {
      articles.value[idx] = updated
      save()
    }
  }

  // 查
  function getById(id: number) {
    return articles.value.find(a => a.id === id)
  }

  // 初始化
  load()

  return { articles, load, add, remove, update, getById }
})
