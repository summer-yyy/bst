<template>
  <div class="wrapper">
    <div class="mask"></div>
    <div class="contentWrapper">
      <Dialog :title="title" :error="error" :btnText="btnText" :btnActive="checked&&btnActive" @btnClick="btnClick" @close="close">
        <div class="content" v-show="step===1"  v-bind:style="{  marginBottom : fontSize + 'rem' }">
          <span>+86</span>
          <img src="@/assets/image/phone-arrrow@2x.png">
          <div class="input">
           <bst-input v-model="phoneNum" :placeHolder="placeHolder" :iconShow="false" :maxLength="11" @input="input"></bst-input>
          </div>
        </div>
        <div class="content codeWrapper" v-show="step===2"   >
          <p>验证码发送至{{phoneNum}}</p>
          <div class="sendCode" :class="{active: intervalCode===0}" @click="sendCode">
            {{intervalCode === 0 ? '重新发送' : intervalCode + 's后重发'}}
          </div>
          <div class="code">
            <input class="codeInput" v-model="code" @input="codeInput($event.target.value)" maxlength="4">
            <div class="box" :class="{active: 1 === codeActive}">{{code.charAt(0)}}</div>
            <div class="box" :class="{active: 2 === codeActive}">{{code.charAt(1)}}</div>
            <div class="box" :class="{active: 3 === codeActive}">{{code.charAt(2)}}</div>
            <div class="box" :class="{active: 4 === codeActive}">{{code.charAt(3)}}</div>
          </div>
        </div>
        <div class="agreenment" v-show="step===2">
          <img class="icon-check" :src="checked?iconChecked:iconCheck" alt="" @click="checked = !checked">
          您已阅读并同意
          <router-link to="/agreement" tag="span">《用户注册协议》</router-link>
        </div>
      </Dialog>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import Dialog from "@/components/dialog/dialog";
import BstInput from "@/components/bst-input/bst-input";
import { getData } from "@/assets/js/common.js";
export default {
  name: "login",
  data() {
    return {
      step: 1,
      title: "输入手机号",
      checked: true,
      iconChecked: require("@/assets/image/selected@2x.png"),
      iconCheck: require("@/assets/image/Unselected@2x.png"),
      error: "",
      btnText: "下一步",
      placeHolder: "请输入手机号码",
      phoneNum: "",
      btnActive: false,
      codeActive: 1,
      code: "",
      intervalCode: 0,
      fontSize:0.93
    };
  },
  methods: {
    interval() {
      let timer = setInterval(() => {
        this.intervalCode--;
        if (this.intervalCode === 0) {
          clearInterval(timer);
          return;
        }
      }, 1000);
    },
    sendCode() {
      if (this.intervalCode !== 0) {
        return;
      }
      this.intervalCode = 60;
      this.interval(this.intervalCode);
      getData({
        url: "/api/v1/appuser/sendSMS",
        data: {
          mobile: this.phoneNum
        }
      });
    },
    // 注册
    regist() {
      getData({
        url: "/api/v1/appuser/regist",
        data: {
          mobile: this.phoneNum,
          verCode: this.code
        },
        success: res => {
          localStorage.id = res.obj.id;
          localStorage.mobile = res.obj.mobile;
          this.$router.push("/");
        },
        fail: res => {
          this.error = res.msg;
        }
      });
    },
    input(val) {
      if (val.length < 11) {
        this.btnActive = false;
        this.error = "";
      } else {
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
          if (!myreg.test(val)) {
          this.error = "手机号有误";
          this.btnActive = false;
        } else {
          this.btnActive = true;
        }
      }
    },
    btnClick() {
      if (this.step === 1) {
        this.sendCode();
        this.title = "输入验证码";
        this.btnText = "完成";
        this.btnActive = false;
        this.step++;
      } else if (this.step === 2) {
        // 注册
        this.regist();
      }
    },
    codeInput(val) {
      this.codeActive = val.length + 1;
      if (val.length < 4) {
        this.error = "";
        this.btnActive = false;
      } else {
        this.btnActive = true;
      }
    },
    close() {
      this.$router.push("/");
    }
  },
  components: {
    Dialog,
    BstInput
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  .mask {
    background: url('../../static/image/indexImg/bus-photo@2x.png') top no-repeat;
    position: absolute;
    filter: blur(22px);
    background-color: rgba(0, 0, 0, 0.2);
    height: 100%;
    width: 100%;
    filter: blur(22px);
    z-index: 2;
  }

  .bottom {
    width: 100%;
    height: 1rem;
    position: absolute;
    background-color: #F2F2F2;
    left: 0;
    bottom: 0;
    z-index: 1;
  }

  .contentWrapper {
    position: absolute;
    top: 2.17rem;
    left: 50%;
    margin-left: -2.7rem;
    width: 5.4rem;
    z-index: 3;

    .content {
      display: flex;
      color: #9B9B9B;
      font-size: 0.26rem;
      margin-top: 0.24rem;
      align-items: center;
      span{
        display inline-block;
        margin-left 0.71rem;
        font-family:PingFang-SC-Medium;
        color: #9B9B9B;
      }
      img {
        width: 0.1344rem;
        margin: 0 0.18rem;
      }

      .input {
        width: 2.5rem;
        overflow: hidden;
        font-size :0.3rem;
        margin:0;
      }

      .sendCode {
        width: 1.66rem;
        height: 0.58rem;
        line-height: 0.58rem;
        border-radius: 0.04rem;
        border: 0.5px solid rgba(204, 204, 204, 1);
        margin-top: 0.35rem;

        &.active {
          color: #666;
        }
      }

      .code {
        display: flex;
        margin-top: 0.35rem;
        position: relative;
        overflow: hidden;

        .codeInput {
          opacity: 0;
          height: 100%;
          width: 200%;
          left: -100%;
          top: 0;
          position: absolute;
        }

        .box {
          width: 0.9rem;
          height: 0.9rem;
          border-radius: 0.02rem;
          border: 0.5px solid rgba(204, 204, 204, 1);
          margin-right: 0.24rem;
          line-height: 0.9rem;
          color: rgba(51, 51, 51, 1);
          font-size: 0.48rem;
          text-align: center;

          &:nth-last-child(1) {
            margin-right: 0;
          }

          &.active {
            border: 0.5px solid rgba(255, 183, 64, 1);
          }
        }
      }
    }

    .codeWrapper {
      flex-direction: column;
      margin-top: 0;
    }

    .agreenment {
      margin-top: 0.28rem;
      margin-bottom: 0.38rem;
      font-size: 0.22rem;
      color: #cccc;

      .icon-check {
        width: 0.22rem;
        height: 0.22rem;
      }

      span {
        color: #FFB740;
      }
    }
  }
}
</style>
