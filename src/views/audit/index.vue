<template>
  <div>
    <div class="audiTop">
      <span class="auditTitle">审计列表</span>
      <el-popover
        placement="bottom"
        width="510"
        trigger="click"
      >
      <div class="controlFilter">
        <el-form inline :model="searchForm" ref="searchForm">
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="请求时间段">
                <el-date-picker
                  v-model="searchForm.startTime"
                  type="datetime"
                  value-format="timestamp"
                  placeholder="选择日期时间"
                  clearable
                ></el-date-picker>
                <span style="width:20px;display: inline-block;text-align:center">至</span>
                <el-date-picker
                  v-model="searchForm.endTime"
                  type="datetime"
                  value-format="timestamp"
                  placeholder="选择日期时间"
                  clearable
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="帐号姓名" prop="userName">
                <el-input placeholder="请输入" clearable v-model="searchForm.userName" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="帐号手机" prop="userPhone">
                <el-input placeholder="请输入" clearable v-model="searchForm.userPhone" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="系统名称" prop="appSign">
                <el-input
                  placeholder="请输入"
                  clearable
                  :maxlength="20"
                  v-model="searchForm.appSign"
                />
              </el-form-item>
            </el-col>
            
          </el-row>
          <span class="Classbtn">
            <el-button @click="handleReset()">重置</el-button>
            <el-button type="primary" @click="loadData()">搜索</el-button>
          </span>
        </el-form>
      </div>
        <span class="auditFilter" slot="reference">
          <img src="../../assets/image/filter.png" alt="" /> <b>筛选</b>
        </span>
      </el-popover>
    </div>
    <div class="audiBottom" v-loading="loading">
      <el-table stripe :data="tableData">
        <div slot="empty" class="empty-table"></div>
        <el-table-column type="index" :index="indexMethod" width="70" label="序号"></el-table-column>
        <el-table-column prop="userName" min-width="100" label="帐号姓名"></el-table-column>
        <el-table-column prop="userPhone" min-width="100" label="帐号手机"></el-table-column>
        <el-table-column prop="startTime" min-width="200" label="请求时间">
          <template slot-scope="scope">{{scope.row.startTime | formatTimeMillisToDateTime}}</template>
        </el-table-column>
        <el-table-column prop="appSign" min-width="100" label="系统名称"></el-table-column>
        <el-table-column prop="desc" min-width="100" label="操作描述"></el-table-column>
        <el-table-column prop="status" min-width="100" label="返回状态码"></el-table-column>
        <el-table-column prop="message" min-width="100" label="返回描述"></el-table-column>
        <el-table-column label="展开" fixed="left" width="60" type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="table-expand">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="帐号UUID">
                    <span class="word-break">{{ scope.row.userUuid }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="请求IP">
                    <span class="word-break">{{ scope.row.ip }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="路径">
                    <span class="word-break">{{ scope.row.path }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="创建时间">
                    <span class="word-break">{{ scope.row.createTime | formatTimeMillisToDateTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="请求返回时间">
                    <span class="word-break">{{ scope.row.endTime  | formatTimeMillisToDateTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="URL">
                    <span class="word-break">{{ scope.row.uri }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
      </el-table>

      <div class="page-container">
        <el-pagination
          background
          @size-change="limitChange"
          @current-change="turnPage"
          :current-page="page"
          layout="prev, pager, next"
          :page-count="totalPage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {auditList } from "@/api/login";
import mixin from "@/utils/mixin";
import { formatTimeMillisToDateTime } from "@/filters/index";
export default {
  mixins: [mixin],
  filters: {
    formatTimeMillisToDateTime,
  },
  data(){
    return{
      loading: false,
      searchForm: {
        startTime:'',
        endTime:'',
        userName:'',
        userPhone:'',
        appSign:''
      },
    }
  },
  methods:{
    loadData: function (page = 1, limit = 10) {
    this.loading = true;
    let searchParams = { ...this.searchForm };
    searchParams.page = page || 1;
    searchParams.size = limit || 10;
    auditList(searchParams)
      .then((response)=> {
        if (response.data && response.data.status === 0) {
          this.tableData = response.data.content.list || [];
          this.totalPage = response.data.content.totalPage;
          this.loading = false;
          this.page == 1 && this.pageReset();
        }
      })
      .catch((a)=> {
        console.error(a);
      });
    },
    handleReset: function () {
      this.$refs.searchForm.resetFields();
      this.searchForm.startTime=""
      this.searchForm.endTime=""
      this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
.audiTop {
  width: auto;
  height: 50px;
  background: #fff;
  padding: 0 20px;
  .auditTitle {
    font-size: 16px;
    color: #333;
    line-height: 50px;
    font-weight: 900;
  }
  .auditFilter {
    float: right;
    height: 50px;
    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
      margin: 15px 5px 15px 0px;
    }
    b {
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      display: block;
      float: right;
      color: #007ee4;
    }
  }
}
.audiBottom{
  margin-top: 20px;
  background: #fff;
  height: 500px;
  padding: 0 20px;
}
.page-container{
  margin: 20px;
  float: right;
}
.controlFilter{
  padding:0 20px 20px 20px;
}
.Classbtn{
  width: 100%;
  height: 50px;
  display: inline-block;
  text-align: right;
  margin-top: 20px;
}

</style>