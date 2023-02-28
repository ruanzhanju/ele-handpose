<script setup lang="ts">
import { ref } from 'vue'

const devices = await navigator.mediaDevices.enumerateDevices()
const cameras = devices.filter((d) => d.kind.includes('video'))
const deviceId = ref('')

const onSubmit = (): void => {}
</script>

<template>
  <div class="bg-[#2c3e50] w-screen h-screen p-5">
    <h2 class="mb-5 text-gray-50 text-center text-sm opacity-70">配置参数</h2>
    <el-form ref="form" label-width="auto" :inline="false" size="default" label-position="top">
      <el-form-item>
        <el-select v-model="deviceId" placeholder="选择摄像头" filterable>
          <el-option
            v-for="item in cameras"
            :key="item.deviceId"
            :label="item.label"
            :value="item.deviceId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
