<template>
  <div>
    <div class="toolbar">
      <el-button type="primary" @click="openNewDialog">添加流程</el-button>
    </div>
    <element-table :url="url" :page-size="10" :columns="columns"></element-table>

    <el-dialog title="流程图" :visible.sync="dialogVisible" width="1100px">
      <slot name="-" style="border: none;padding: 0px;margin: 0px;">
        <vue-bpmn style="overflow: hidden;height: 700px;" @processSave="processSave"></vue-bpmn>
      </slot>
    </el-dialog>
  </div>
</template>

<script>
  import ElementTable from "../../components/element/ElementTable";
  import VueBpmn from "../../components/bpmn/VueBpmn";

  export default {
    name: "design",
    data() {
      return {
        dialogVisible: false,
        url: this.Apis.processList,
        columns: [{
          key: 'procId',
          title: '流程定义ID'
        }, {
          key: 'name',
          title: '流程名称'
        }, {
          key: 'ora',
          title: '状态',
          formatter: (row, key, value, index) => {
            console.log(row)
            console.log(key)
            console.log(value)
            console.log(index)
            return '<button class="el-button" size="mini">dd</button>';
          }
        }]
      }
    },
    components: {
      ElementTable,
      VueBpmn
    },
    methods: {
      openNewDialog() {
        this.dialogVisible = true;
      },
      processSave(data) {
        let that = this;
        that.post(this.Apis.processBuffer, data, res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>
  .toolbar {
    height: 50px;
    line-height: 50px;
    background-color: #ffffff;
  }


</style>
