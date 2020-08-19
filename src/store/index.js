import Vue from 'vue'
import Vuex from 'vuex'
import {appRouter} from '../router/router'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userList: [{
      userId: 1001,
      userName: "test01",
      password: "123456",
      nickName: "张三"
    }, {
      userId: 1002,
      userName: "test02",
      password: "123456",
      nickName: "李四"
    }, {
      userId: 1003,
      userName: "test03",
      password: "123456",
      nickName: "王五"
    }, {
      userId: 1004,
      userName: "test04",
      password: "123456",
      nickName: "赵六"
    }, {
      userId: 1005,
      userName: "test05",
      password: "123456",
      nickName: "孙七"
    }, {
      userId: 1006,
      userName: "test06",
      password: "123456",
      nickName: "周八"
    }],
    leaveCategorys: [{
      value: 1,
      label: "年休假"
    }, {
      value: 2,
      label: "调休假"
    }, {
      value: 3,
      label: "事假"
    }, {
      value: 4,
      label: "婚假"
    }, {
      value: 5,
      label: "妇产陪护假"
    }],
    menuList: appRouter
  },
  getters: {
    getUserList: state => {
      return state.userList;
    },
    getMenuList: state => {
      return state.menuList
    },
    getLeaveCategoryList: state => {
      return state.leaveCategorys
    }
  }
})

export default store;
