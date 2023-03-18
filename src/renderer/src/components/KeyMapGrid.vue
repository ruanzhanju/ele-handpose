<script setup lang="ts">
import useConfig, { TKeyMap } from '@renderer/composables/useConfig'
import { ElCard, ElDrawer, ElScrollbar } from 'element-plus'
import { onActivated, reactive } from 'vue'
import KeyMapItimList from '@renderer/components/KeyMapItemList.vue'

const EL_BODY_STYLE = { padding: 0 } // el-card_body的样式
const { config } = useConfig() // 需要使用keyMapList
const drawer = reactive({
  visable: false,
  title: ''
})
onActivated(async () => {
  // 如果keyMapList长度为0，则没有加载过，应该加载
  if (!config.keyMapList.value.length) {
    await config.reloadKeyMapList()
  }
})
// 点击事件：展示keyMap详细内容
const onShowKeyMap = (km: TKeyMap): void => {
  drawer.title = `${km.name} 的详情`
  config.setOperateKeyMap(km)
  drawer.visable = true
}
// 点击事件：添加keyMap
const onAddKeyMap = (): void => {
  drawer.title = '添加手势快捷键方案'
  config.createEmptyKeyMap()
  drawer.visable = true
}
// 点击事件：修改keyMap
const onEditKeyMap = (km: TKeyMap): void => {
  drawer.title = `正在编辑：${km.name}`
  config.setOperateKeyMap(km)
  drawer.visable = true
}
// 点击事件：删除keyMap
const onDelKeyMap = (km: TKeyMap): void => {
  console.log('删除keyMap' + km.name)
}
// drawer声明周期hook:关闭前
const beforeClose = (): void => {
  drawer.visable = false
}
</script>

<template>
  <div class="keyMap-grid">
    <el-card key="default" :body-style="EL_BODY_STYLE">
      <section
        class="h-full w-full flex justify-center items-center bg-gray-200 cursor-pointer hover:bg-violet-100"
        @click="onAddKeyMap"
      >
        <i-add-three theme="filled" size="40" fill="#9ca3af" :stroke-width="3" />
      </section>
    </el-card>
    <el-card
      v-for="km in config.keyMapList.value"
      :key="km.id"
      shadow="always"
      :body-style="EL_BODY_STYLE"
    >
      <section class="card-content">
        <h5 class="name">{{ km.name }}</h5>
        <span class="operation">
          <i-view-grid-list
            class="icon"
            theme="filled"
            size="30"
            fill="#7e8288"
            :stroke-width="2"
            @click="onShowKeyMap(km)"
          />
          <i-editor
            v-if="!km.notChange"
            class="icon"
            theme="filled"
            size="30"
            fill="#7e8288"
            :stroke-width="2"
            @click="onEditKeyMap(km)"
          />
          <i-delete-one
            v-if="!km.notChange"
            class="icon"
            theme="filled"
            size="30"
            fill="#7e8288"
            :stroke-width="2"
            @click="onDelKeyMap"
          />
        </span>
      </section>
    </el-card>
    <el-drawer
      v-model="drawer.visable"
      :title="drawer.title"
      direction="btt"
      size="85%"
      :before-close="beforeClose"
      :destroy-on-close="true"
      :show-close="true"
      :wrapper-closable="true"
    >
      <el-scrollbar>
        <KeyMapItimList />
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<style lang="less" scoped>
.keyMap-grid {
  @apply px-6 pb-6 grid justify-center gap-6;
  grid-template-columns: repeat(auto-fill, 18rem);
  :deep(.el-card__body) {
    @apply h-16;
  }
  .card-content {
    @apply relative overflow-hidden w-full h-full flex items-center cursor-pointer;

    .name {
      @apply p-2 text-lg text-gray-500;
    }
    .operation {
      @apply absolute -right-full transition-all h-full grid grid-flow-col
       bg-gray-200 bg-opacity-50 rounded-l-xl overflow-hidden;
      .icon {
        @apply w-12 flex justify-center items-center hover:bg-violet-100;
      }
    }
    &:hover {
      .operation {
        @apply right-0;
      }
    }
  }
}
</style>
