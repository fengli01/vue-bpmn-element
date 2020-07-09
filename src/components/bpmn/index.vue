<template>
  <div class="container">
    <div class="bpmn-viewer">
      <viewer-header class="bpmn-viewer-header" :processData="initData"></viewer-header>
      <div class="bpmn-viewer-container">
      <div class="bpmn-viewer-content" ref="bpmnViewer"></div>
      </div>
    </div>
    <bpmn-panel v-if="bpmnModeler" :modeler="bpmnModeler" :process="initData" @updateXml="updateXml"></bpmn-panel>
  </div>
</template>

<script>
  import templateXml from "./data/initxml";
  // import BpmnModeler from 'bpmn-js/lib/Modeler'
  import BpmnModeler from 'jeeplus-bpmn/lib/Modeler'
  import ViewerHeader from './ViewerHeader'
  import BpmnPanel from "./panel/index";
  import customTranslate from './customTranslate/customTranslate'

  export default {
    name: "index",
    data() {
      return {
        bpmnModeler: null,
        initTemplate: "",
        initData:{}
      }
    },
    created() {
      let processId = new Date().getTime();
      this.initTemplate = templateXml.initTemplate(processId)
      this.initData = {key:"process"+processId,name:"流程"+processId,xml:this.initTemplate}
    },
    mounted() {
      this.init();
    },
    methods: {
      init(){
        // 获取画布 element
        this.canvas = this.$refs.bpmnViewer;
        // 创建Bpmn对象
        this.bpmnModeler = new BpmnModeler({
          container: this.canvas,
          additionalModules: [
            {
              translate: [ 'value', customTranslate ]
            }
          ]
        });

        // 初始化建模器内容
        this.initDiagram(this.initTemplate);
      },
      initDiagram(bpmn) {
        this.bpmnModeler.importXML(bpmn, err => {
          if (err) {
            // this.$Message.error("打开模型出错,请确认该模型符合Bpmn2.0规范");
          }
        });
      },
      updateXml(xml){
        this.initData.xml = xml;
      }
    },
    components:{
      ViewerHeader,BpmnPanel
    }
  }
</script>

<style scoped>

</style>
