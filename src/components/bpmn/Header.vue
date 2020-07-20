<template>
  <div>
    <el-button-group>
      <el-button type="primary" size="mini" title="保存并发布"><i class="fa fa-save"> 保存并发布</i></el-button>
      <el-button type="primary" size="mini" title="保存草稿"><i class="fa fa-save"> 保存草稿</i></el-button>
      <el-button type="primary" size="mini" title="打开流程文件"><i class="fa fa-folder-open"></i></el-button>
      <el-button type="primary" size="mini" title="创建新流程图"><i class="fa fa-plus-circle"></i></el-button>
      <el-button type="primary" size="mini" title="下载流程图"><i class="fa fa-picture-o"></i></el-button>
      <el-button type="primary" size="mini" title="下载流程文件"><i class="fa fa-download"></i></el-button>
      <el-button title="撤销" size="mini"><i class="fa fa-rotate-left" @click="undo"></i></el-button>
      <el-button title="恢复" size="mini"><i class="fa fa-rotate-right" :class="!undoTimes?'default-undo':''"
                                           @click="redo"></i></el-button>
      <el-button title="放大" size="mini" @click="zoom(0.05)"><i class="fa fa-search-plus"></i></el-button>
      <el-button title="缩小" size="mini" @click="zoom(-0.05)"><i class="fa fa-search-minus"></i></el-button>
      <el-button title="重置" size="mini" @click="zoom(0)"><i class="fa fa-arrows"></i></el-button>
    </el-button-group>

  </div>
</template>

<script>
  export default {
    name: "ViewerHeader",
    data() {
      return {
        scale: 1.0,
        undoTimes: 0
      }
    },
    props: {
      processData: {
        type: Object
      },
      modeler: {
        type: Object
      }
    },
    components: {},
    methods: {
      undo() {
        this.modeler.get('commandStack').undo();
        this.undoTimes = this.undoTimes + 1;
      },
      redo() {
        this.modeler.get('commandStack').redo()
        this.undoTimes = (this.undoTimes - 1) < 0 ? 0 : (this.undoTimes - 1);
      },
      zoom(val) {
        let newScale = !val ? 1.0 : ((this.scale + val) <= 0.2) ? 0.2 : (this.scale + val);
        this.modeler.get('canvas').zoom(newScale);
        this.scale = newScale;
      }
    }
  }
</script>

<style scoped>

</style>
