<template>
  <div>
    <div class="toolbar">
      <el-button type="primary" @click="openNewDialog">添加流程</el-button>
    </div>
    <element-table :url="url" :page-size="10" :columns="columns" ref="elementTable"></element-table>

    <el-dialog title="流程图" :visible.sync="dialogVisible" width="1100px">
      <slot name="-" style="border: none;padding: 0px;margin: 0px;">
        <vue-bpmn style="overflow: hidden;height: 700px;" product="flowable" @processSave="processSave"></vue-bpmn>
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
          key: 'status',
          title: '状态',
          formatter: (row, key) => {
            if (row[key] == 0) {
              return "未发布";
            }
            return "已发布"
          }
        }, {
          key: 'ora',
          title: '操作',
          operator: [{
            name: "发布",
            type: "text",
            click: (row) => {
              this.put(this.Apis.processDeploy.replace("${id}", row.id), {}, res => {
                console.log(res)
              });
            },
            hidden: (row) => {
              return row.status == 1;
            }
          }, {
            name: "删除",
            type: "text",
            click: (row) => {
              console.log(row);
              this.delete(this.Apis.processRemove.replace("${id}", row.id), {}, res => {
                console.log(res)
                if (res.code == 200) {
                  this.$refs.elementTable.reload();
                }
              })
            }
          }]
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
          if (res.code == 200) {
            that.$refs.elementTable.reload();
          }
        })
      },
      deploy() {

      }
    }
  }
</script>

<style scoped>
</style>
