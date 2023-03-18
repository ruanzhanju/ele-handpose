<script setup lang="ts">
import useConfig from '@renderer/composables/useConfig'
import { ElCard } from 'element-plus'

const { config } = useConfig()
</script>

<template>
  <div class="p-1">
    <el-card
      v-for="strategy in config.operatekm.value.strategies"
      :key="strategy.name"
      shadow="hover"
      :body-style="{ padding: '20px' }"
    >
      {{ strategy }}
    </el-card>
  </div>
</template>

<style scoped></style>
