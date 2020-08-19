<template>
  <div>
    <div class="toolbar">
      <el-button type="primary" @click="openNewDialog">请假申请</el-button>
    </div>
    <element-table :url="url" :columns="columns" :page-size="10" ref="elementTable"></element-table>

    <el-dialog title="请假申请" :visible.sync="dialogVisible"
               style="padding-top: 10px;" width="600px" center>
      <div style="padding: 30px 110px 0px 20px;">
        <el-form :model="form" label-width="110px">
          <el-form-item label="姓名">
            <el-input v-model="form.name" disabled style="width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="请假时间">
            <el-date-picker
                v-model="form.daterange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="change"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="请假天数">
            <span>{{day?day+'天':''}}</span>
          </el-form-item>
          <el-form-item label="请假类别">
            <el-select v-model="form.type" placeholder="请选择" style="width: 350px;">
              <el-option
                  v-for="item in getLeaveCategoryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请假原因">
            <el-input v-model="form.reason" type="textarea" style="width: 350px;" rows="3"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>

    <el-dialog title="查看流程图" :visible.sync="dialogImgVisible">
      <div style="background: #ffffff;padding: 50px 100px;">
        <img :src="imgUrl" alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ElementTable from "../../components/element/ElementTable";
  import {mapGetters} from 'vuex'

  export default {
    name: "inst",
    data() {
      return {
        dialogVisible: false,
        dialogImgVisible: false,
        imgUrl: "",
        dataImg:{"x":550.0,"y":190.0,"height":80.0,"width":100.0,"element":null,"expanded":null,"xmlRowNumber":2,"xmlColumnNumber":2890},
        url: this.Apis.leavePageQuery.replace("${userId}", JSON.parse(localStorage.getItem("loginUser")).userId),
        columns: [{
          key: "id",
          title: "ID"
        }, {
          key: "type",
          title: "请假类别",
          formatter: (row, key) => {
            let data = this.getLeaveCategoryList;
            for (let i = 0; i < data.length; i++) {
              if (data[i].value == row[key]) {
                return data[i].label;
              }
            }
            return "";
          }
        }, {
          key: "status",
          title: "状态",
          formatter: (row, key) => {
            switch (row[key]) {
              case 0:
                return "未提交";
              case 1:
                return "审核中";
              case 2:
                return "审核通过";
              case 3:
                return "审核不通过";
              default:
                return "";
            }
          }
        }, {
          key: "startTime",
          title: "开始时间",
          type: 'date'
        }, {
          key: "endTime",
          title: "结束时间",
          type: 'datetime'
        }, {
          key: "day",
          title: "请假天数"
        }, {
          key: "ora",
          title: "操作",
          operator: [{
            name: "查看",
            type: "text",
            click: () => {
              this.imgUrl = this.getCallUrl(this.Apis.leaveImage);
              this.dialogImgVisible = true;
            }
          }]
        }],
        name: '',
        form: {},
        day: 0
      }
    },
    components: {
      ElementTable
    },
    computed: {
      ...mapGetters(["getLeaveCategoryList"])
    },
    created() {
      let loginUser = localStorage.getItem("loginUser");
      loginUser = JSON.parse(loginUser);
      this.form.name = loginUser.nickName;
    },
    methods: {
      openNewDialog() {
        this.dialogVisible = true;
      },
      change(val) {
        this.form.startTime = val[0].getTime();
        this.form.endTime = val[1].getTime();
        this.day = Number.parseInt((val[1].getTime() - val[0].getTime()) / 1000 / 60 / 60 / 24) + 1;
        this.form.day = this.day;
      },
      save() {
        let that = this;
        let formObject = this.form;
        let loginUser = JSON.parse(localStorage.getItem("loginUser"));
        formObject.userId = loginUser.userId;
        formObject.userName = loginUser.nickName;
        that.post(this.Apis.leaveApply, formObject, res => {
          if (res.code == 200) {
            that.dialogVisible = false;
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
