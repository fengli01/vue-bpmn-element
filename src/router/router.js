import Main from '../views/main/main'

export const otherRouter = [{
  path: '/login',
  name: 'login',
  component: () => import('../views/login/login')
}, {
  path: '/',
  name: '_main',
  redirect: '/main',
  component: Main,
  children: [
    {
      path: '/main',
      name: 'main',
      meta: {
        hideInMenu: true,
        title: '首页',
        notCache: true,
        icon: 'md-home'
      },
      component: () => import('../views/index/index')
    }
  ]
}]

export const appRouter = [{
  path: '/home',
  icon: 'el-icon-s-tools',
  name: 'home',
  title: '首页',
  component: Main,
  children: [{
    path: 'index',
    icon: 'el-icon-s-tools',
    name: 'index',
    title: '首页',
    component: () =>
      import ('../views/index/index')
  }]
},{
  path: '/task',
  icon: 'el-icon-s-cooperation',
  name: 'task',
  title: '任务管理',
  access: 0,
  component: Main,
  children: [{
    path: 'todo',
    icon: 'el-icon-message-solid',
    name: 'tasking',
    title: '待办任务',
    component: () =>
      import ('../views/task/tasktodo')
  }, {
    path: 'done',
    icon: 'el-icon-s-order',
    name: 'tasked',
    title: '已办任务',
    component: () =>
      import ('../views/task/taskdone')
  }]
},
  {
    path: '/process',
    icon: 'el-icon-s-finance',
    name: 'process',
    title: '流程管理',
    access: 0,
    component: Main,
    children: [{
      path: 'design',
      icon: 'el-icon-s-ticket',
      name: 'design',
      title: '流程设计',
      component: () =>
        import ('../views/process/design')
    },{
      path: 'inst',
      icon: 'el-icon-s-claim',
      name: 'inst',
      title: '请假申请',
      component: () =>
        import ('../views/process/inst')
    }]
  }
]

export const routers = otherRouter.concat(appRouter)
export const routes = [
  otherRouter, appRouter
]
