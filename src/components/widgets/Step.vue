<template>
  <div class="w-step" :ref="'w-step-' + hash">
    <slot name="header">
      <div v-if="step.header" class="v-step__header">
        <div v-if="step.header.title" v-html="step.header.title"></div>
      </div>
    </slot>

    <slot name="content">
      <div class="v-step__content">
        <div v-if="step.content" v-html="step.content"></div>
        <div
          v-else
        >This is a demo step! The id of this step is {{ hash }} and it targets {{ step.target }}.</div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class WStep extends Vue {}
</script>

<style lang="stylus">
.w-step
  position: relative
</style>
