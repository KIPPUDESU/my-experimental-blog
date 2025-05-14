<template>
  <div>
    <el-card
      v-for="item in articleStore.articles"
      :key="item.id"
      class="post-card"
      @click="toDetail(item.id)"
      style="margin-bottom: 20px; cursor: pointer;"
      shadow="hover"
    >
    <!-- 封面图 -->
    <el-image
      v-if="item.cover"
      :src="item.cover"
      fit="cover"
      style="width:100%; height:180px; margin-bottom:10px;"
    />
      <h3>{{ item.title }}</h3>
      <p>分类：{{ item.category }} | 时间：{{ item.createdAt.slice(0,10) }}</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useArticleStore } from '../store/useArticleStore'
import { useRouter } from 'vue-router'

const articleStore = useArticleStore()
const router = useRouter()

function toDetail(id: number) {
  router.push(`/article/${id}`)
}
</script>
