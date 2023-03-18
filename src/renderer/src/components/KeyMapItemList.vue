<script setup lang="ts">
import useConfig from '@renderer/composables/useConfig'
import {
  ElForm,
  ElCard,
  ElFormItem,
  ElInput,
  ElCheckboxGroup,
  ElCheckbox,
  FormItemRule
} from 'element-plus'
import { reactive } from 'vue'

const { config } = useConfig()
const rules = reactive<FormItemRule>({
  trigger: 'blur',
  validator: function (_, __, callback): void {
    const keyMapName = config.operatekm.value.name.toString().trim()
    if (keyMapName.length) {
      config.operatekm.value.name = keyMapName
      callback()
    } else {
      callback('请输入非空的方案名字')
    }
  }
})
</script>

<template>
  <!-- 对keyMap增、查、改的组件 -->
  <div class="keyMapItimList">
    <el-form
      label-width="80px"
      :disabled="config.fromDisable.value"
      :inline="false"
      class="grid gap-4"
    >
      <!-- 方案名称 -->
      <el-form-item label="方案名称" prop="keyMapName" :rules="rules">
        <el-input v-model="config.operatekm.value.name" placeholder="请输入方案的名字"></el-input>
      </el-form-item>
      <!-- 循环一个方案的所有映射 -->
      <el-card
        v-for="strategy in config.operatekm.value.strategies"
        :key="strategy.name"
        shadow="always"
        :header="`手势：${strategy.name}`"
        :style="{ width: 'auto', height: '200px' }"
      >
        <el-form-item :key="strategy.name + 'key'" label="key">
          <el-input v-model.trim="strategy.key"></el-input>
        </el-form-item>
        <el-form-item :key="strategy.name + 'modifier'" label="modifier">
          <el-checkbox-group v-model="strategy.modifier">
            <el-checkbox label="alt" />
            <el-checkbox label="command" />
            <el-checkbox label="control" />
            <el-checkbox label="shift" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :key="strategy.name + 'note'" label="说明">
          <el-input v-model.trim="strategy.note" clearable></el-input>
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.keyMapItimList {
  @apply px-4;
  :deep(.el-card__header) {
    padding: 0.5rem;
  }
  :deep(.el-card__body) {
    width: auto;
    height: auto;
    padding: 0.5rem 2rem 0 2rem;
  }
}
</style>
