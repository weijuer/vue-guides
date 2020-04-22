<template>
  <div class="w-step" :class="[position, { active: active }]" ref="w-step" :style="stepStyle">
    <div class="w-step__header" v-if="$slots.header || step.header">
      <slot name="header">{{ step.header }}</slot>
    </div>

    <div v-if="$slots.content || step.content" class="w-step__content">
      <slot name="content">{{ step.content }}</slot>
    </div>

    <div class="w-step__actions" v-if="$slots.actions || actions">
      <slot name="actions">
        <a class="w-step__actions-btn" v-show="!isFirst" href="javascript:;" @click="prev()">上一步</a>
        <a class="w-step__actions-btn" href="javascript:;" @click="next()">{{ nextText }}</a>
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

  @Prop({ type: String })
  target!: string

  @Prop({ type: [Boolean, Object], default: true })
  actions!: boolean

  @Prop({ type: Boolean, default: false })
  isFirst!: boolean

  @Prop({ type: Boolean, default: false })
  isLast!: boolean

  // 页面guide对应元素
  targetDOM: Element | null = null

  // 角标位置 top | left | right | bottom✔
  position = 'bottom'

  // 是否激活
  get active() {
    return this.target === this.step.target
  }

  get nextText() {
    return this.isLast ? '完成' : '下一步'
  }

  mounted() {
    this.init()
  }

  init() {
    // 获取目标元素
    this.targetDOM = document.querySelector(this.step.target)
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

      // 重置tail位置
      if (targetTop <= 0) {
        this.position = 'top'
      }

      const top = targetTop <= 0 ? `${targetTop + stepHeight}px` : `${targetTop - stepHeight - offset}px`
      const left = `${targetLeft + offset}px`

      return {
        top: top,
        left: left
      }
    } else {
      return null
    }
  }

  // 下一步
  @Emit('next')
  next() {
    console.log('emit next')
  }

  // 上一步
  @Emit('prev')
  prev() {
    console.log('emit prev')
  }
}
</script>

<style lang="stylus">
$position = top right bottom left

tail(position)
  $pos = opposite-position(position)
  content ''
  display inline-block
  position: absolute
  {$pos} 100%
  if position in (left right)
    top 8px
  if position in (top bottom)
    left 8px
  border 8px solid transparent
  border-{$pos}-color #fff

tailMaker(positions)
  for pos, i in positions
    &.{pos}
      &:after
        tail(pos)

.w-step
  min-width: 120px;
  padding: 6px;
  display: inline-block;
  position: fixed
  z-index: 2021;
  font-size 14px
  line-height 1.25
  visibility hidden
  background: #fff;
  border-radius: 4px;
  transition: all .2ms linear;

  &.active
    visibility visible

  .w-step__header
    font-weight 600

  .w-step__actions
    display flex
    justify-content flex-end

    .w-step__actions-btn
      margin-right 8px
      &:last-child
        margin-right 0

  tailMaker($position)
</style>
