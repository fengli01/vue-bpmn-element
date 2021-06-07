<template>
  <div>
    <el-form :inline="false"
             :model="localProcessData"
             label-width="100px"
             size="small"
             label-position="left">
      <el-form-item label="流程ID">
        <el-input v-model="localProcessData.key" @input="updateId"></el-input>
      </el-form-item>
      <el-form-item label="流程名称">
        <el-input v-model="localProcessData.name" @input="updateName"></el-input>
      </el-form-item>
      <el-form-item label="流程描述">
        <el-input v-model="localProcessData.description" @input="updateDesc"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "ProcessProperty",
    data() {
      return {
        localProcessData:this.processData
      }
    },
    props: {
      processData: {
        type: Object,
        required: true
      },
      modeler: {
        type: Object,
        required: true
      },
      element: {
        type: Object,
        required: true
      }
    },
    methods: {
      updateId(name) {
        this.modeler.get("modeling").updateProperties(this.element, {id: name});
      },
      updateName(name) {
        this.modeler.get("modeling").updateProperties(this.element, {name: name});
      },
      updateDesc(name) {
        let doc = this.modeler.get("bpmnFactory").create("bpmn:Documentation", {text: name});
        this.modeler.get("modeling").updateProperties(this.element, {documentation: [doc]});
      }
    }
  }
</script>

<style scoped>

</style>
