<template>
  <div id="app">
    <Header />
    <Main />
    <Footer />
    <w-guide :show.sync="show" :steps="steps" />
  </div>
</template>

<script lang="ts">
import { Header, Main, Footer } from './components/layout'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Header,
    Main,
    Footer
  }
})
export default class App extends Vue {
  private show = true

  // 指引数据
  private steps: Array<object> = [
    {
      name: 'test1',
      target: '[data-guide="step-1"]',
      header: 'header-1',
      content: 'content-1'
    },
    {
      name: 'test2',
      target: '[data-guide="step-2"]',
      header: 'header-2',
      content: 'content-2'
    },
    {
      name: 'test3',
      target: '.van-nav-bar__left',
      header: 'header-3',
      content: 'content-3'
    },
    {
      name: 'test4',
      target: '#GuideTest2',
      header: 'header-4',
      content: 'content-4'
    }
  ]
}
</script>

<style lang="stylus">
body
  width: 100%
  padding: 0
  margin: 0
  overflow-x: auto
  color: #323233
  font-size: 16px
  font-family: PingFang SC, "Helvetica Neue", Arial, sans-serif
  background-color: #f7f8fa
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
</style>
