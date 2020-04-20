<template>
  <div class="w-guide" v-if="show">
    <div class="w-guide-overlay"></div>
    <div class="w-guide-target" :style="targetStyle"></div>
    <w-step
      :targetStyle.sync="targetStyle"
      v-for="(step, index) of steps"
      :key="'step' + index"
      :active="active === index + 1"
      :step="step"
      @next="next($event)"
      @prev="prev()"
    ></w-step>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model } from 'vue-property-decorator'
import Step from './Step.vue'

@Component({
  components: {
    [Step.name]: Step
  }
})
export default class WGuide extends Vue {
  // 指引是否展示
  @Model('change', { type: Boolean })
  readonly show!: boolean

  // 自定义待指引步骤对象集合
  @Prop({ type: Array, default: [] })
  private steps!: Array<object>

  // 当前激活指引步骤
  private active = 1

  // 当前激活指引DOM样式
  private targetStyle = {}

  // 下一步
  next() {
    if (this.active >= this.steps.length) {
      // TODO 优化
      this.show = false
    } else {
      this.active++
    }
  }

  // 上一步
  prev() {
    if (this.active == 1) return
    this.active--
  }
}
</script>

<style lang="stylus">
[data-guide]
  &.active
    z-index: 2022

.w-guide
  .w-guide-overlay
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background: rgba(0, 0, 0, 0.5);
    z-index: 2020;

  .w-guide-target
    position: absolute;
    z-index: 2021
    box-shadow: 0px 0px 4px 2px #6792ff
    background: #fff
    transition: all .3s ease-out;
</style>
