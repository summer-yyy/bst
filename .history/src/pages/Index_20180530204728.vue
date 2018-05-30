<template>
  <div class="index" @click="isLogin">
    <div class="headerImg">
      <img src="../../static/image/indexImg/bus-photo@2x.png" />
    </div>
    <div class="now-position">
      <div class="now-position-left">
        <div class="start-position">
          <i class="circle blue-circle"></i>
          <input type="text"  placeholder="当前位置" v-model="startPosition.address" @input="autocomplete(startPosition.address, 'start')"/>

        </div>
        <div class="end-position">
        <i class="circle yellow-circle"></i>
        <input type="text" placeholder="请输入目的地或路线名称" v-model="endPosition.address" @input="autocomplete(endPosition.address, 'end')"/>

      </div>
      </div>
      <div class="now-position-right">
        <div class="sreach-btn" @click="search">
          <img src="../assets/image/indexImg/search-but-normal@2x.png"/>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="result" v-show="result.length>0">
        <div class="item" v-for="(item, index) in result" :key="index" @click="setPosition(item)"   v-bind:style="{ background: backgroundcolor }">
          <img class="item-icon" src="@/assets/image/site@2x.png" />
          <div class="content">
            <p class="title">{{item.name}}</p>
            <p class="text">{{typeof item.address === 'string' ? item.address : item.district}}</p>
            <div class="imgBox" v-show="target=='end'" @click.prevent="setPosition(item);search()"><img src="../../static/image/indexImg/indexgo.png"/> </div>
          </div>
        </div>
      </div>
    </transition>

    <div class="card-show usual-address">
      <itemWrapper :title="title1" :icon="icon1" @iconClick="goAddress()">
        <div class="itemWrapper">
      <div class="item">
        <img class="item-icon" src="@/assets/image/add-home-icon@2x.png" />
        <div class="content">
          <p class="title">家</p>
        </div>
        <div class="control">
          <span @click="addressClick(usualAddresses[0])">{{usualAddresses[0].addressName || "设置家的位置"}}</span>
        </div>
      </div>
      <div class="item">
        <img class="item-icon" src="@/assets/image/add-company-icon@2x.png" />
        <div class="content">
          <p class="title">公司</p>
        </div>
        <div class="control">
          <span @click="addressClick(usualAddresses[1])">{{usualAddresses[1].addressName || "设置公司的位置"}}</span>
        </div>
      </div>
    </div>
      </itemWrapper>
    </div>
   <div class="card-show history-search" v-show="id && historySearch.length> 0">
     <History @clear="clear">
        <ul class="card-content-ul history-search-ul">
          <li v-for="item in historySearch" @click="search($event, item)">
            <img  class="history-search-icon" src='../../static/image/indexImg/clock-icon@2x.png' />
            <span class="card-content-name history-search-name">{{item.start.address}}</span>
            <img src='../../static/image/indexImg/arrow-icon@2x.png'  class="history-arrow"/>
            <span class="card-content-name history-search-name">{{item.end.address}}</span>
          </li>
        </ul>
     </History>
    </div>


  </div>
</template>

<script>
import { getData, setStorage, getStorage } from "@/assets/js/common.js";
import itemWrapper from "@/components/item-wrapper/item-wrapper";
import History from "@/components/history/history";
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();

