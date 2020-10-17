<template>
  <div class="contentBag">
    <div class="content">
      <div class="contentTitle">
        <!-- <h1>智慧社区综合管理子系统</h1> -->
        <p>
          为提升安全保障等级，现统一使用手机号登录<br />
          如您在登录过程中遇到问题，请咨询客服热线4009-110-110
        </p>
      </div>
      <div class="contentForm">
        <div class="contentForm_title">
          <b>手机号登录</b>
        </div>
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
          <el-form-item prop="phone">
            <el-input
              placeholder="请输入手机号"
              type="number"
              v-model="loginForm.phone"
              clearable
            >
              <i slot="prefix" class="iconfont icon-shouji"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div style="display: flex">
              <span style="flex: 1; margin-right: 10px">
                <el-input
                  placeholder="请输入验证码"
                  v-model="loginForm.smsCode"
                >
                  <i slot="prefix" class="iconfont icon-duanxin"></i>
                </el-input>
              </span>
              <span>
                <el-button
                  type="primary"
                  style="
                    width: 90px;
                    height: 40px;
                    min-width: fit-content;
                    padding: 0 10px;
                  "
                  :loading="codeLoading"
                  class="primary"
                  size="small"
                  @click="getCode(loginForm.phone)"
                  :disabled="!show"
                  >{{ show ? "获取验证码" : count + "s后重新获取" }}</el-button
                >
              </span>
            </div>
          </el-form-item>
        </el-form>
        <div class="contentSubmit">
          <el-button type="primary" @click="loginIn">登录</el-button>
        </div>
        <div class="contentForm_footer">版本号 {{version}}</div>
      </div>
    </div>
    <div class="footer">
      © 2015-2020 北京睿家科技有限公司 版权所有 京ICP备15034835号-1
    </div>
  </div>
</template>

<script>
import { validateMobile } from "@/utils/rules";
import { sendCode, loginByUsername } from "@/api/login";
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'version',
    ])
  },
  data() {
    return {
      loginForm: {
        phone: "",
        smsCode: "",
      },
      loading: false,
      codeLoading: false,
      show: true,
      count: "",
      timer: null,
      loginRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: validateMobile,
            message: "请输入正确手机号",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { max: 6, message: "请输入正确验证码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    loginIn() {
      let self = this;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          loginByUsername({
            appSign: "manager",
            productSign: "community",
            ...self.loginForm,
          })
            .then(function (response) {
              if (response && response.data.status === 0) {
                self.$message({
                  message: response.data.message,
                  type: "success",
                });
                self.$store.dispatch("LoginToken",response.data.content.token)
                self.$store.dispatch("LoginUser",response.data.content.userDetail.user)
                self.$router.push({ path: "/audit/index" });
              }
            })
            .catch(function (a) {
              console.error(a);
            })
            .finally((_) => {
              self.codeLoading = false;
            });
        } else {
          return false;
        }
      });
    },
    getCode(phone) {
      let self = this;
      let no = /^1(3|4|5|6|7|8|9)\d{9}$/g;
      if (!phone || !no.test(phone)) {
        self.$message.error("请输入正确的手机号码");
        return;
      }
      self.codeLoading = true;
      sendCode({
        appSign: "manager",
        productSign: "community",
        phone: phone,
      })
        .then(function (response) {
          if (response && response.data.status === 0) {
            const TIME_COUNT = 60;
            if (!self.timer) {
              self.count = TIME_COUNT;
              self.show = false;
              self.timer = setInterval(() => {
                if (self.count > 0 && self.count <= TIME_COUNT) {
                  self.count--;
                } else {
                  self.show = true;
                  clearInterval(self.timer);
                  self.timer = null;
                }
              }, 1000);
            }
          }
        })
        .catch(function (a) {
          console.error(a);
        })
        .finally((_) => {
          self.codeLoading = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.contentBag {
  width: 100%;
  height: 100%;
  position: fixed;
  background-image: url(../../assets/image/bg-login.png);
  background-size: cover;
  background-position: 50% 50%;
  .content {
    width: 350px;
    height: auto;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .contentTitle {
      margin-bottom: 10px;
      h1 {
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        margin-bottom: 50px;
      }
      p {
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
        color: #ffffff;
        text-align: center;
      }
    }
    .contentForm {
      width: 270px;
      height: auto;
      background: #fff;
      padding: 18px 40px 10px 40px;
      border-radius: 4px;
      .contentForm_title {
        width: 100%;
        box-sizing: border-box;
        height: 40px;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 14px;
        font-weight: 500;
        color: #007ee4;
        border-bottom: 2px solid #e4e7ed;
        margin-bottom: 20px;
        position: relative;
        b {
          line-height: 38px;
          display: inline-block;
          list-style: none;
          font-size: 14px;
          font-weight: 500;
          color: #007ee4;
          border-bottom: 2px solid #007ee4;
          position: absolute;
        }
      }
      .contentSubmit {
        text-align: center;
        button {
          width: 100%;
        }
      }
      .contentForm_footer {
        color: #b5c2ca;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        margin: 20px 0;
      }
    }
    .primary {
      background-color: #4ba0ff;
      border-color: #4ba0ff;
    }
  }
  .footer {
    position: fixed;
    width: 100%;
    bottom: 6px;
    font-size: 12px;
    color: #f1f1f1;
    text-align: center;
    padding: 0 20px;
  }
}
</style>
<style>
/* element样式重置 start */
/* 去掉input尾部上下小箭头 start */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  -o-appearance: none !important;
  -ms-appearance: none !important;
  appearance: none !important;
  margin: 0;
}
input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  -o-appearance: textfield;
  -ms-appearance: textfield;
  appearance: textfield;
}
/* 去掉input尾部上下小箭头 end */
</style>