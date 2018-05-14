<template>
  <div class="index">
    <div class="headerImg">
      <img src="../../static/image/indexImg/bus-photo@2x.png" />
    </div>
    <div class="now-position">
      <div class="now-position-left">
        <div class="start-position">
          <i class="circle blue-circle"></i>
          <input type="text"  placeholder="当前位置" v-model="startPosition"/>

        </div>
        <div class="end-position">
          <i class="circle yellow-circle"></i>
          <input type="text" placeholder="请输入目的地或路线名称" v-model="endPosition"/>

        </div>
      </div>
      <div class="now-position-right">
        <div class="sreach-btn">
          <img src="../assets/image/indexImg/search-but-normal@2x.png"/>
        </div>
      </div>
    </div>

    <div class="card-show usual-address">
      <itemWrapper :title="title1" :icon="icon1" @iconClick="$router.push('/address')">
        <div class="itemWrapper">
      <div class="item">
        <img class="item-icon" src="@/assets/image/add-home-icon@2x.png" />
        <div class="content">
          <p class="title">家</p>
        </div>
        <div class="control">
          <router-link to="/resetplace" tag="span">设置家的位置</router-link>
        </div>
      </div>
      <div class="item">
        <img class="item-icon" src="@/assets/image/add-company-icon@2x.png" />
        <div class="content">
          <p class="title">公司</p>
        </div>
        <div class="control">
          <router-link to="/resetplace" tag="span">设置公司的位置</router-link>
        </div>
      </div>
    </div>
      </itemWrapper>
    </div>
   <div class="card-show history-search">
      <div class="card-title history-search-title">
        <span>历史搜索</span>
        <i class="title-go"></i>
      </div>
      <div class="card-content usual-address-content">
        <ul class="card-content-ul history-search-ul" v-for="value in historySearch">
          <li >
            <i class="card-content-icon history-search-icon"><img src='../../static/image/indexImg/clock-icon@2x.png' /></i>
            <span class="card-content-name history-search-name">{{value.start}}</span>
            <i class="history-arrow"><img src='../../static/image/indexImg/arrow-icon@2x.png' /></i>
            <span class="card-content-name history-search-name">{{value.end}}</span>
          </li>
        </ul>
      </div>
    </div>


  </div>
</template>

<script>
import itemWrapper from "@/components/item-wrapper/item-wrapper";
import History from "@/components/history/history";
export default {
  name: "Index",
  data() {
    return {
      title1: "常用地点",
      icon1: require("@/assets/image/add-more-normal@2x.png"),
      msgStr: "../assets/image/indexImg",
      restaurants: [], //当前位置
      state3: "", //当前位置
      endPosition: "", //目的地位置input
      startPosition: "当前位置", //始发位置input
      usualAddresses: {
        home: {
          iconUrl: "../static/image/indexImg/add-home-icon@2x.png",
          addressName: "家",
          address: "设置家的位置"
        },
        company: {
          iconUrl: "../static/image/indexImg/add-company-icon@2x.png",
          addressName: "公司",
          address: "设置公司的位置"
        }
      },
      historySearch: {
        0: {
          start: "虹桥机场航站楼",
          end: "人民广场"
        },
        1: {
          start: "虹桥机场航站楼",
          end: "人民广场"
        }
      }
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号"
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          value: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
        },
        {
          value: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层"
        },
        { value: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { value: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          value: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺"
        },
        {
          value: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819"
        },
        {
          value: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
        },
        { value: "枪会山", address: "上海市普陀区棕榈路" },
        { value: "纵食", address: "元丰天山花园(东门) 双流路267号" },
        { value: "钱记", address: "上海市长宁区天山西路" },
        { value: "壹杯加", address: "上海市长宁区通协路" },
        {
          value: "唦哇嘀咖",
          address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"
        },
        { value: "爱茜茜里(西郊百联)", address: "长宁区仙霞西路88号1305室" },
        {
          value: "爱茜茜里(近铁广场)",
          address:
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
        },
        {
          value: "鲜果榨汁（金沙江路和美广店）",
          address: "普陀区金沙江路2239号金沙和美广场B1-10-6"
        },
        {
          value: "开心丽果（缤谷店）",
          address: "上海市长宁区威宁路天山路341号"
        },
        { value: "超级鸡车（丰庄路店）", address: "上海市嘉定区丰庄路240号" },
        { value: "妙生活果园（北新泾店）", address: "长宁区新渔路144号" },
        { value: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
        {
          value: "凡仔汉堡（老真北路店）",
          address: "上海市普陀区老真北路160号"
        },
        { value: "港式小铺", address: "上海市长宁区金钟路968号15楼15-105室" },
        { value: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
        { value: "北京饺子馆", address: "长宁区北新泾街道天山西路490-1号" },
        {
          value: "饭典*新简餐（凌空SOHO店）",
          address: "上海市长宁区金钟路968号9号楼地下一层9-83室"
        },
        {
          value: "焦耳·川式快餐（金钟路店）",
          address: "上海市金钟路633号地下一层甲部"
        },
        { value: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
        { value: "浏阳蒸菜", address: "天山西路430号" },
        { value: "四海游龙（天山西路店）", address: "上海市长宁区天山西路" },
        {
          value: "樱花食堂（凌空店）",
          address: "上海市长宁区金钟路968号15楼15-105室"
        },
        { value: "壹分米客家传统调制米粉(天山店)", address: "天山西路428号" },
        {
          value: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号"
        },
        {
          value: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位"
        },
        { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼"
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
        }
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    }
  },
  components: {
    itemWrapper,
    History
  },
  mounted() {}
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

.headerImg {
  width: 100%;
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
    border: none;
    margin-left: 0.18rem;
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
  border-bottom: 1px solid rgba(231, 231, 231, 1);
  display: flex;
  align-items: center;
}

.end-position {
  height: 1rem;
  display: flex;
  align-items: center;
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
  margin-top: 0.2rem;
  border-radius: 0.04rem;
}

.card-title {
  width: 100%;
  font-size: 1.1rem;
  color: #9B9B9B;
  text-align: left;
  position: relative;
  height: 4.3rem;
  border-bottom: 1px solid #E7E7E7;
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
  height: 4.3rem;
  text-align: left;
  overflow: hidden;
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
  line-height: 4.3rem;
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

.history-search-title .title-go {
  background: url('../assets/image/indexImg/delete-normal@2x.png') no-repeat center;
  background-size: 100%;
  width: 0.8rem;
  height: 0.9rem;
}

.history-search-title:hover .title-go {
  background: url('../assets/image/indexImg/delete-hover@2x.png') no-repeat center;
  background-size: 100%;
}

.history-search-icon {
  display: block;
  float: left;
  width: 1rem;
  height: 1rem;
  line-height: 4.4rem;
  margin-left: 1.5rem;
}

.history-search-icon img {
  width: 100%;
}

.history-search-name {
  font-size: 1.3rem;
  float: left;
  color: #5D5D5D;
  margin-left: 1.1rem;
}

.history-arrow {
  display: block;
  float: left;
  width: 1.75rem;
  line-height: 4.4rem;
  margin-left: 1.1rem;
}

.history-arrow img {
  width: 100%;
}

.itemWrapper {
  padding: 0 0.44rem;
  background: #ffffff;
}

.item {
  display: flex;
  align-items: center;
  overflow: hidden;
  border-bottom: 1px solid rgba(237, 237, 237, 1);
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

  .control {
    color: rgba(155, 155, 155, 1);
    height: 0.95rem;
    font-size: 0.26rem;
    line-height: 0.95rem;

    span {
      font-size: 0.26rem;
    }
  }
}
</style>
