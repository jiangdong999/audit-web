<template>
  <div class="container">
    <el-container>
      <el-aside width="180px">
        <Aside class="aside"></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Nav class="nav"></Nav>
        </el-header>
        <el-main>
          <Main class="main"></Main>
        </el-main>
        <el-footer>
          <Footer class="footer"></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "./components/aside";
import Nav from "./components/nav";
import Main from "./components/main";
import Footer from "./components/footer";

export default {
  components: {
    Aside,
    Nav,
    Main,
    Footer,
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-header,.el-main,.el-footer{
    padding: 0;
  }
  .aside {
    background-color: rgb(34, 48, 64);
    color: #333;
    text-align: center;
    height: 100%;
  }
  .nav {
    width: 100%;
    height: 50px;
    background: #007ee4;
  }
  .main {
    width: 100%;
    flex: 1;
    background: #f0f2f5;
  }
  .el-main{
    max-height: calc(100vh - 80px);
  }
  .el-footer{
    height: 30px !important;
  }
  .el-header{
    height: 50px !important;
  }
  .footer {
    width: 100%;
    height: 30px;
    background: #F0F2F5;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
  }
}
</style>