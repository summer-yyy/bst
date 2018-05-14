<template>
  <div class="news-detail-list">
    <div class="detail-list-box" v-for="value in lines" >
      <div class="detail-list-date">
        <span class="detail-month">{{value.month}}</span>
        <span class="detail-time">{{value.time}}</span>
      </div>
      <div class="list-detail-box-content">
        <div class="detail-title-box">
          <div class="detail-title-box-text">{{value.title}}</div>
        </div>
        <div class="list-detail-box-news">
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
          title: "八事通通知",
          news:
            "尊敬的用户，为了保障您的合法权益，为彻底贯彻实施相\n" +
            "关法规，现正式地向您公示以下内容：\n" +
            "1.您注册八事通免费机场大巴即同意注册用户协议；\n" +
            "2.如遇特殊情况，我司员工有权要求您出示身份信息；\n" +
            "3.大巴免费乘坐，请您实时关注路况，如耽误您的登机时\n" +
            "间，我司盖不负责。",
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
.news-detail-list {
  height: 100%;
  overflow: auto;
  font-family: PingFangSC-Semibold;
  padding: 0 0.2rem 0.2rem;
  box-sizing: border-box;
}
.detail-list-box {
  width: 100%;
  overflow: hidden;
}
.detail-list-date {
  text-align: center;
  padding: 0.32rem 0;
  font-size: 0.24rem;
}
.detail-month {
  font-size: 0.24rem;
  color: #bebebe;
  line-height: 0.45rem;
}
.detail-time {
  font-size: 0.24rem;
  color: #bebebe;
  line-height: 0.45rem;
}
.list-detail-box-content {
  box-sizing: content-box;
  position: relative;
  background: #fff;
  -webkit-border-radius: 0.04rem;
  -moz-border-radius: 0.04rem;
  border-radius: 0.04rem;
  text-align: left;
  padding: 0.3rem;
}

.detail-title-box {
  overflow: hidden;
}
.detail-title-box-text {
  width: 100%;
  float: left;
  line-height: 0.45rem;
  color: #333;
  font-size: 0.32rem;
}

.list-detail-box-news {
  width: 100%;
  margin-top: 0.14rem;
  line-height: 0.44rem;
  color: #9b9b9b;
  font-size: 0.26rem;
}
</style>
