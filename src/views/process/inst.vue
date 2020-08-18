<template>
  <div>
    <div class="toolbar">
      <el-button type="primary" @click="openNewDialog">请假申请</el-button>
    </div>
    <element-table :url="url" :columns="columns" :page-size="10"></element-table>

    <el-dialog title="请假申请" :visible.sync="dialogVisible">
      <el-container>
        dd
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
  import ElementTable from "../../components/element/ElementTable";
  export default {
    name: "inst",
    data(){
      return {
        dialogVisible:false,
        url:this.Apis.processInstQuery,
        columns:[]
      }
    },
    components:{
      ElementTable
    },
    methods:{
      openNewDialog(){
        this.dialogVisible = true;
      }
    }
  }
</script>

<style scoped>

</style>
