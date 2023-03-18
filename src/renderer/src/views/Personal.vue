<script setup lang="ts">
import { ElDivider } from 'element-plus'
import AnimationHeader from '@renderer/components/AnimationHeader.vue'
import KeyMapGrid from '@renderer/components/KeyMapGrid.vue'
</script>

<template>
  <div class="h-full flex flex-col">
    <AnimationHeader />
    <article class="flex-1 overflow-y-auto">
      <el-divider direction="horizontal" content-position="center">
        <h4 class="text-gray-400 text-lg font-bold">管理手势快捷键方案</h4>
      </el-divider>
      <!-- keyMap 栅格容器列表 -->
      <KeyMapGrid />
    </article>
  </div>
</template>

<style lang="less" scoped></style>
