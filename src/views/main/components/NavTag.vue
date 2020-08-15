<template>
  <div>
    <el-tag effect="plain" class="nav-tag">首页</el-tag>
  </div>
</template>

<script>
  export default {
    name: "NavTag"
  }
</script>

<style scoped>
  .nav-tag {
    border-color: #d8dce5;
    color: #495060;cursor: pointer;
    margin-left: 10px;
  }
  .nav-tag:before{
    content: '';
    background-color: #ff0000;
    width: 8px;
    height: 8px;
    position: relative;
    display: inline-block;
    margin-right: 4px;
    border-radius: 50%;
  }
</style>
