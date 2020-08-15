<template>
  <div class="login">
    <el-card class="login-info">
      <el-header style="height: 50px">
        <el-icon class="iconfont icon-denglu1"></el-icon>
        欢迎登录
      </el-header>
      <el-container>
        <el-form style="width: 100%">
          <el-form-item>
            <el-input type="text" v-model="formData.userName" prefix-icon="iconfont icon-denglu"
                      placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" v-model="formData.password" prefix-icon="iconfont icon-mima"
                      placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
          </el-form-item>
          <el-row>账号：test01，密码：123456</el-row>
          <el-row>账号：test02，密码：123456</el-row>
          <el-row>账号：test03，密码：123456</el-row>
        </el-form>
      </el-container>
    </el-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "index",
    data() {
      return {
        formData: {
          userName: "",
          password: ""
        }
      }
    },
    computed: {
      ...mapGetters([
        "getUserList"
      ])
    },
    methods: {
      login() {
        if (!this.formData.userName) {
          this.$message.warning("用户名不能为空")
          return false;
        }
        if (!this.formData.password) {
          this.$message.warning("密码不能为空")
          return false;
        }
        let loginUser = this.getLoginUser(this.formData.userName);
        if (!loginUser || loginUser.password != this.formData.password) {
          this.$message.warning("用户名或密码错误")
          return false;
        }
        localStorage.setItem("loginUser", JSON.stringify(loginUser))
        localStorage.setItem("token", new Date().getTime() + "")
        this.$router.push({
          name: 'main'
        })
      },
      getLoginUser(userName) {
        let userList = this.getUserList;
        for (let index = 0; index < userList.length; index++) {
          let user = userList[index];
          if (userName == user.userName) {
            return user;
          }
        }
        return null;
      }
    }
  }
</script>

<style scoped>
  .el-header, .icon-denglu1 {
    font-size: 20px;
    color: #666666;
  }

  .el-row {
    margin-bottom: 5px;
    font-size: 14px;
    color: #777777;
  }

  .login {
    width: 100%;
    height: 100vh;
    display: block;
    position: relative;
  }

  .login::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    content: "";
    background-image: url("../../assets/images/login-bg.jpg");
    opacity: 0.9;
  }

  .login-info {
    position: absolute;
    width: 450px;
    height: 320px;
    right: 120px;
    top: 50%;
    margin-top: -160px;
  }
</style>
