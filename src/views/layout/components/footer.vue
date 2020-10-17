<template>
<div>
  <div class="mainFooter"> <span style="margin-right:20px">版本号{{version}}</span> © 2015-2020 北京睿家科技有限公司 版权所有 京ICP备15034835号-1</div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'version',
    ])
  },
}
</script>

<style lang="less" scoped>
.mainFooter{
  letter-spacing: 1px;
  height: 30px;
  vertical-align: middle;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #aaaaaa;
  width: 100%;
}
</style>