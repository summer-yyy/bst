<template>
  <div class="wrapper">
    <div class="detail">
      <div class="title">
        {{start.address}}
        <img class="icon" src="@/assets/image/query-arrow@2x.png" alt="">
        {{end.address}}
      </div>
      <div class="line">
        步行300米 ·
      </div>
      <div class="bottom">
        <p class="time">
        <img class="icon" src="@/assets/image/query-clock@2x.png" alt="">
          距离发车时间仅 <span class="min">15分钟</span></p>
        <div class="btn">去机场站点</div>
      </div>
      <div class="route" v-show="routeShow">
        <div class="icon-line">
          <div class="circle blue"></div>
          <div class="dashed"></div>
          <div class="circle"></div>
          <div class="solid"></div>
          <div class="circle"></div>
          <div class="dashed"></div>
          <img class="end-icon" src="@/assets/image/end-icon@2x.png">
        </div>
        <div class="start">
          <p class="pos">{{start.address}}</p>
          <p class="des">步行 300米   约6分钟</p>
        </div>
        <div class="bus">
          <p class="pos">{{busLine[0] && busLine[0].targetName}}</p>
          <div class="busLine">
            <div>
              <p class="pos">虹1线<span class="plateNum">京A888888</span></p>
              <p class="des">开往虹桥国际机场</p>
            </div>
            <span class="count">{{busLine.length}}站</span>
          </div>
          <p class="pos">{{busLine[busLine.length-1] &&busLine[busLine.length-1].targetName}}</p>
        </div>
        <div class="end">
          <p class="des">距离终点 3020米</p>
          <p class="pos">{{end.address}}</p>
        </div>
      </div>
      <div class="trigger" @click="routeShow = !routeShow">
        <div class="btn"></div>
      </div>
    </div>
    <img src="@/assets/image/traffic-color@2x.png" class="traffic" />
    <div class="map">
      <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" class="amap-demo" :mapStyle="'fresh'">
        <el-amap-polyline :path="polyline.path" :strokeColor="polyline.strokeColor" :strokeWeight="polyline.strokeWeight" :strokeOpacity="polyline.strokeOpacity" :zIndex="10"></el-amap-polyline>
        <el-amap-circle-marker v-for="(circle,index) in busLine" :center="[circle.longitude, circle.latitude]" :radius="(index === 0 || index === busLine.length -1) ? 14 : 10" :strokeColor="(index === 0 || index === busLine.length -1) ? '#FFFFFF' : '#FFB341'" :strokeWeight="(index === 0 || index === busLine.length -1) ? 3: 6" :strokeOpacity="'1'" :fillColor="(index === 0 || index === busLine.length -1) ? '#FFB341': '#fff'" :zIndex="11" :key="index"></el-amap-circle-marker>
        <el-amap-text v-for="text in busLine" :text="text.targetName" :offset="[15,0]" :position="[text.longitude, text.latitude]" :textAlign="'left'"></el-amap-text>
      </el-amap>
    </div>
  </div>
