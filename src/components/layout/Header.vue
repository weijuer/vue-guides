<template>
  <header class="app-header">
    <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow />
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {}
</script>

<style lang="stylus">
.app-header
  position: relative
</style>
