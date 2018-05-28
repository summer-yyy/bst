<template>
  <div class="dialog">
      <img class="icon close" src="./icon-closed@2x.png" @click="close">
      <div class="title">{{title}}</div>
      <div class="error">{{error}}</div>
      <slot></slot>
      <div class="btn" :class="{active: btnActive}" @click="btnClick">{{btnText}}</div>
  </div>
</template>

<script>
export default {
  name: 'bst-input',
  data () {
    return {
    }
  },
  props: {
    title: {
      type: String,
      defalut: ''
    },
    btnText: {
      type: String,
      defalut: ''
    },
    error: {
      type: String,
      defalut: ''
    },
    btnActive: {
      type: Boolean,
      defalut: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    btnClick () {
      if (this.btnActive) {
        this.$emit('btnClick')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.dialog
  background-color: rgba(255,255,255,1);
  position relative
  text-align center
  padding-top 0.56rem
  border-radius 0.04rem
  .icon
    height 0.25rem
    width 0.25rem
    position absolute
    top 0.18rem
    right 0.24rem
  .title
    height: 0.45rem;
    line-height: 0.45rem;
    color: rgba(51, 51, 51, 1);
    font-size: 0.32rem;
    color: #333333;
    font-family :PingFangSC-Regular;
  .error
    height: .30rem;
    line-height: .30rem;
    color: rgba(255, 126, 52, 1);
    font-size: .22rem;
    margin-top: 0.06rem;
  .btn
    height: .8937rem;
    background-color: rgba(216, 216, 216, 1);
    font-size 0.32rem
    line-height .8937rem;
    color #fff;
    font-weight:600;
    border-radius: 0 0 0.04rem 0.04rem;
    &.active
      background-color: rgba(255, 183, 64, 1);
</style>
