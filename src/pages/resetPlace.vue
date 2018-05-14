<template>
  <div class="wrapper">
    <div class="searchWrapper">
      <div class="search">
        <bst-input v-model="addressName" :placeHolder="placeHolder" style="" :iconShow="true"></bst-input>
      </div>
      <div class="btnGrounp">
        <div class="btn location">
          <img class="icon" src="@/assets/image/location-normal@2x.png"/>
          当前位置
        </div>
        <div class="btn" @click="mapShow=true">
          <img class="icon" src="@/assets/image/map-normal@2x.png"/>
          地图选点
        </div>
      </div>
    </div>
    <div class="historyWrapper" v-show="historyList.length>0">
      <History :list="historyList" @clear="historyList = []"></History>
    </div>
    <div class="map" v-show="mapShow">
      <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :zoom="zoom" :plugin="plugin" :events="events" class="amap-demo">
        <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker>
      </el-amap>

      <div class="toolbar">
        {{addressName}}
        <button @click="updateUserAddress()">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "@/assets/js/common.js";
import BstInput from "@/components/bst-input/bst-input";
import History from "@/components/history/history";
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();
const exampleComponents = {
  props: ["text"],
  template: `<div>text from  parent: {{text}}</div>`
};
export default {
  name: "resetPlace",
  data() {
    return {
      longitude: "",
      latitude: "",
      addressName: "",
      mapShow: false,
      amapManager,
      componentMarker: {
        position: [121.5273285, 31.21315058],
        contentRender: (h, instance) =>
          h(
            exampleComponents,
            {
              style: { backgroundColor: "#fff" },
              props: { text: "father is here" }
            },
            ["xxxxxxx"]
          )
      },
      zoom: 12,
      center: [121.59996, 31.197646],
      events: {
        init: o => {
          console.log(o.getCenter());
          console.log(this.$refs.map.$$getInstance());
        },
        moveend: () => {},
        zoomchange: () => {},
        click: e => {
          console.log(e);
          let { lng, lat } = e.lnglat;
          this.longitude = lng;
          this.latitude = lat;
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
      plugin: [
        "ToolBar",
        {
          pName: "MapType",
          defaultType: 0,
          events: {
            init(o) {
              console.log(o);
            }
          }
        }
      ],
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
      historyList: [
        {
          title: "人民广场",
          text: "南京西路2000号"
        }
      ]
    };
  },
  methods: {
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
    updateUserAddress() {
      getData({
        url: "/api/v1/appuser/updateUserAddress",
        data: {
          id: this.$route.query.id,
          longitude: this.longitude,
          latitude: this.latitude,
          addressName: this.addressName
        },
        success: res => {
          this.$router.go(-1);
        }
      });
    }
  },
  components: {
    BstInput,
    History
  },
  created() {
    console.log(this.$route.query);
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
      border-bottom: 1px solid #E7E7E7;
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
          border-right: 1px #E7E7E7 solid;
        }
      }
    }
  }

  .historyWrapper {
    margin-top: 0.3rem;
  }
}
</style>
