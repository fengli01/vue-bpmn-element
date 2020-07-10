<template>
  <div class="container">
    <div class="bpmn-viewer">
      <viewer-header class="bpmn-viewer-header" :processData="initData" @handleExportXmlAction="handleExportXmlAction"
                     @handleExportBpmnAction="handleExportBpmnAction"
                     @handleExportSvgAction="handleExportSvgAction"></viewer-header>
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
        initData: {}
      }
    },
    created() {
      let processId = new Date().getTime();
      this.initTemplate = templateXml.initTemplate(processId)
      this.initData = {key: "process" + processId, name: "流程" + processId, xml: this.initTemplate}
    },
    mounted() {
      this.init();
    },
    methods: {
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
      },
      updateXml(xml) {
        this.initData.xml = xml;
      },
      handleExportXmlAction() {
        const _this = this;
        this.bpmnModeler.saveXML(function (err, xml) {
          if(err){
            console.error(err)
          }
          let {filename, href} = _this.setEncoded('XML', xml);
          if (href && filename) {
            let a = document.createElement('a');
            a.download = filename; //指定下载的文件名
            a.href = href; //  URL对象
            a.click(); // 模拟点击
            URL.revokeObjectURL(a.href); // 释放URL 对象
          }
        })
      },
      handleExportBpmnAction() {
        const _this = this;
        this.bpmnModeler.saveXML(function (err, xml) {
          if (err) {
            console.error(err)
          }
          let {filename, href} = _this.setEncoded('BPMN', xml);
          if (href && filename) {
            let a = document.createElement('a');
            a.download = filename; //指定下载的文件名
            a.href = href; //  URL对象
            a.click(); // 模拟点击
            URL.revokeObjectURL(a.href); // 释放URL 对象
          }
        });
      },
      handleExportSvgAction() {
        const _this = this;
        this.bpmnModeler.saveSVG(function (err, svg) {
          if (err) {
            console.error(err)
          }
          let {filename, href} = _this.setEncoded('SVG', svg);
          if (href && filename) {
            let a = document.createElement('a');
            a.download = filename;
            a.href = href;
            a.click();
            URL.revokeObjectURL(a.href);
          }
        });
      },
      setEncoded(type, data) {
        // 把xml转换为URI，下载要用到的
        const encodedData = encodeURIComponent(data);
        if (data) {
          if (type === 'XML') {
            // 获取到图的xml，保存就是把这个xml提交给后台
            // this.initData.xml = data;
            return {
              filename: this.initData.name + '.xml',
              href: "data:application/bpmn20-xml;charset=UTF-8," + encodedData,
              data: data
            }
          }
          if (type === 'BPMN') {
            // 获取到图的xml，保存就是把这个xml提交给后台
            // this.initData.xml = data;
            return {
              filename: this.initData.name + '.bpmn',
              href: "data:application/bpmn20-xml;charset=UTF-8," + encodedData,
              data: data
            }
          }
          if (type === 'SVG') {
            this.initData.svg = data;
            return {
              filename: this.initData.name + '.svg',
              href: "data:application/text/xml;charset=UTF-8," + encodedData,
              data: data
            }
          }
        }
      }
    },
    components: {
      ViewerHeader, BpmnPanel
    }
  }
</script>

<style scoped>

</style>
