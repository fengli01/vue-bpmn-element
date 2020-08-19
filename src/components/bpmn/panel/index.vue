<template>
  <div class="bpmn-panel">
    <el-container>
      <el-header height="45px">
        <div class="config-tab" :class="{active: configTab=='node'}" @click="handleConfigSelect('node')">节点属性</div>
        <div class="config-tab" :class="{active: configTab=='process'}" @click="handleConfigSelect('process')">流程属性
        </div>
      </el-header>
      <el-main>
        <node-property-panel v-if="configTab=='node'" :modeler="modeler" @modifyConfigTab="modifyConfigTab"
                             :nodeElement="nodeElement" :formData="formData" @modifyFormData="modifyFormData"></node-property-panel>
        <process-property-panel v-if="configTab=='process'" :modeler="modeler" :process-data="process"
                                :element="element"></process-property-panel>
      </el-main>
    </el-container>
    <!-- 流程属性 -->
    <el-collapse v-if="panelIndex==1" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          基本设置<i class="header-icon el-icon-info"></i>
        </template>
        <div>
          <el-form label-position="right" label-width="70px">
            <el-form-item label="ID">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="描述信息">
              <el-input type="textarea" v-model="form.document" @input="nameChange"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          执行监听器<i class="header-icon el-icon-info"></i>
        </template>
        <div>
          <div style="margin-bottom: 4px;">
            <el-button type="primary" size="mini">添加</el-button>
            <el-button type="primary" size="mini">选择</el-button>
          </div>
          <el-table
              border
              style="width: 100%">
            <el-table-column
                label="事件">
            </el-table-column>
            <el-table-column
                label="类型">
            </el-table-column>
            <el-table-column
                label="实现">
            </el-table-column>
            <el-table-column
                label="操作">
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          权限设置<i class="header-icon el-icon-info"></i>
        </template>
        <div>
          <el-form label-position="right" label-width="70px">
            <el-form-item label="允许启动">
              <el-radio v-model="radio" label="1">所有成员</el-radio>
              <el-radio v-model="radio" label="2">指导成员</el-radio>
            </el-form-item>
            <el-form-item label="添加用户">
              <el-input placeholder="请选择" v-model="input3" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="添加角色">
              <el-input placeholder="请选择" v-model="input3" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- 开始节点 -->
    <el-collapse v-if="panelIndex==1" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          基本设置<i class="header-icon el-icon-info"></i>
        </template>
        <div>
          <el-form label-position="right" label-width="70px">
            <el-form-item label="ID">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="描述信息">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="发起人">
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          执行监听器<i class="header-icon el-icon-info"></i>
        </template>
        <div>
          <div class="collapse-item-header">
            <el-button type="primary" size="mini" icon="el-icon-plus">添加</el-button>
            <el-button type="primary" size="mini" icon="el-icon-edit-outline">修改</el-button>
            <el-button type="primary" size="mini" icon="el-icon-delete">删除</el-button>
          </div>
          <el-table
              border
              style="width: 100%">
            <el-table-column
                label=""
                width="40px"
            >
            </el-table-column>
            <el-table-column
                label="表单名称">
            </el-table-column>
            <el-table-column
                label="版本">
            </el-table-column>
            <el-table-column
                label="表单key">
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          监听器<i class="header-icon el-icon-info"></i>
        </template>
        <div>
          <div style="margin-bottom: 4px;">
            <el-button type="primary" size="mini">添加</el-button>
            <el-button type="primary" size="mini">选择</el-button>
          </div>
          <el-table
              border
              style="width: 100%">
            <el-table-column
                label="事件">
            </el-table-column>
            <el-table-column
                label="类型">
            </el-table-column>
            <el-table-column
                label="实现">
            </el-table-column>
            <el-table-column
                label="操作">
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import NodePropertyPanel from "./NodePropertyPanel";
  import ProcessPropertyPanel from "./ProcessPropertyPanel";

  export default {
    name: "index",
    data() {
      return {
        configTab: 'node',
        panelIndex: 8,
        element: null,
        nodeElement: {},
        formData: {}
      }
    },
    props: {
      modeler: {
        type: Object,
        required: true
      },
      process: {
        type: Object,
        required: true
      }
    },
    mounted() {
      this.handleModeler();
    },
    methods: {
      handleConfigSelect(value) {
        this.configTab = value;
      },
      handleModeler() {
        const _this = this;
        this.modeler.on("root.added", e => {
          let element = e.element;
          if (this.isImplicitRoot(element)) {
            return;
          }
          this.element = element;
        });
        this.modeler.on("commandStack.changed", () => {
          _this.modeler.saveXML({format: true}, function (err, xml) {
            _this.$emit('updateXml', xml)
          });
        })
        this.modeler.on("selection.changed", e => {
          const element = e.newSelection[0];
          if (!element) {
            return;
          }
          this.modifyConfigTab(element);
          this.handleFormData(element);
        })
        this.modeler.on("element.changed", e => {
          const {element} = e;
          if (!element) {
            return;
          }
          this.handleFormData(element);
        });
        this.modeler.on("element.click", e => {
          const {element} = e;
          if (element.type == this.modeler._definitions.rootElements[0].$type) {
            this.modifyConfigTab(0)
          } else {
            this.modifyConfigTab(1)
            if(element.type == "bpmn:UserTask"){
              let _businessObject = element.businessObject;
              if(_businessObject.assignee){
                _this.formData.userType = "assignee";
                _this.formData.assignee = _businessObject.assignee;
              }
            }
          }
        })
      },
      isImplicitRoot(element) {
        return element.id === '__implicitroot';
      },
      modifyConfigTab(element) {
        let configTab = 'node'
        if (!element) {
          configTab = 'process'
        }
        this.configTab = configTab
      },
      handleFormData(element) {
        if (!element.id) {
          return;
        }
        let businessObject = element.businessObject;
        this.formData = {
          type: element.type,
          id: businessObject.id,
          name: businessObject.name,
          userType: businessObject.$attrs.userType,
          assignee: businessObject.$attrs.assignee,
          candidateGroups: businessObject.$attrs.candidateGroups,
          candidateUsers: businessObject.$attrs.candidateUsers ? businessObject.$attrs.candidateUsers.split(",") : [],
          sequenceFlow: businessObject.conditionExpression ? businessObject.conditionExpression.body : ''
        }
        this.nodeElement = element;
      },
      modifyFormData(data){
        this.formData.assignee = data.assignee;
        this.formData.userType = data.userType;
      }
    },
    components: {
      NodePropertyPanel, ProcessPropertyPanel
    }
  }
</script>

<style scoped>
  .bpmn-panel {
    width: 350px;
    border: 1px solid #eeeeee;
    padding: 0 5px;
  }

  .el-header {
    border-bottom: solid 2px #e4e7ed;
    padding: 0;
  }

  .config-tab {
    height: 43px;
    line-height: 43px;
    display: inline-block;
    width: 50%;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    cursor: pointer;
  }

  .config-tab.active {
    border-bottom: solid 2px #409EFF;
  }
</style>
