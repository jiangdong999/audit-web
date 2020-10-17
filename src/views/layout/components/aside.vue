<template>
  <div>
    <div class="asideLogo">
      <img src="../../../assets/image/logo1.png" alt="" />
    </div>
    <div>
      <ul class="items">
        <li
          v-for="item in items"
          :key="item.id"
          @click="itemClick(item.index)"
          :class="active == item.index ? 'active' : ''"
        >
          <!-- <i slot="title" class="iconfont" :class="item.icon"></i> -->
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active:'',
      items: [
        {
          label: "帐号审计",
          id: "1",
          index: "/audit/index",
          icon: "icon-shebeiliebiao",
        },
      ],
    };
  },
  methods: {
    itemClick(data) {
      // console.log(data);
      this.active = data;
      // this.$router.push(data);
    },
  },
  mounted(){
    this.active = '/audit/index'
  }
};
</script>
<style lang="less" scoped>
.asideLogo {
  height: 50px;
  background: #007ee4;
  img {
    margin-top: 14px;
  }
}
.items {
  li {
    height: 44px;
    line-height: 44px;
    color: #bbbfc3;
    box-sizing: content-box;
    box-sizing: border-box;
    &:hover {
      background-color: rgb(27, 38, 51);
      cursor: pointer;
    };
  }
  .active {
    // border-left: 5px solid #007ee4;
    box-sizing: content-box;
    box-sizing: border-box;
  }
}
</style>
