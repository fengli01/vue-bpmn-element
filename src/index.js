import VueBpmn from "./components/bpmn/VueBpmn.vue";

const components = [VueBpmn];

let componentObj = {
  install: (Vue) => {
    components.map(component => {
      Vue.component(components[key].name, components[key]) //注册组件
      comObj[components[key].name] = components[key];
    })

  }
};
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vuebpmn)
}

export default componentObj
