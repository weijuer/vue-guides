<template>
  <div class="w-step" :class="{ active: active }" ref="w-step" :style="stepStyle">
    <div class="w-step__header" v-if="$slots.header || step.header">
      <slot name="header">{{ step.header }}</slot>
    </div>

    <div v-if="$slots.content || step.content" class="w-step__content">
      <slot name="content">{{ step.content }}</slot>
    </div>

    <div class="w-step__actions" v-if="$slots.actions || actions">
      <slot name="actions">
        <a href="javascript:;" @click="prev()">上一步</a>
        <a href="javascript:;" @click="next()">下一步</a>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Ref } from 'vue-property-decorator'

@Component
export default class WStep extends Vue {
  @Ref('w-step')
  $step!: Element

  @Prop({ type: Object })
  step!: W.Step

  @Prop({ type: Boolean })
  active!: boolean

  @Prop({ type: [Boolean, Object], default: true })
  actions!: boolean

  // 页面guide对应元素
  targetDOM: Element | null = null

  mounted() {
    this.init()
  }

  init() {
    // 获取目标元素
    this.targetDOM = document.querySelector(this.step.target)
    // 添加data-guide属性
    this.targetDOM && this.targetDOM.setAttribute('data-guide', 'w-guide')
  }

  // 获取step样式
  get stepStyle() {
    const targetDOM = this.targetDOM
    if (targetDOM) {
      // 偏移量
      const offset = 10
      // 目标元素坐标
      const { top: targetTop, left: targetLeft } = targetDOM.getBoundingClientRect()
      // 当前step元素坐标
      const { height: stepHeight } = this.$step.getBoundingClientRect()
      // 首次初始化
      this.processActiveTarget()

      if (targetTop <= 0) {
        this.$step.classList.add('top')
      }

      const top = targetTop <= 0 ? `${targetTop + stepHeight}px` : `${targetTop - stepHeight - offset}px`
      const left = `${targetLeft + offset}px`

      return {
        top: top,
        left: left
      }
    } else {
      return {}
    }
  }

  // 处理当前target元素
  processActiveTarget() {
    this.active && this.targetDOM && this.targetDOM.classList.toggle('active')
  }

  // 下一步
  @Emit('next')
  next() {
    this.processActiveTarget()
    console.log('emit next')
  }

  // 上一步
  @Emit('prev')
  prev() {
    this.processActiveTarget()
    console.log('emit prev')
  }
}
</script>

<style lang="stylus">
.w-step
  padding: 6px;
  display: inline-block;
  position: fixed
  z-index: 2021;
  font-size 14px
  line-height 1.25
  visibility hidden
  background: #fff;
  border-radius: 4px;
  transition: all .2ms .1s linear;

  &.active
    visibility visible

  .w-step__header
    font-weight 600

  &:after
    content ''
    position: absolute
    top: 100%
    left 8px
    display inline-block
    border 8px solid
    border-color #fff transparent transparent transparent

  &.top
    &:after
      content: ''
      position: absolute
      bottom: 100%
      left: 8px;
      top: initial
      display: inline-block
      border: 8px solid
      border-color: transparent transparent #fff transparent
</style>
