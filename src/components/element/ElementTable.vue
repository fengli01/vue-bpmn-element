<template>
  <div>
    <el-table :data="data.list">
      <el-table-column v-for="(item,index) in columns" :key="index" :prop="item.key"
                       :label="item.title" :formatter="item.formatter">
        <template slot-scope="scope">
          <div v-if="item.formatter" v-html="item.formatter(scope.row,item.key,scope.row[item.key],index)"></div>
          <div v-else>{{scope.row[item.key]}}</div>
        </template>
      </el-table-column>
    </el-table>
    <div style="background-color: #ffffff;text-align: right;padding: 8px 0;">
      <el-pagination
          layout="prev, pager, next"
          :total="data.total" :page-size="pageSize" :current-page="page" @prev-click="reload" @next-click="reload"
          @current-change="reload">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ElementTable",
    data() {
      return {
        data: {},
        page: 1
      }
    },
    props: {
      url: String,
      pageSize: Number,
      columns: Array
    },
    created() {
      if (!this.pageSize) {
        this.pageSize = 10;
      }
      this.reload(this.page);
    },
    methods: {
      reload(page) {
        let that = this;
        this.page = page;
        this.get(this.url, {page: this.page, pageSize: this.pageSize}, res => {
          that.data = res.data;
        })
      }
    }
  }
</script>

<style scoped>

</style>