export default {
  name: "Index",
  data() {
    return {
      id: "",
      target: "end",
      title1: "常用地点",
      icon1: require("@/assets/image/add-more-normal@2x.png"),
      msgStr: "../assets/image/indexImg",
      location: {},
      backgroundcolor:'#fff',
      endPosition: {
        address: ""
      }, //目的地位置input
      startPosition: {
        address: ""
      }, //始发位置input
      usualAddresses: [{}, {}],
      result: [],
      historySearch: [
        {
          start: "虹桥机场航站楼",
          end: "人民广场"
        },
        {
          start: "虹桥机场航站楼",
          end: "人民广场"
        }
      ]
    };
  },
  methods: {
    // 判断是否登陆
    isLogin() {
      if (!this.id) {
        this.$router.push("/login");
        return;
      }
    },
    goAddress() {
      this.$router.push({
        path: "/address"
      });
    },
    // 获取个人信息
    queryUserAddress(userId) {
      if (!userId) {
        return;
      }
      getData({
        url: "/api/v1/appuser/queryUserAddress",
        data: { userId },
        success: res => {
          this.usualAddresses = res.obj.sort(function(a, b) {
            var value1 = a["type"];
            var value2 = b["type"];
            return value1 - value2;
          });
        }
      });
    },
    addressClick(address) {
      if (address.addressName) {
        this.endPosition.address = address.addressName;
        this.endPosition.lng = address.longitude;
        this.endPosition.lat = address.latitude;
        this.search();
      } else {
        this.$router.push({ path: "/resetplace", query: address });
      }
    },
    //设置查询地点
    setPosition(item) {
      this[this.target + "Position"].address = item.name;
      this[this.target + "Position"].lng = item.location.lng;
      this[this.target + "Position"].lat = item.location.lat;
      this.result = [];
    },
    // 查路线
    search(e, pos) {
      let position = {};
      if (pos) {
        position = pos;
      } else {
        if (!this.id) {
          this.$router.push("/login");
          return;
        } else {
          if (!this.endPosition.address) {
            alert(`请输入目的地`);
            return;
          } else {
            if (!this.startPosition.address) {
              if (!this.location.address) {
                alert(`定位中，请稍后再试！`);
                return;
              }
            } else if (!this.startPosition.lng) {
              alert(
                `很抱歉，在地图中未搜索到此起始点，请您与客服联系，我们将进行补全，感谢您理解。
            `
              );
              return;
            } else if (!this.endPosition.lng) {
              alert(
                `很抱歉，在地图中未搜索到此目的地，请您与客服联系，我们将进行补全，感谢您理解。`
              );
              return;
            }
          }
        }
        position = {
          start:
            this.startPosition.address === ""
              ? this.location
              : this.startPosition,
          end: this.endPosition
        };
      }
      // 记录去重
      let history = getStorage("searchList");
      history.forEach((element, index) => {
        if (
          element.start.address === position.start.address &&
          element.end.address === position.end.address
        ) {
          history.splice(index, 1);
        }
      });
      history.unshift(position);
      setStorage("searchList", history.slice(0, 3));
      getData({
        url: "/api/v1/busline/queryBusLineByUserPoin",
        data: {
          startPoin: `${position.start.lng},${position.start.lat}`,
          endPoin: `${position.end.lng},${position.end.lat}`
        },
        success: res => {
          this.$router.push({
            path: "/mapDetail",
            query: {
              busLineTarget: JSON.stringify(res.busLineTarget),
              start: JSON.stringify(position.start),
              end: JSON.stringify(position.end)
            }
          });
        }
      });
    },
    // 搜素自动补全
    autocomplete(val, target) {
      this.target = target;
      let autocomplete = new AMap.Autocomplete();
      autocomplete.search(val, (status, result) => {
        if (result && result.tips) {
          this.result = result.tips
            .filter(item => {
              return item.location.lat && item.location.lng;
            })
            .slice(0, 5);
          this[this.target + "Position"].lng = this.result[0].location.lng;
          this[this.target + "Position"].lat = this.result[0].location.lat;

        } else {
          this[this.target + "Position"].lng = "";
          this[this.target + "Position"].lat = "";
          this.result = [];
        }
      });
    },
    // 定位
    getLocation() {
      let geolocation = new AMap.Geolocation({ enableHighAccuracy: true });
      geolocation.getCurrentPosition((status, result) => {
        if (result && result.position) {
          this.location = {
            lng: result.position.lng,
            lat: result.position.lat,
            address: result.formattedAddress
          };
        }
      });
    },
    // 清空历史
    clear() {
      this.historySearch = [];
      localStorage.removeItem("searchList");
    }
  },
  components: {
    itemWrapper,
    History
  },
  created() {
    this.id = localStorage.id;
    this.queryUserAddress(localStorage.id);
    this.historySearch = getStorage("searchList");
  },
  mounted() {
    setTimeout(() => {
      this.getLocation();
    }, 100);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.index {
  height: 100%;
  overflow: auto;
  font-family: PingFangSC-Regular;
  padding: 0.2rem;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 3s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.headerImg {
  width: 100%;
  height: 2.28rem;
  overflow: hidden;
}

.headerImg img {
  width: 100%;
  border: 0;
}

.now-position {
  display: flex;
  height: 2rem;
  background: #fff;
  margin-top: 0.2rem;
  border-radius: 0.04rem;
  align-items: center;
  padding: 0 0.3rem;

  input {
    flex: 1;
    border: none;
    margin-left: 0.18rem;
    font-size: 0.28rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.now-position-left {
  flex: 1;
}

.circle {
  display: block;
  width: 0.14rem;
  height: 0.14rem;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  background: #70C1FF;
}

.yellow-circle {
  background: #FFB740;
}

.start-position {
  height: 1rem;
  border-bottom: 0.5px solid rgba(231, 231, 231, 1);
  display: flex;
  align-items: center;
}

.end-position {
  height: 1rem;
  display: flex;
  align-items: center;
}

.result {
  display: flex;
  margin-top: 0.2rem;
  flex-direction: column;
  background: #fff;
  position: absolute;
  width: calc(100% - 0.4rem);
  box-sizing: border-box;
  .item {
    display: flex;
    align-items: center;
    overflow: hidden;
    border-bottom: none;
    height: 1.2rem;
    padding: 0 0.3rem;
    border-bottom: 0.01rem solid #f1f1f1;

    &:hover {
      background-color: rgba(242, 242, 242, 0.5);
    }

    .item-icon {
      width: 0.27rem;
      height: 0.27rem;
    }

    .content {
      float: left;
      margin-left: 0.2rem;
      flex: 1;
      position: relative
    }
    .imgBox{
      position: absolute;
      width :0.4rem;
      height:0.4rem;
      top:0.20rem;
      right:0rem;

    }
    .imgBox img{
      width:100%;
      display block;
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
  }
}

.now-position-right {
}

.sreach-btn {
  width: 0.96rem;
  height: 0.96rem;
  margin-left: 0.3rem;
}

.sreach-btn img {
  width: 100%;
}

.card-show {
  width: 100%;
  background: #fff;
  margin-top: 0.3rem;
  border-radius: 0.04rem;
}

.card-title {
  width: 100%;
  font-size: 1.1rem;
  color: #9B9B9B;
  text-align: left;
  position: relative;
  height: 4.3rem;
  border-bottom: 0.5px solid #E7E7E7;
}

.card-title span {
  display: block;
  margin-left: 1.5rem;
  line-height: 4.3rem;
}

.title-go {
  display: block;
  position: absolute;
  width: 0.67rem;
  height: 0.67rem;
  right: 2.6rem;
  top: 1.8rem;
  background: url('../assets/image/indexImg/add-more-normal@2x.png') no-repeat center;
  background-size: 100%;
}

.card-title:hover .title-go {
  background: url('../assets/image/indexImg/add-more-hover@2x.png') no-repeat center;
  background-size: 100%;
}

ul {
  -webkit-padding-start: 0;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
}

ul li {
  list-style: none;
}

.card-content-ul {
  -webkit-padding-start: 0;
}

.card-content-ul li {
  height: 0.86rem;
  text-align: left;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 0.3rem;
}

.address-icon {
  display: block;
  float: left;
  width: 1.2rem;
  height: 1.2rem;
  line-height: 4.4rem;
  margin-left: 1.5rem;
}

.address-icon img {
  width: 100%;
}

.card-content-name {
  line-height: 0.86rem;
}

.address-name {
  font-size: 1.4rem;
  margin-left: 1.01rem;
  color: #2F3338;
}

.address {
  float: right;
  line-height: 4.3rem;
  font-size: 1.2rem;
  color: #9B9B9B;
  margin-right: 2.5rem;
}

.history-search-icon {
  width: 0.22rem;
  height: 0.22rem;
}

.history-search-name {
  font-size: 0.26rem;
  color: #5D5D5D;
  margin-left: 0.22rem;
  max-width: 2.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-arrow {
  width: 0.34rem;
  height: 0.11rem;
  margin-left: 0.19rem;
}

.itemWrapper {
  padding: 0 0.44rem;
  background: #ffffff;
}

.item {
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 0.95rem;

  .item-icon {
    width: 0.27rem;
    height: 0.27rem;
  }

  .content {
    float: left;
    margin-left: 0.13rem;
    flex: 1;
    text-align: left;
  }

  .title {
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
    height: 0.95rem;
    font-size: 0.26rem;
    line-height: 0.95rem;
    width: 3rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: right;

    span {
      font-size: 0.26rem;
    }
  }
}
</style>
