<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in skuImageList" :key="item.id"
        @click="changeCurrent(index)">
        <img :src="item.imgUrl" :class="{active: currentIndex===index}">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Swiper from 'swiper'

  export default {
    name: "ImageList",

    data () {
      return {
        currentIndex: 0
      }
    },

    watch: {
      skuImageList: {
        handler () {
          // 界面更新显示之后才去创建swiper对象
          this.$nextTick(() => {
            new Swiper(this.$refs.swiper, {
              // direction: 'horizontal', // 水平切换, 默认就是这个值
              slidesPerView: 5,  // 一次显示5页
              slidesPerGroup: 5, // 每次翻动多少(5)页

              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }
            })
          })
        },
        immediate: true, // 组件初始化显示就会执行一次
      }
    },

    methods: {
      changeCurrent (index) {
        // 如果点击就是当前下标的图片, 直接结束
        if (index===this.currentIndex) return
        // 指定当前页的下标
        this.currentIndex = index
        // 通知父组件, 当前下标变化了
        this.$emit('currentChange', index)
      }
    },

    computed: {
      ...mapGetters(['skuImageList'])
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      // width: 56px;
      // height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;
        margin: 0 auto;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>