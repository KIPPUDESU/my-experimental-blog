<template>
  <div v-if="article">
    <!-- 文章内容同前 -->
    <h2>{{ article.title }}</h2>
    <p>分类：{{ article.category }} | 时间：{{ article.createdAt.slice(0,10) }}</p>
    <div v-html="article.content" class="content" />

    <!-- 评论区 -->
    <section class="comments-section">
      <h3>评论 ({{ commentList.length }})</h3>
      <el-divider />

      <!-- 列表 -->
      <div v-if="commentList.length">
        <el-card
          v-for="c in commentList"
          :key="c.id"
          class="comment-card"
          shadow="never"
        >
          <div class="comment-header">
            <span class="author">{{ c.author }}</span>
            <span class="time">{{ c.createdAt.slice(0,10) }}</span>
            <!-- 管理员可删除评论 -->
            <!-- <el-button
              v-if="isAdmin"
              type="text"
              size="mini"
              @click="deleteComment(c.id)"
            >删除</el-button> -->
          </div>
          <div class="comment-content">{{ c.content }}</div>
        </el-card>
      </div>
      <div v-else class="no-comments">暂无评论，快来抢沙发！</div>

      <!-- 新增评论表单（仅登录可见） -->
      <div v-if="loggedIn" class="add-comment">
        <el-form :model="newComment" ref="formRef" label-width="0">
          <el-form-item prop="content">
            <el-input
              type="textarea"
              v-model="newComment.content"
              placeholder="写下你的评论..."
              rows="3"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="postComment">发表评论</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else class="login-prompt">
        请先 <el-button type="text" @click="goLogin">登录</el-button> 后发表评论
      </div>
    </section>
  </div>
  <div v-else>文章不存在或已删除</div>
</template>

<script setup lang="ts">
// 需要显式地告诉 TypeScript，这个 ref 里存的应该是 Comment[]
// 引入 Comment 类型
import type { Comment } from '../store/useCommentStore'

import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '../store/useArticleStore'
import { useCommentStore } from '../store/useCommentStore'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

// 路由与 Store
const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()
const commentStore = useCommentStore()

const articleId = Number(route.params.id)
const article = ref(articleStore.getById(articleId) || null)

// 评论列表
// const commentList = ref([])
const commentList = ref<Comment[]>([])
function loadComments() {
  commentList.value = commentStore.listByArticle(articleId)
}

// 新评论模型
const newComment = ref({ content: '' })
const formRef = ref()

// 模拟登录状态与用户（后续可对接实际用户系统）
const loggedIn = computed(() => {
  // 假设 localStorage 存了 username
  return !!localStorage.getItem('username')
})
const currentUser = computed(() => localStorage.getItem('username') || '匿名')

// 管理权限判断示例
// const isAdmin = computed(() => localStorage.getItem('role') === 'admin')

// 生命周期函数
onMounted(() => {
  if (!article.value) return
  loadComments()
})

// 跳登录
function goLogin() {
  router.push('/login')
}

// 发布评论
function postComment() {
  if (!loggedIn.value) {
    ElMessage.warning('请先登录再发表评论')
    router.push('/login')
    return
  }

  if (!newComment.value.content.trim()) {
    ElMessage.warning('评论内容不能为空')
    return
  }

  commentStore.add(articleId, currentUser.value, newComment.value.content)
  newComment.value.content = ''
  loadComments()
}


// 删除评论
// function deleteComment(id: number) {
//   commentStore.remove(id)
//   loadComments()
// }
</script>

<style scoped>
.content {
  margin: 20px 0;
  padding: 0 10px;
  line-height: 1.6;
 }

.comments-section {
  margin-top: 40px;
}
.comment-card {
  margin-bottom: 10px;
}
.comment-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #606266;
  margin-bottom: 5px;
}
.comment-content {
  font-size: 14px;
}
.no-comments {
  color: #909399;
  font-style: italic;
}
.add-comment {
  margin-top: 20px;
}
.login-prompt {
  margin-top: 20px;
  color: #409eff;
}
</style>
