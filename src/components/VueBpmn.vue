<template>
  <div class="container">
    <div class="bpmn-viewer">
      <vue-header class="bpmn-viewer-header" :processData="initData" @handleExportXmlAction="handleExportXmlAction"
                     @handleExportBpmnAction="handleExportBpmnAction"
                     @handleExportSvgAction="handleExportSvgAction"></vue-header>
      <div class="bpmn-viewer-container">
        <div class="bpmn-viewer-content" ref="bpmnViewer"></div>
      </div>
    </div>
<!--    <bpmn-panel v-if="bpmnModeler" :modeler="bpmnModeler" :process="initData" @updateXml="updateXml"></bpmn-panel>-->
  </div>
</template>

<script>
  import templateXml from "./bpmn/data/initxml";
  import BpmnModeler from 'jeeplus-bpmn/lib/Modeler'
  import customTranslate from "./bpmn/customTranslate/customTranslate";
  import VueHeader from "./Header";

  import './bpmn/vue-bmpn.css'
  export default {
    name: "VueBpmn",
    data() {
      return {
        bpmnModeler: null,
        initTemplate: "",
        initData: {}
      }
    },
    components:{
      VueHeader
    },
    created() {
      let processId = new Date().getTime();
      this.initTemplate = templateXml.initTemplate(processId)
      this.initData = {key: "process" + processId, name: "流程" + processId, xml: this.initTemplate}
    },
    mounted() {
      this.init();
    },
    methods:{
      init() {
        // 获取画布 element
        this.canvas = this.$refs.bpmnViewer;
        // 创建Bpmn对象
        this.bpmnModeler = new BpmnModeler({
          container: this.canvas,
          additionalModules: [
            {
              translate: ['value', customTranslate]
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
      }
    }
  }
</script>

<style scoped>

</style>
