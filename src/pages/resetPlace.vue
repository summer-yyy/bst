<template>
  <div class="wrapper">
    <div class="searchWrapper">
      <div class="search">
        <bst-input v-model="search" :placeHolder="placeHolder" style="" :iconShow="true" @input="autocomplete(search)"></bst-input>
      </div>
      <div class="btnGrounp">
        <div class="btn location"  @click="getLocation()">
          <img class="icon" src="@/assets/image/location-normal@2x.png"/>
          当前位置
        </div>
        <div class="btn" @click="mapShow=true">
          <img class="icon" src="@/assets/image/map-normal@2x.png"/>
          地图选点
        </div>
      </div>
    </div>
    <div class="result">
      <div class="item" v-for="(item, index) in result" :key="index" @click="setInput(item)">
        <img class="item-icon" src="@/assets/image/site@2x.png" />
        <div class="content">
          <p class="title">{{item.name}}</p>
          <p class="text">{{typeof item.address === 'string' ? item.address : item.district}}</p>
        </div>
      </div>
    </div>
    <div class="historyWrapper" v-show="historyList.length>0">
      <History :list="historyList" @clear="clear" @itemClick="historyClick"></History>
    </div>
    <div class="map" v-show="mapShow">
      <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" class="amap-demo">
        <el-amap-marker vid="marker" :position="marker.position" :content="marker.content" :offset="marker.offset"></el-amap-marker>
      </el-amap>

      <div class="toolbar">
        <div>{{addressName}}</div>
        <button @click="updateUserAddress()">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getData, setStorage, getStorage } from "@/assets/js/common.js";
import BstInput from "@/components/bst-input/bst-input";
import History from "@/components/history/history";
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();
export default {
  name: "resetPlace",
  data() {
    return {
      longitude: "",
      latitude: "",
      addressName: "",
      search: "",
      mapShow: false,
      result: [],
      amapManager,
      marker: {
        offset: [-13, -33],
        position: [121.59996, 31.197646],
        content:
          '<img style="width:.55rem" src="' +
          require("@/assets/image/location-icon@2x.png") +
          '"/>'
      },
      zoom: 12,
      center: [121.59996, 31.197646],
      events: {
        init: o => {
          let geolocation = new AMap.Geolocation({ enableHighAccuracy: true });
          geolocation.getCurrentPosition((status, result) => {
            if (result && result.position) {
              console.log(result);

              this.addressName = result.formattedAddress;
              this.longitude = result.position.lng;
              this.latitude = result.position.lat;
              this.center = [this.longitude, this.latitude];
              this.marker.position = [this.longitude, this.latitude];
              this.loaded = true;
              this.$nextTick();
            }
          });
        },
        moveend: () => {},
        zoomchange: () => {},
        click: e => {
          console.log(e);
          let { lng, lat } = e.lnglat;
          this.longitude = lng;
          this.latitude = lat;
          this.marker.position = [lng, lat];
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress([lng, lat], (status, result) => {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                console.log(result);
                this.addressName = result.regeocode.formattedAddress;
                this.$nextTick();
              }
            }
          });
          // this.add();
        }
      },
      showModal: false,
      place: "",
      placeHolder: "请输入目的地",
      btnList: [
        {
          color: "#2F3338",
          text: "重新设置地址"
        },
        {
          color: "#FB7629",
          text: "删除地址"
        },
        {
          color: "#9B9B9B",
          text: "取消",
          cb: () => {
            this.showModal = false;
          }
        }
      ],
      historyList: []
    };
  },
  methods: {
    clear() {
      this.historyList = [];
      localStorage.removeItem("addressList");
    },
    add() {
      let o = amapManager.getMap();
      let marker = new AMap.Marker({
        position: [121.59996, 31.177646]
      });
      marker.setMap(o);
    },
    btnClick(index) {
      if (
        this.btnList[index].cb &&
        typeof this.btnList[index].cb === "function"
      ) {
        this.btnList[index].cb();
      }
    },
    // 搜素自动补全
    autocomplete(val, target) {
      let autocomplete = new AMap.Autocomplete();
      autocomplete.search(val, (status, result) => {
        if (result && result.tips) {
          console.log(result);
          this.result = result.tips
            .filter(item => {
              return item.location.lat && item.location.lng;
            })
            .slice(0, 5);
        } else {
          this.result = [];
        }
      });
    },
    setInput(pos) {
      this.search = pos.name;
      this.longitude = pos.position.lng;
      this.latitude = pos.position.lat;
      this.result = [];
    },
    updateUserAddress() {
      getData({
        url: "/api/v1/appuser/updateUserAddress",
        data: {
          id: this.$route.query.id,
          longitude: this.longitude,
          latitude: this.latitude,
          addressName: this.addressName || this.search
        },
        success: res => {
          let position = {
            longitude: this.longitude,
            latitude: this.latitude,
            addressName: this.addressName || this.search
          };
          // 记录去重
          let history = getStorage("addressList");
          history.forEach((element, index) => {
            if (element.addressName === position.addressName) {
              history.splice(index, 1);
            }
          });
          history.unshift(position);
          setStorage("addressList", history.slice(0, 5));
          this.$router.go(-1);
        }
      });
    },
    // 定位
    getLocation() {
      let geolocation = new AMap.Geolocation({ enableHighAccuracy: true });
      geolocation.getCurrentPosition((status, result) => {
        if (result && result.position) {
          this.longitude = result.position.lng;
          this.latitude = result.position.lat;
          this.addressName = result.formattedAddress;
          this.updateUserAddress();
        }
      });
    },
    historyClick(item) {
      this.longitude = item.longitude;
      this.latitude = item.latitude;
      this.addressName = item.addressName;
      this.updateUserAddress();
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
          this.usualAddresses = res.obj;
        }
      });
    }
  },
  components: {
    BstInput,
    History
  },
  created() {
    this.historyList = getStorage("addressList");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.wrapper {
  background: #F2F2F2;
  padding: 0.2rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

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

  .map {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 10;

    .amap-demo {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding-bottom: 1.2rem;
    }

    .toolbar {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 12;
      height: 1.2rem;
      background: #fff;
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 0.3rem;
      color: #2F3338;
      justify-content: space-between;
      padding: 0 0.4rem;
      box-sizing: border-box;

      div {
        width: 5rem;
      }

      button {
        width: 1.3rem;
        height: 0.6rem;
        border-radius: 0.08rem;
        border: 0.02rem solid rgba(255, 126, 52, 1);
        background: #fff;
        color: #FF7E34;
      }
    }
  }

  .icon {
    height: 0.28rem;
    width: 0.28rem;
    vertical-align: middle;
    margin-right: 0.18rem;
  }

  .searchWrapper {
    background: #ffffff;

    .search {
      height: 1rem;
      margin: 0 0.2rem;
      overflow: hidden;
      border-bottom: 0.5px solid #E7E7E7;
    }

    .btnGrounp {
      display: flex;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.28rem;
      align-items: center;

      .btn {
        flex: 1;
        text-align: center;

        &.location {
          color: #70C1FF;
          border-right: 0.5px #E7E7E7 solid;
        }
      }
    }
  }

  .historyWrapper {
    margin-top: 0.3rem;
  }
}
</style>
