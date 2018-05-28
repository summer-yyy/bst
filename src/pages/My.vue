<template>
  <div class="my">
    <div class="header-top">
      <img class="bg-img" src="../../static/image/myImg/my-background@2x.png"/>
      <div class="header-icon" @click="showModal=true">
        <img :src="headerImg" />
      </div>
    </div>
    <div class="phone-number">{{userPhone}}</div>
    <div class="tab-box" @click="goNewsList">
      <i class="tab-icon my-news-icon">
        <i class="has-news"></i>
        <img src="../../static/image/myImg/message@2x.png"/>
      </i>
      <span class="my-news" >我的消息</span>
    </div>

    <div class="tab-box tab-box-second" @click="$router.push('/address')">
      <i class="tab-icon usual-icon">
        <img src="../../static/image/myImg/my-add@2x.png"/>
      </i>
      <span class="my-news">常用地点</span>
    </div>
    <Modal v-show="showModal" :btnList="btnList" @click="btnClick"></Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal/Modal";
export default {
  name: "Index",
  data() {
    return {
      showModal: false,
      btnList: [
        {
          color: "#FF7E34",
          text: "退出登录",
          cb: () => {
            localStorage.clear();
            this.$router.replace("/");
            this.showModal = false;
          }
        },
        {
          color: "#9B9B9B",
          text: "取消",
          cb: () => {
            this.showModal = false;
          }
        }
      ],
      headerImg: "../static/image/myImg/my-image@2x.png",
      userPhone: localStorage.mobile
    };
  },
  methods: {
    getReplace() {
      this.userPhone = this.userPhone.replace(
        /(\d{3})\d{4}(\d{4})/,
        "$1****$2"
      );
    },
    goNewsList() {
      this.$router.push("/my/newsList");
    },
    btnClick(index) {
      if (
        this.btnList[index].cb &&
        typeof this.btnList[index].cb === "function"
      ) {
        this.btnList[index].cb();
      }
    }
  },
  components: {
    Modal
  },
  mounted() {},
  created() {
    // 判断是否登陆
    if (localStorage.id) {
      this.getReplace();
    } else {
      this.$router.push("/login");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my {
  width: 100%;
  height: 100%;
  overflow: auto;
  font-family: PingFangSC-Regular;
}
.header-top {
  width: 100%;
  position: relative;
}
.bg-img {
  width: 100%;
}
.header-icon {
  position: absolute;
  width: 1.4rem;
  height: 1.4rem;
  bottom: 0;
  left: 1.1rem;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}
.header-icon img {
  width: 100%;
}
.phone-number {
  margin-top: 0.24rem;
  font-size: 0.32rem;
  line-height: 0.45rem;
  color: #2f3338;
  text-align: left;
  margin-left: 0.9rem;
  padding-bottom: 0.11rem;
}
.tab-box {
  text-align: left;
  width: 100%;
  overflow: hidden;
  padding-top: 0.34rem;
}
.tab-icon {
  display: block;
  float: left;
  width: 0.32rem;
  margin-left: 0.95rem;
  position: relative;
}
.usual-icon {
  background-size: 100%;
  width: 0.32rem;
  height: 0.35rem;
  padding-top: 0.1rem;
}
.tab-icon img {
  width: 100%;
}
.my-news {
  font-size: 0.3rem;
  color: #333;
  margin-left: 0.36rem;
}
.has-news {
  display: block;
  position: absolute;
  width: 0.14rem;
  height: 0.14rem;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  background: #f43531;
  right: -0.15rem;
  top: 0.5rem;
}
  .tab-box-second{
    padding-top: 0;
  }
</style>
