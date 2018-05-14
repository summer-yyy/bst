<template>
  <div class="route">
    <div class="line" v-for="value in lines">
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
    goNewsList() {
      this.$router.push("/my/newsList");
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.route {
  width: 100%;
  height: 100%;
  overflow: auto;
  font-family: PingFangSC-Semibold;
  padding: 1rem;
}
.line {
  width: 100%;
  height: 7rem;
  position: relative;
  background: #fff;
  -webkit-border-radius: 0.2rem;
  -moz-border-radius: 0.2rem;
  border-radius: 0.2rem;
  margin-top: 1rem;
}
.line-title {
  overflow: hidden;
  padding-top: 1.3rem;
  margin-left: 1.5rem;
}
.line-number {
  display: block;
  float: left;
  width: 1.2rem;
  height: 1.2rem;
  background: #ffb740;
  color: #fff;
  -webkit-border-radius: 0.2rem;
  -moz-border-radius: 0.2rem;
  border-radius: 0.2rem;
  font-size: 0.8rem;
  line-height: 1.2rem;
  position: relative;
}
.line-number span {
  position: absolute;
  left: 0.2rem;
}
.line-name {
  color: #333333;
  line-height: 1.3rem;
  font-size: 1.4rem;
  text-align: left;
  display: block;
  float: left;
  margin-left: 0.9rem;
  font-weight: 600;
}
.line-content {
  overflow: hidden;
  margin-left: 1.5rem;
}
.startPoint {
  color: #333333;
  line-height: 1.3rem;
  font-size: 1.4rem;
  text-align: left;
  display: block;
  float: left;
  margin-top: 1rem;
  font-family: PingFangSC-Regular;
}
.line-content-icon {
  display: block;
  float: left;
  width: 1.7rem;
  height: 1.7rem;
  background: url("../../static/image/routeImg/line-arrow-2@2x.png") no-repeat
    center;
  background-size: 100%;
  margin: 0 1.1rem;
  margin-top: 0.8rem;
}
.go-icon {
  display: block;
  position: absolute;
  width: 0.67rem;
  height: 0.67rem;
  background: url("../../static/image/routeImg/add-more-normal@2x.png")
    no-repeat center;
  background-size: 100%;
  right: 2.51rem;
  top: 3rem;
}
</style>
