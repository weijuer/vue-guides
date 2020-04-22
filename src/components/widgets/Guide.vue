<template>
  <div class="w-guide" v-if="syncedShow">
    <div class="w-guide-overlay"></div>
    <div class="w-guide-target" :style="targetStyle"></div>
    <div class="w-guide-steps">
      <slot>
        <w-step v-for="(step, index) of steps" :key="'step' + index" :isFirst="isFirst" :isLast="isLast" :target="target" :step="step" @next="next()" @prev="prev()"></w-step>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync } from 'vue-property-decorator'
import Step from './Step.vue'

@Component({
  components: {
    [Step.name]: Step
  }
})
export default class WGuide extends Vue {
  // 指引是否展示
  @PropSync('show', { type: Boolean })
  private syncedShow!: boolean

  // 自定义待指引步骤对象集合
  @Prop({ type: Array, default: [] })
  private steps!: Array<W.Step>

  // 当前激活指引步骤
  private active = 1

  // 是否第一步
  get isFirst() {
    return this.active === 1
  }

  // 是否最后一步
  get isLast() {
    return this.active === this.steps.length
  }

  // target
  private target = ''

  // 当前激活指引target样式
  private targetStyle = {}

  // target节点
  private targetDOM: Element | null = null

  mounted() {
    this.init()
  }

  init() {
    this.updateTarget()
  }

  // 获取页面元素
  $dom(target: string) {
    return document.querySelector(target)
  }

  // 处理当前target元素
  updateTarget() {
    this.target = this.steps[this.active - 1].target
    this.targetDOM = this.$dom(this.target)
    if (this.targetDOM) {
      // 添加属性
      this.targetDOM.setAttribute('data-w-guide', 'w-guide')
      // 目标元素坐标
      const { top, left, width, height } = this.targetDOM.getBoundingClientRect()

      this.targetStyle = {
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`
        // clip: `rect(${top}px, ${right}px, ${bottom}px, ${left}px)`
      }
    }
  }

  // 下一步
  next() {
    if (this.active >= this.steps.length) {
      this.syncedShow = false
    } else {
      this.active++
      this.updateTarget()
    }
  }

  // 上一步
  prev() {
    if (this.active == 1) return
    this.active--
    this.updateTarget()
  }
}
</script>

<style lang="stylus">
[data-guide],
[data-w-guide]
  &.active
    z-index: 2021;
    transition: all .3s ease-out;

.w-guide
  .w-guide-overlay
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background: rgba(0, 0, 0, 0.4);
    z-index: 2020;

  .w-guide-target
    position: absolute;
    z-index: 2021
    background transparent
    box-shadow: inset 0px 0px 2px 2px #4c4c4c;
    transition: all .3s ease-out;
</style>
