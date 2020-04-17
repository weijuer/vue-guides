<template>
  <footer>
    <van-tabbar v-model="active">
      <van-tabbar-item data-guide="step-1" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item data-guide="step-2" icon="search" dot>搜索</van-tabbar-item>
      <van-tabbar-item icon="friends-o" badge="5">联系人</van-tabbar-item>
      <van-tabbar-item icon="setting-o" badge="20">设置</van-tabbar-item>
    </van-tabbar>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {
  // 选中
  active = 0
}
</script>

<style lang="stylus">
.footer
  position: relative
  height: 50px;
</style>
