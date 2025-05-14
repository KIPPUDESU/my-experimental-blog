// src/store/useCommentStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Comment {
  id: number
  articleId: number
  author: string
  content: string
  createdAt: string
}

export const useCommentStore = defineStore('comment', () => {
  const comments = ref<Comment[]>([])

  // 从 localStorage 加载
  function load() {
    const raw = localStorage.getItem('comments')
    comments.value = raw ? JSON.parse(raw) : []
  }

  // 保存到 localStorage
  function save() {
    localStorage.setItem('comments', JSON.stringify(comments.value))
  }

  // 增
  function add(articleId: number, author: string, content: string) {
    const id = Date.now()
    const createdAt = new Date().toISOString()
    comments.value.push({ id, articleId, author, content, createdAt })
    save()
  }

  // 删
  function remove(id: number) {
    comments.value = comments.value.filter(c => c.id !== id)
    save()
  }

  // 根据文章 ID 获取评论列表
  function listByArticle(articleId: number) {
    return comments.value.filter(c => c.articleId === articleId)
  }

  load()

  return { comments, load, save, add, remove, listByArticle }
})
