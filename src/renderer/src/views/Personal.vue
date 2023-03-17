<script setup lang="ts">
import { ElDivider, ElCard } from 'element-plus'
import AnimationHeader from '@renderer/components/AnimationHeader.vue'
</script>

<template>
  <div class="h-screen flex flex-col">
    <AnimationHeader />
    <article class="flex-1 overflow-y-auto">
      <el-divider direction="horizontal" content-position="center">
        <h4 class="text-gray-400 text-lg">管理手势快捷键方案</h4>
      </el-divider>
      <div class="keyMap-container">
        <el-card key="default">plus</el-card>
        <el-card v-for="i in 10" :key="i" shadow="always"> card body{{ i }} </el-card>
      </div>
    </article>
  </div>
</template>

<style lang="less" scoped>
.keyMap-container {
  @apply px-6 pb-6 grid justify-center gap-6;
  grid-template-columns: repeat(auto-fill, 18rem);
}
</style>
