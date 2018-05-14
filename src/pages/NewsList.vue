<template>
  <div class="news-list">
    <div class="list-box" v-for="value in lines" @click="goNewsDetail">
      <div class="list-box-img">
        <img :src="value.imgUrl"/>
        <i class="has-news"></i>
      </div>
      <div class="list-box-content">
        <div class="title-box">
          <div class="title-box-text">{{value.title}}</div>
          <div class="title-box-date">

            <span class="month">{{value.month}}</span>
            <span class="time">{{value.time}}</span>
          </div>
        </div>
        <div class="list-box-news">
          {{value.news}}
        </div>
      </div>

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
          imgUrl: "../static/image/myNewsImg/message-notice@2x.png",
          title: "八事通通知",
          news: "尊敬的用户，非常抱歉的通知您，由于天气…",
          month: "04/20",
          time: "06:23"
        },
        1: {
          imgUrl: "../static/image/myNewsImg/message-activity@2x.png",
          title: "活动通知",
          news: "尊敬的用户，非常抱歉的通知您，由于天气…",
          month: "04/20",
          time: "06:23"
        },
        2: {
          imgUrl: "../static/image/myNewsImg/message-activity@2x.png",
          title: "八事通通知",
          news: "尊敬的用户，非常抱歉的通知您，由于天气…",
          month: "04/20",
          time: "06:23"
        },
        3: {
          imgUrl: "../static/image/myNewsImg/message-activity@2x.png",
          title: "八事通通知",
          news: "尊敬的用户，非常抱歉的通知您，由于天气…",
          month: "04/20",
          time: "06:23"
        },
        4: {
          imgUrl: "../static/image/myNewsImg/message-activity@2x.png",
          title: "八事通通知",
          news: "尊敬的用户，非常抱歉的通知您，由于天气…",
          month: "04/20",
          time: "06:23"
        },
        5: {
          imgUrl: "../static/image/myNewsImg/message-activity@2x.png",
          title: "八事通通知",
          news: "尊敬的用户，非常抱歉的通知您，由于天气…",
          month: "04/20",
          time: "06:23"
        },
        6: {
          imgUrl: "../static/image/myNewsImg/message-activity@2x.png",
          title: "八事通通知",
          news: "尊敬的用户，非常抱歉的通知您，由于天气…",
          month: "04/20",
          time: "06:23"
        },
        7: {
          imgUrl: "../static/image/myNewsImg/message-activity@2x.png",
          title: "八事通通知",
          news: "尊敬的用户，非常抱歉的通知您，由于天气…",
          month: "04/20",
          time: "06:23"
        }
      }
    };
  },
  methods: {
    goNewsDetail() {
      this.$router.push("/my/newsDetail");
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.news-list {
  height: 100%;
  overflow: auto;
  font-family: PingFangSC-Semibold;
  padding: 0 0.2rem;
}
.list-box {
  width: 100%;
  height: 2rem;
  position: relative;
  background: #fff;
  -webkit-border-radius: 0.04rem;
  -moz-border-radius: 0.04rem;
  border-radius: 0.04rem;
  margin-top: 0.2rem;
}
.list-box-img {
  position: relative;
  float: left;
  width: 0.92rem;
  height: 0.92rem;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  margin-top: 0.54rem;
  margin-left: 0.3rem;
}
.list-box-img img {
  width: 100%;
}
.list-box-img .has-news {
  top: 0px;
  right: -0.1rem;
}
.list-box-content {
  float: left;
}
.list-box-content {
  float: left;
  margin-top: 0.52rem;
}
.title-box {
  overflow: hidden;
}
.title-box-text {
  float: left;
  margin-left: 0.3rem;
  line-height: 0.45rem;
  color: #333;
  font-size: 0.32rem;
}
.title-box-date {
  float: right;
  font-size: 0.24rem;
}
.month {
  font-size: 0.24rem;
  color: #bebebe;
  line-height: 0.45rem;
}
.time {
  font-size: 0.24rem;
  color: #bebebe;
  line-height: 0.45rem;
}
.list-box-news {
  margin-top: 0.14rem;
  margin-left: 0.3rem;
  line-height: 0.37rem;
  color: #9b9b9b;
  font-size: 0.24rem;
}
</style>
