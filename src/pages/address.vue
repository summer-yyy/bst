<template>
  <div class="commonPlace">
    <div class="itemWrapper">
      <div class="item">
        <img class="item-icon" src="@/assets/image/add-home-icon@2x.png" />
        <div class="content">
          <p class="title">家</p>
          <p class="text" v-show="address[0].addressName">{{address[0].addressName}}</p>
        </div>
        <div class="control">
          <router-link :to="{path: '/resetplace',query:address[0]}" tag="span" v-show="!address[0].addressName">设置家的位置</router-link>
          <img class="icon" src="@/assets/image/more-normal@2x.png" @click="showModal=true;addressType=0;"  v-show="address[0].addressName"/>
        </div>
      </div>
      <div class="item">
        <img class="item-icon" src="@/assets/image/add-company-icon@2x.png" />
        <div class="content">
          <p class="title">公司</p>
          <p class="text" v-show="address[1].addressName">{{address[1].addressName}}</p>
        </div>
        <div class="control">
          <router-link :to="{path: '/resetplace',query:address[1]}" tag="span" v-show="!address[1].addressName">设置公司的位置</router-link>
          <img class="icon" src="@/assets/image/more-normal@2x.png" @click="showModal=true;addressType=1;" v-show="address[1].addressName"/>
        </div>
      </div>
    </div>
    <Modal v-show="showModal" :btnList="btnList" @click="btnClick"></Modal>
  </div>
</template>

<script>
import { getData } from "@/assets/js/common.js";
import Modal from "@/components/Modal/Modal";

export default {
  name: "commonPlace",
  data() {
    return {
      address: [{}, {}],
      addressType: 0,
      showModal: false,
      showReset: false,
      btnList: [
        {
          color: "#2F3338",
          text: "重新设置地址",
          cb: () => {
            this.$router.push({
              path: "/resetplace",
              query: this.address[this.addressType]
            });
            this.showModal = false;
          }
        },
        {
          color: "#FB7629",
          text: "删除地址",
          cb: () => {
            getData({
              url: "/api/v1/appuser/deleteUserAddress",
              data: {
                id: this.address[this.addressType].id
              },
              success: res => {
                this.address[this.addressType].addressName = "";
                this.showModal = false;
              }
            });
          }
        },
        {
          color: "#9B9B9B",
          text: "取消",
          cb: () => {
            this.showModal = false;
          }
        }
      ]
    };
  },
  methods: {
    // 获取个人信息
    queryUserAddress(userId) {
      if (!userId) {
        return;
      }
      getData({
        url: "/api/v1/appuser/queryUserAddress",
        data: { userId },
        success: res => {
          this.address = res.obj.sort(function(a, b) {
            var value1 = a["type"];
            var value2 = b["type"];
            return value1 - value2;
          });
        }
      });
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
  created() {
    this.queryUserAddress(localStorage.id);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.commonPlace {
  background: #F2F2F2;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  overflow: hidden;

  .itemWrapper {
    padding: 0 0.44rem;
    background: #ffffff;
  }

  .item {
    display: flex;
    align-items: center;
    overflow: hidden;
    border-bottom: 1px solid rgba(237, 237, 237, 1);
    height: 1.45rem;

    .item-icon {
      width: 0.27rem;
      height: 0.27rem;
    }

    .content {
      float: left;
      margin-left: 0.13rem;
      flex: 1;
    }

    .title {
      height: 0.4rem;
      line-height: 0.4rem;
      color: rgba(47, 51, 56, 1);
      font-size: 0.28rem;
    }

    .text {
      height: 0.3rem;
      line-height: 0.3rem;
      color: rgba(155, 155, 155, 1);
      font-size: 0.22rem;
      width: 5rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .control {
      color: rgba(155, 155, 155, 1);
      height: 1.45rem;
      line-height: 1.45rem;
      font-size: 0.26rem;

      span {
        font-size: 0.26rem;
      }
    }
  }
}
</style>
