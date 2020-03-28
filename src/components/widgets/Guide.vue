<template>
  <div class="w-guide"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class WGuide extends Vue {
  @Prop()
  private msg!: string
}
</script>

<style lang="stylus">
.w-guide
  position: relative
</style>
