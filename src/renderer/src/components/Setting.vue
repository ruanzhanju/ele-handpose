<script setup lang="ts">
import useConfig from '@renderer/composables/useConfig'
import { ElForm, ElFormItem, ElOption, ElSelect } from 'element-plus'

const { config } = useConfig()
</script>

<template>
  <div class="mx-4 border-t-2">
    <h1 class="mt-4 flex justify-center text-lg text-gray-400">配置参数</h1>
    <div class="flex justify-center">
      <el-form label-position="top">
        <el-form-item label="摄像头">
          <el-select v-model="config.deviceId.value" placeholder="请选择摄像头" class="w-80">
            <el-option
              v-for="item in config.cameras.value"
              :key="item.deviceId"
              :label="item.label"
              :value="item.deviceId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="键盘手势映射方案">
          <el-select class="w-80"></el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped></style>
