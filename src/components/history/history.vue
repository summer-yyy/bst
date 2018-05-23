<template>
  <div class="history">
    <itemWrapper :title="title" :icon="icon" @iconClick="showModal = true" :headerStyle="headerStyle">
      <slot>
        <div class="list">
          <div class="item" v-for="(item, index) in list" :key="index" @click="itemClick(item)">
            <img class="icon" src="./clock-icon@2x.png">
            <div class="content">
              <p class="title">{{item.addressName}}</p>
              <p class="text">{{item.text}}</p>
            </div>
          </div>
        </div>
      </slot>
    </itemWrapper>
    <Modal v-show="showModal" :btnList="btnList" @click="btnClick"></Modal>
  </div>
</template>

<script>
import iconDel from "./delete-normal@2x.png";
import itemWrapper from "@/components/item-wrapper/item-wrapper";
import Modal from "@/components/Modal/Modal";
export default {
  name: "history",
  data() {
    return {
      showModal: false,
      icon: iconDel,
      title: "搜索历史",
      btnList: [
        {
          color: "#2F3338",
          text: "清空历史",
          cb: () => {
            // 清空历史
            this.showModal = false;
            this.$emit("clear");
          }
        },
        {
          color: "#9B9B9B",
          text: "取消",
          cb: () => {
            this.showModal = false;
          }
        }
      ]
    };
  },
  methods: {
    btnClick(index) {
      if (
        this.btnList[index].cb &&
        typeof this.btnList[index].cb === "function"
      ) {
        this.btnList[index].cb();
      }
    },
    itemClick(item) {
      this.$emit("itemClick", item);
    }
  },
  components: {
    itemWrapper,
    Modal
  },
  props: {
    list: {
      type: Array,
      defalut: []
    },
    headerStyle: {
      type: Object,
      defalut: {}
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.history {
  background-color: rgba(255, 255, 255, 1);

  .list {
    width: 100%;
    display: flex;
    flex-direction: column;

    .item {
      display: flex;
      align-items: center;
      padding: 0 0.3rem;
      height: 1.2rem;

      .icon {
        width: 0.22rem;
        height: 0.22rem;
        margin-right: 0.2rem;
      }

      .content {
        flex: 1;

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
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
