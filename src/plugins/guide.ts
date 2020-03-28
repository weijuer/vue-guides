import { Guide, Step } from '../components/widgets'

const VueGuide = {
  install(Vue: any) {
    Vue.component(Guide.name, Guide)
    Vue.component(Step.name, Step)

    Vue.prototype.$guides = {}
  }
}

export default VueGuide
