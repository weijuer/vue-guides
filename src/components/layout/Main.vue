<template>
  <main class="app-main">
    <van-grid square>
      <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
    </van-grid>

    <van-grid style="margin-top: 16px" :gutter="10">
      <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
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
  box-sizing: border-box
  min-height: calc(100vh - 56px)
  padding-bottom: 20px
</style>
