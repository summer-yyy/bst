<template>
  <div class="route">
    <div class="line">
      <div class="line-title">
        <i class="line-number"><span>{{line.index+1}}</span></i>
        <span class="line-name">{{line.lineName}}</span>
      </div>
      <div class="line-content">
        <span class="startPoint">{{line.startStation}}</span>
        <i class="line-content-icon"></i>
        <span class="startPoint endPoint">{{line.endStation}}</span>
      </div>
    </div>
    <div class="prompt" v-show="showPrompt">
      <img src="../../static/image/routedetail/line-remind@2x.png"/>
      请注意选择您的乘车方向
    </div>
    <div class="point-box">
      <div class="route-detail-box" v-for="(value, index) in linesPoint" :key="value.id" @click="showPointDetail(index)">
        <div class="route-point">
          <i class="isPosition"></i>
          <i class="ishang" v-show ="index != (linesPoint.length - 1)"></i>
          <div class="route-point-text">{{value.targetName}}</div>
          <div class="datadetail" v-show="value.showCarNumber">
            <span>沪34559 </span> <span> 还有1站</span>, <span>约10分钟</span>
          </div>
          <i class="go-icon"
             v-show="!value.showCarNumber"
            ></i>
          <i class="go-icon-arrow"
             v-show="value.showCarNumber"
          ></i>
        </div>
        <div class="clear"></div>
      </div>
    </div>

  </div>

</template>

<script>
import { getData } from "@/assets/js/common.js";

export default {
  name: "RouteDetail",
  data() {
    return {
      line: {},
      showPrompt: false,
      showCarNumber:false,
      linesPoint: {
        0: {
          pointName: "虹桥T2航站楼",
          showPrompt: false
        },
        1: {
          pointName: "天山西路威宁路",
          showPrompt: false
        },
        2: {
          pointName: "中山公园",
          showPrompt: false
        }
      }
    };
  },
  methods: {
    showPointDetail(index) {
      for(var i=0;i<this.linesPoint.length;i++){
        if(i==index){

        }else{
          this.linesPoint[i].showCarNumber = false;
        }

      }
      if (!this.linesPoint[index].showCarNumber) {
        this.linesPoint[index].showCarNumber = true;

      } else {
        this.linesPoint[index].showCarNumber = false;

      }

    },
    getLines(lineId) {
      getData({
        url: "/api/v1/busline/queryBusLineTarget/" + lineId,
        data: { lineId },
        success: res => {

          for(var i=0;i<res.obj.length;i++){
              res.obj[i].showCarNumber = false;
          }
          this.linesPoint = res.obj;
          console.log( this.linesPoint);
        }
      });

    }
  },
  mounted() {
    this.line = this.$route.query;
    this.getLines(this.$route.query.id);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.route {
  overflow: auto;
  font-family: PingFangSC-Semibold;
  padding: 0.2rem;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background-color: #f2f2f2;
}
.line {
  width: 100%;
  margin: 0 auto;
  height: 2.25rem;
  position: relative;
  background: #fff;
  border-radius: 0.04rem;
}
.point-box {
  margin-top: 0.3rem;
  padding-bottom: 0.6rem;
  background: #fff;
  overflow: hidden;
}
.line-title {
  overflow: hidden;
  margin-left: 0.3rem;
  padding-top: 0.4rem;
  margin-right: 0.32rem;
  border-bottom: 0.5px solid #979797;
}
.line-number {
  display: block;
  float: left;
  width: 0.24rem;
  height: 0.24rem;
  background: #ffb740;
  color: #fff;
  border-radius: 0.04rem;
  font-size: 0.16rem;
  line-height: 0.24rem;
  position: relative;
  margin-top: 0.15rem;
}
.line-number span {
  position: absolute;
  left: 0.02rem;
  display: inline-block;
  font-family: PingFangSC-Semibold;
}
.line-name {
  color: #333333;
  line-height: 0.48rem;
  font-size: 0.34rem;
  text-align: left;
  display: block;
  margin-bottom: 0.21rem;
  float: left;
  margin-left: 0.18rem;
  font-weight: 600;
}
.line-content {
  overflow: hidden;
  padding-left: 0.3rem;
  color: #2f3338;
  font-weight: 600;
}
.startPoint {
  color: #333333;
  line-height: 0.42rem;
  font-size: 0.3rem;
  text-align: left;
  display: block;
  float: left;
  margin-top: 0.2rem;
  font-family: PingFangSC-Regular;
}
.line-content-icon {
  display: block;
  float: left;
  width: 0.34rem;
  height: 0.5rem;
  background: url("../../static/image/routeImg/line-arrow-2@2x.png") no-repeat
    center;
  background-size: 100%;
  margin: 0 0.22rem;
  margin-top: 0.16rem;
}
.go-icon {
  display: block;
  position: absolute;
  width: 0.14rem;
  height: 0.14rem;
  background: url("../../static/image/routedetail/line-bottom-arrow@2x.png")
    no-repeat center;
  background-size: 100%;
  right: 0.5rem;
  top: 0.6rem;
}
.go-icon-arrow {
  display: block;
  position: absolute;
  width: 0.14rem;
  height: 0.14rem;
  background: url("../../static/image/routedetail/line-top-arrow@2x.png")
    no-repeat center;
  background-size: 100%;
  right: 0.5rem;
  top: 0.6rem;
}
.route-point {
  position: relative;
  padding-left: 0.82rem;
}
.route-detail-box {
  background: #fff;
  -webkit-border-radius: 0.04rem;
  -moz-border-radius: 0.04rem;
  border-radius: 0.04rem;

}
.route-point-text {
  float: left;
  color: #333333;
  font-size: 0.28rem;
  line-height: 0.4rem;
  margin-top: 0.54rem;
  padding-bottom: 0.16rem;
  font-weight: 600;
}
.prompt {
  width: 100%;
  color: #fff;
  font-size: 0.24rem;
  line-height: 0.7rem;
  font-family: PingFang-SC-Medium;
  background: rgba(0, 0, 0, 0.3);
  . height:0.7rem;
}
.prompt img {
  display: inline-block;
  width: 0.26rem;
  margin-left: 0.32rem;
  margin-top: 0.1rem;
}
.datadetail {
  position: absolute;
  color: #fb7629;
  font-size: 0.24rem;
  top: 1rem;
  font-weight: 600;
}
.clear {
  clear: both;
}
.isPosition{
  display: block;
  position: absolute;
  width: 0.2rem;
  height: 0.2rem;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  background-color: #9B9B9B;
  top: 0.64rem;
  left: 0.34rem;
}
  .ishang{
    display: block;
    position: absolute;
    width: 0.04rem;
    height: 0.9rem;
    background: #9b9b9b;
    top: 0.84rem;
    left: 0.42rem;
  }
</style>