</template>
<style>
.amap-overlay-text-container {
  border: 0;
  font-size: 0.3rem;
  color: #333;
  background: inherit;
  font-weight: 900;
}
.amap-marker:first-of-type .amap-overlay-text-container,
.amap-marker:last-of-type .amap-overlay-text-container {
  font-size: 0.36rem;
  text-shadow: 2px 2px 2px #fff;
}
</style>
>
<script>
import { getData } from "@/assets/js/common.js";
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();
export default {
  name: "mapDetail",
  data() {
    return {
      search: "",
      routeShow: false,
      amapManager,
      circles: [],
      polyline: {},
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
              this.longitude = result.position.lng;
              this.latitude = result.position.lat;
              this.center = [this.longitude, this.latitude];
              this.$nextTick();
            }
          });
        }
      }
    };
  },
  methods: {
    setCirle(pos) {
      // pos.forEach((item, index) => {
      // let cirle = new AMap.CircleMarker({
      //   map: this.map,
      //   center: [item.longitude, item.latitude],
      //   radius: 14,
      //   strokeColor:
      //     index === 0 || index === pos.length ? "#FFFFFF" : "#FFB341",
      //   strokeWeight: index === 0 || index === pos.length ? 2 : 0,
      //   fillColor: "#FFB341",
      //   strokeOpacity: 1
      // });
      // cirle.setMap();
      // });
    },
    setLine(pos) {
      let arr = [];
      pos.forEach((item, index) => {
        arr.push([item.longitude, item.latitude]);
      });
      this.polyline = {
        path: arr,
        strokeColor: "#FFB341",
        strokeWeight: 3,
        strokeOpacity: 1
      };
      // let line = new AMap.CircleMarker({
      //   map: this.map,
      //   path: arr,
      //   strokeColor: "#FFB341",
      //   strokeWeight: 2,
      //   strokeOpacity: 1
      // });
      // line.setMap();
    }
  },
  computed: {
    busLine() {
      return JSON.parse(this.$route.query.busLineTarget);
    },
    start() {
      return JSON.parse(this.$route.query.start);
    },
    end() {
      return JSON.parse(this.$route.query.end);
    }
  },
  components: {},
  beforeCreate() {
    // this.busLine = JSON.parse(this.$route.query.busLineTarget);
    // this.start = JSON.parse(this.$route.query.start);
    // this.end = JSON.parse(this.$route.query.end);
  },
  created() {
    setTimeout(() => {
      let map = amapManager.getMap();
      // this.setCirle(this.busLine);
      this.setLine(this.busLine);
      // map.setFitView();
    }, 100);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.wrapper {
  background: #F2F2F2;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  .traffic {
    position: absolute;
    left: 0.1rem;
    bottom: 1rem;
    z-index: 13;
    width: 0.96rem;
  }

  .detail {
    top: 0.2rem;
    left: 0.2rem;
    right: 0.2rem;
    padding: 0.28rem;
    z-index: 13;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 0.04rem;
    position: absolute;

    .title {
      height: 0.42rem;
      line-height: 0.42rem;
      color: rgba(51, 51, 51, 1);
      font-size: 0.3rem;

      .icon {
        width: 0.34rem;
        margin: -0.1rem 0.2rem 0;
        vertical-align: middle;
      }
    }

    .line {
      margin-top: 0.17rem;
      height: 0.37rem;
      line-height: 0.37rem;
      color: rgba(102, 102, 102, 1);
      font-size: 0.26rem;
    }

    .bottom {
      margin-top: 0.36rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .time {
        .icon {
          width: 0.22rem;
          vertical-align: middle;
          margin-top: -0.07rem;
        }

        height: 0.37rem;
        line-height: 0.37rem;
        color: rgba(102, 102, 102, 1);
        font-size: 0.26rem;
        font-weight: 900;

        .min {
          color: #FFB341;
          margin-left: 0.05rem;
        }
      }

      .btn {
        font-weight: 900;
        width: 1.5rem;
        height: 0.44rem;
        border-radius: 0.04rem;
        border: 0.02rem solid rgba(112, 193, 255, 1);
        line-height: 0.44rem;
        color: rgba(112, 193, 255, 1);
        font-size: 0.24rem;
        text-align: center;
      }
    }

    .route {
      border-top: 0.5px solid rgba(213, 213, 213, 1);
      margin-top: 0.4rem;
      padding-left: 0.48rem;
      position: relative;

      .icon-line {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        top: 0.3rem;
        left: -0.1rem;

        .circle {
          border-radius: 50%;
          width: 0.2rem;
          height: 0.2rem;
          background-color: rgba(255, 183, 64, 1);
        }

        .blue {
          background-color: rgba(112, 193, 255, 1);
        }

        .orange {
          background-color: rgba(255, 183, 64, 1);
        }

        .dashed {
          height: 1.25rem;
          border-left: 0.02rem dashed rgba(155, 155, 155, 1);
        }

        .solid {
          width: 0.02rem;
          height: 2.6rem;
          background-color: rgba(252, 186, 77, 1);
        }

        .end-icon {
          width: 0.37rem;
        }
      }

      .pos {
        height: 0.42rem;
        line-height: 0.42rem;
        color: rgba(51, 51, 51, 1);
        font-size: 0.3rem;
        margin: 0.1rem 0;
        font-weight: 900;
      }

      .des {
        height: 0.37rem;
        line-height: 0.37rem;
        color: rgba(102, 102, 102, 1);
        font-size: 0.26rem;
        margin: 0.1rem 0;
      }

      .start {
        border-bottom: 0.5px solid rgba(231, 231, 231, 1);
        padding-top: 0.1rem;
        height: 1.31rem;
      }

      .bus {
        border-bottom: 0.5px solid rgba(231, 231, 231, 1);
        padding: 0.14rem 0;

        .busLine {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 2.18rem;

          .plateNum {
            margin-left: 0.15rem;
            padding: 0.09rem 0.1rem;
            font-size: 0.26rem;
            font-weight: 100;
            border-radius: 0.04rem;
            border: 0.5px solid rgba(198, 198, 198, 1);
          }

          .count {
            height: 0.37rem;
            line-height: 0.37rem;
            color: rgba(51, 51, 51, 1);
            font-size: 0.26rem;
            font-weight: 900;
          }
        }
      }

      .end {
        padding-top: 0.3rem;
      }
    }

    .trigger {
      left: 50%;
      bottom: -0.24rem;
      margin-left: -0.45rem;
      width: 0.9rem;
      height: 0.24rem;
      border-radius: 0 0 0.05rem 0.05rem;
      background-color: rgba(255, 255, 255, 0.95);
      position: absolute;

      .btn {
        width: 0.67rem;
        height: 0.08rem;
        border-radius: 0.05rem;
        background-color: rgba(251, 118, 41, 1);
        margin: 0.08rem auto;
      }
    }
  }

  .map {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    .amap-demo {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
