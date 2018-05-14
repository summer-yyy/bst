<template>
  <div class="route">
    <div class="line" v-for="value in lines" @click="goRouteDetail">
      <div class="line-title">
        <i class="line-number"><span>{{value.number}}</span></i>
        <span class="line-name">虹1线</span>
      </div>
      <div class="line-content">
        <span class="startPoint">{{value.start}}</span>
        <i class="line-content-icon"></i>
        <span class="startPoint endPoint">{{value.end}}</span>
      </div>
      <i class="go-icon">
      </i>
    </div>
  </div>

</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      lines: {
        0: {
          number: 0,
          name: "虹1线",
          start: "虹桥机场航站楼",
          end: "人民广场"
        },
        1: {
          number: 1,
          name: "虹2线",
          start: "虹桥T2航站楼",
          end: "五角楼"
        },
        2: {
          number: 1,
          name: "虹2线",
          start: "虹桥T2航站楼",
          end: "五角楼"
        },
        3: {
          number: 1,
          name: "虹2线",
          start: "虹桥T2航站楼",
          end: "五角楼"
        },
        4: {
          number: 1,
          name: "虹2线",
          start: "虹桥T2航站楼",
          end: "五角楼"
        },
        5: {
          number: 1,
          name: "虹2线",
          start: "虹桥T2航站楼",
          end: "五角楼"
        },
        6: {
          number: 1,
          name: "虹2线",
          start: "虹桥T2航站楼",
          end: "五角楼"
        },
        7: {
          number: 1,
          name: "虹2线",
          start: "虹桥T2航站楼",
          end: "五角楼"
        }
      }
    };
  },
  methods: {
    goRouteDetail() {
      this.$router.push("/route/routeDetail");
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.route {
  height: 100%;
  overflow: auto;
  font-family: PingFangSC-Semibold;
  padding: 0.2rem;
  box-sizing: border-box;
}
.line {
  width: 100%;
  height: 1.4rem;
  position: relative;
  background: #fff;
  border-radius: 0.04rem;
  margin-bottom: 0.2rem;
}
.line-title {
  overflow: hidden;
  padding-top: 0.26rem;
  margin-left: 0.3rem;
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
}
.line-number span {
  position: absolute;
  left: 0.04rem;
}
.line-name {
  color: #333333;
  line-height: 0.26rem;
  font-size: 0.28rem;
  text-align: left;
  display: block;
  float: left;
  margin-left: 0.18rem;
  font-weight: 600;
}
.line-content {
  overflow: hidden;
  margin-left: 0.3rem;
}
.startPoint {
  color: #333333;
  line-height: 0.26rem;
  font-size: 0.28rem;
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
  height: 0.34rem;
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
  background: url("../../static/image/routeImg/add-more-normal@2x.png")
    no-repeat center;
  background-size: 100%;
  right: 0.5rem;
  top: 0.6rem;
}
</style>
