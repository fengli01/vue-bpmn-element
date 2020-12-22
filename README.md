# bpmn.js流程设计器组件
```
1、调整设计器UI布局，基于vue-elementui美化属性面板
2、支持设置任务变量、表达式、分支条件等，满足90%以上的业务需求
3、支持flowable和activiti
```
## 组件常用方法
1、配置支持flowable(activiti)
```vue
<vue-bpmn product="flowable"></vue-bpmn>
```
2、组件还在完善中，如果有需要扩展需求，可以参考以下三个事件：
```vue
// 监听选择事件，改变属性栏表单的显示与隐藏
this.modeler.on("selection.changed", e => {
  // TODO
})
// 监听内容变化事件，改变属性栏的值
this.modeler.on("element.changed", e => {
  // TODO
})
// 监听点击事件
this.modeler.on("element.click", e => {
  // TODO
})
```
## 安装运行
```
yarn install
yarn serve
yarn build
```
## 调整后的截图
![UI布局](http://47.108.140.13/images/pic11.jpg?raw=true)
---
![UI布局](http://47.108.140.13/images/pic12.jpg?raw=true)
---
![UI布局](http://47.108.140.13/images/pic13.jpg?raw=tru)
---

## 
##### 在线demo: [](http://47.108.140.13/bpmn/)
##### 后端代码，参照：[https://github.com/fengli01/bpmn-spring-boot.git](https://github.com/fengli01/bpmn-spring-boot.git)
