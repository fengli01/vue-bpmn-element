<template>
  <div>
    <element-table :url="url" :columns="columns" :page-size="10"></element-table>
  </div>
</template>

<script>
  import ElementTable from "../../components/element/ElementTable";

  export default {
    name: "todo",
    data() {
      return {
        url: this.Apis.taskTodoQuery.replace("${userId}", JSON.parse(localStorage.getItem("loginUser")).userId),
        columns: [{
          key: "id",
          title: "ID"
        }, {
          key: "taskName",
          title: "任务名称"
        }, {
          key: "userName",
          title: "申请人"
        }, {
          key: "createTime",
          title: "申请时间",
          type: "datetime"
        }, {
          key: "ora",
          title: "操作",
          operator: [{
            name: "查看",
            type: "text",
            click: (row) => {
              // TODO
              console.log(row)
            }
          }]
        }]
      }
    },
    components: {
      ElementTable
    }
  }
</script>

<style scoped>

</style>
