<template>
  <div>
    <el-container style="height: 100vh">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu style="width: 230px;height: 100%" default-active="/qrcode/tasking" @open="handleOpen" @close="handleClose"
                 @select="handleSelect"
                 unique-opened router v-show="!collapsed" background-color="#486586" text-color="rgb(238, 238, 238)">
          <template v-for="(item,index) in getMenuList">
            <el-submenu v-if="item.children.length>1" :index="index+''" :key="'muti'+index">
              <template slot="title"><i :class="item.icon"></i>{{item.title}}</template>
              <el-menu-item v-for="(child,i) in item.children"
                            :index="item.path+'/'+child.path"
                            :key="index+'-'+i">
                <template slot="title"><i :class="child.icon"></i>{{child.title}}</template>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.children.length==1" :key="'single'+index"
                          :index="item.path+'/'+item.children[0].path">
              <i :class="item.children[0].icon"></i>{{item.children[0].title}}
            </el-menu-item>
          </template>
        </el-menu>

        <ul class="el-menu collapsed" v-show="collapsed" ref="menuCollapsed" style="height: 100%">
          <li v-for="(item,index) in getMenuList" :key="index" class="el-submenu item">
            <template>
              <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)"
                   @mouseout="showMenu(index,false)">
                <i :class="item.icon"></i>
              </div>
              <ul class="el-menu submenu submenu-hook-bg" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)"
                  @mouseout="showMenu(index,false)" >
                <li v-for="child in item.children" :key="child.path" style="padding-left: 40px" class="el-menu-item"
                    :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">
                  {{child.title}}
                </li>
              </ul>
            </template>
          </li>
        </ul>
      </aside>
      <el-container>
        <el-header>
          <el-icon class="iconfont icon-menu" :class="rotateIcon" @click.native="collapsedSider"></el-icon>
        </el-header>
        <el-main style="background-color: #fbfbfb;padding: 8px 0 0 15px;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        collapsed: false
      }
    },
    computed: {
      ...mapGetters([
        "getMenuList"
      ]),
      rotateIcon() {
        return [
          'menu-icon', !this.collapsed ? 'rotate-icon' : ''
        ];
      }
    },
    methods: {
      collapsedSider() {
        this.collapsed = !this.collapsed;
      },
      handleOpen() {
      },
      handleClose() {
      },
      handleSelect() {
      },
      showMenu(i, status) {
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      },
      toIndex(){
        this.$router.push({
          name: 'main'
        })
      }
    },
    beforeRouteEnter(to, from, next) {
      if (!localStorage.getItem("token")) {
        next(vm => {
          vm.$router.push({
            name: 'login'
          })
        })
      } else {
        next()
      }
    }
  }
</script>

<style scoped>
  .menu-collapsed {
    flex: 0 0 60px;
    width: 60px;
  }

  .submenu-hook-bg,.collapsed{
    background-color: #486586;
  }
  .submenu-hook-bg .el-menu-item{
    color: rgb(238, 238, 238);
  }

  .collapsed {
    width: 60px;
  }
  .el-submenu__title:hover,.submenu-hook-bg .el-menu-item:hover{
    background-color: rgb(48, 65, 86);
  }

  .collapsed .item {
    position: relative;
  }
  .el-icon-s-cooperation,.el-submenu__title i{
    color: rgb(238, 238, 238)
  }

  .collapsed .submenu {
    position: absolute;
    top: 0px;
    left: 60px;
    z-index: 99999;
    height: auto;
    display: none;
  }

  .menu-expanded {
    flex: 0 0 230px;
    width: 230px;
  }

  .menu-icon, .fade-enter-active, .fade-leave-active {
    font-size: 24px;
    transition: all .1s;
    line-height: 60px;
    color: #666666;
    transform: rotate(90deg);
  }

  .rotate-icon {
    transform: rotate(0deg);
  }
  .el-submenu__title i,.el-menu-item i {
    color: #ffffff;
  }
</style>
