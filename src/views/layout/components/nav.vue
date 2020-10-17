<template>
  <div>
    <el-tooltip class="item" effect="dark" content="关闭" placement="bottom">
      <img
        src="../../../assets/image/out.png"
        alt=""
        @click="logoutOn"
        class="logout_Btn"
      />
    </el-tooltip>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { logout } from "@/api/login";
export default {
  methods: {
    ...mapMutations(["SET_TOKEN", "SET_USER"]),
    logoutOn() {
    this.$confirm('确认退出吗？')
      .then(_ => {
        this.$store.dispatch('FedLogOut').then(() => {
          this.$router.push({path:'/'})
        })
      })
      .catch(_ => {
      });
    },
  },
};
</script>

<style lang="less" scoped>
.logout_Btn {
  float: right;
  width: 30px;
  height: 30px;
  margin: 10px 20px 10px 0px;
  cursor: pointer;
}
</style>