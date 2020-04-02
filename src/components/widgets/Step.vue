<template>
  <div class="w-step" ref="w-step" :style="stepStyle">
    <slot name="header">
      <div v-if="step.header" class="w-step__header">
        <div v-if="step.header" v-html="step.header"></div>
      </div>
    </slot>

    <slot name="content">
      <div class="w-step__content">
        <div v-if="step.content" v-html="step.content"></div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class WStep extends Vue {
  @Prop({ type: Object })
  step: any

  get stepStyle() {
    const targetDOM = document.querySelector(this.step.target)
    if (targetDOM) {
      const targetRects = targetDOM.getClientRects()[0]
      return {
        top: targetRects.top,
        left: targetRects.left || '0'
      }
    } else {
      return {}
    }
  }
}
</script>

<style lang="stylus">
.w-step
  padding: 6px;
  display: none;
  position: relative
  left 2px
  z-index: 2021;
  font-size 14px
  line-height 1.25
  background: #fff;
  border-radius: 4px;

  &:after
    content ''
    position: absolute
    top: 100%
    left 8px
    display inline-block
    border 8px solid
    border-color #fff transparent transparent transparent

  .w-step__header
    font-weight 600
</style>
