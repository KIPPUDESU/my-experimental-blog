<template>
  <div>
    <el-button type="primary" @click="openDialog()">新建文章</el-button>
    <el-table :data="articleStore.articles" style="width: 100%; margin-top: 20px;">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="category" label="分类" />
      <el-table-column prop="createdAt" label="创建时间" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="text" @click="edit(row)">编辑</el-button>
          <el-button type="text" color="danger" @click="remove(row.id)">删除</el-button>

          <el-divider>评论管理</el-divider>
      <el-table :data="commentStore.comments" style="width: 100%; margin-top: 20px;">
        <el-table-column prop="articleId" label="文章 ID" width="120" />
        <el-table-column prop="author"   label="评论人"  width="120" />
        <el-table-column prop="content"  label="内容" />
        <el-table-column prop="createdAt" label="时间" width="160" />
        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button type="text" color="danger" @click="removeComment(row.id)">
              删除
            </el-button>
        </template>
      </el-table-column>
    </el-table>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新建 / 编辑 弹窗 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible">
      <el-form ref="formRef" :model="form" label-width="80px">
        <!-- 弹窗表单中添加封面上传 -->
        <el-form-item label="封面 URL" prop="cover">
        <!-- 上传按钮 -->
  <el-button type="primary" @click="fileInput?.click()">上传封面</el-button>
  <!-- 隐藏的文件输入 -->
  <input
    ref="fileInput"
    type="file"
    accept="image/*"
    style="display: none"
    @change="onFileChange"
  />
  <!-- 预览区域 -->
  <div v-if="form.cover" style="margin-top: 10px;">
    <el-image
      :src="form.cover"
      fit="cover"
      style="width: 120px; height: 80px; border: 1px solid #ebeef5;"
    />
  </div>
</el-form-item>

        <el-form-item label="标题">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="分类">
          <el-input v-model="form.category" />
        </el-form-item>
        <el-form-item label="正文">
          <el-input type="textarea" v-model="form.content" rows="6" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useArticleStore } from '../store/useArticleStore'

import { useCommentStore } from '../store/useCommentStore'
// 正确的做法是使用 import type 语法(仅类型导入)
import type { Article } from '../store/useArticleStore'
// 导入原生 DOM 类型
import type { FormInstance } from 'element-plus'

const articleStore = useArticleStore()

// 弹窗状态
const dialogVisible = ref(false)
const dialogTitle = ref('')

// const formRef = ref()
const formRef = ref<FormInstance>()
const form = reactive<Omit<Article, 'id' | 'createdAt'>>({
  title: '',
  category: '',
  content: '',
  cover: ''   // ← 新增字段
})

const fileInput = ref<HTMLInputElement | null>(null)

const commentStore = useCommentStore()

function removeComment(id: number) {
  commentStore.remove(id)
}

let editId: number | null = null

function onFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files
  if (!files || !files.length) return
  const file = files[0]
  const reader = new FileReader()
  reader.onload = () => {
    // reader.result 是 Base64 格式的 Data URL
    form.cover = reader.result as string
  }
  reader.readAsDataURL(file)

  // 如果有后端接口，改为：
  // uploadImage(file).then(url => form.cover = url)
}


function openDialog() {
  dialogTitle.value = '新建文章'
  dialogVisible.value = true
  editId = null
  form.title = ''
  form.category = ''
  form.content = ''
  form.cover = ''    // ← 新增字段
}

function edit(article: Article) {
  dialogTitle.value = '编辑文章'
  dialogVisible.value = true
  editId = article.id
  form.title = article.title
  form.category = article.category
  form.content = article.content
}

function save() {
  if (editId === null) {
    articleStore.add(form)
  } else {
    articleStore.update({ id: editId, createdAt: articleStore.getById(editId)!.createdAt, ...form })
  }
  dialogVisible.value = false
}

function remove(id: number) {
  articleStore.remove(id)
}
</script>

<style scoped>
/* 可按需调整样式 */
</style>
