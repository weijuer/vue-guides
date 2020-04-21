<template>
  <main class="app-main">
    <van-grid square>
      <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
    </van-grid>

    <van-grid style="margin-top: 16px" :gutter="10">
      <van-grid-item :id="index === 1 ? 'GuideTest2' : null" v-for="(value, index) in 8" :key="index" icon="photo-o" text="文字" />
    </van-grid>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Main extends Vue {}
</script>

<style lang="stylus">
.app-main
  min-height: calc(100vh - 96px)
  box-sizing: border-box
</style>
