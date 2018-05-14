<template>
  <div id="app">
    <!-- <keep-alive> -->
     <router-view/>
    <!-- </keep-alive> -->
    <div class="tabWrapper">
      <div class="bottomBtn" @click="goIndex">
        <img class="icon" :src="'../static/image/indexImg/bottom/home-icon-'+($route.name == 'Index' ? 'active':'normal')+'@2x.png'" />
        <div class="bottom-btntext">首页</div>
      </div>
      <div class="bottomBtn"  @click="goRoute">
        <img  class="icon" :src="'../static/image/indexImg/bottom/line-'+($route.name == 'Route' ? 'active':'normal')+'@2x.png'" />
        <div class="bottom-btntext">路线</div>
      </div>
      <div class="bottomBtn" @click="goMy">
        <img class="icon"  :src="'../static/image/indexImg/bottom/my-'+($route.name == 'My' ? 'active':'normal')+'@2x.png'" />
        <div class="bottom-btntext">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      homeIcon: true,
      lineNormal: false,
      myNormal: false
    };
  },
  methods: {
    goIndex() {
      this.$router.push("/");
    },
    goRoute() {
      this.$router.push("/route");
    },
    goMy() {
      this.$router.push("/my");
    }
  },
  created() {
    console.log(this.$route);
  }
};
</script>

<style lang="stylus">
html, body {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgba(242, 242, 242, 1);
  color: #2c3e50;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 1rem;
}

.tabWrapper {
  width: 100%;
  height: 1rem;
  position: fixed;
  z-index: 1;
  left: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  flex-direction: row;

  .icon {
    width: 0.37rem;
    height: 0.37rem;
  }
}

.bottomBtn {
  text-align: center;
  flex: 1;
  font-size: 0.22rem;
  color: #2f3338;
}
</style>
