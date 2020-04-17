<template>
  <div class="w-guide" v-if="show">
    <w-step v-for="(step, index) of steps" :key="'step' + index" :active="active === index + 1" :step="step" @next="next()" @prev="prev()"></w-step>
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
  @Prop({ type: Boolean, default: false })
  private show!: boolean

  // 自定义待指引步骤对象集合
  @Prop({ type: Array, default: [] })
  private steps!: Array<object>

  // 当前页面待指引DOM集合
  private guidesDOM!: Array<Element>

  // 当前激活指引步骤
  private active = 1

  mounted() {
    // this.init()
    // this.getActiveGuide()
  }

  init() {
    // 初始化获取页面[data-guide]集合
    this.guidesDOM = Array.from(document.querySelectorAll('[data-guide]'))
  }

  // 获取当前target元素
  getActiveTarget() {
    const activeTarget = document.querySelector('')
  }

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
    if (this.active == 0) return
    this.active--
  }
}
</script>

<style lang="stylus">
[data-guide]
  &.active
    background: #fff
    border: 1px solid #fff
    border-radius: 4px
    box-shadow: 0px 0px 4px 2px #6792ff
    z-index: 2020

.w-guide
  display flex
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background: rgba(0, 0, 0, 0.5);
  z-index: 2020;
</style>
