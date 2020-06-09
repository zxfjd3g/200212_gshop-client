<template>
  <!-- <div class="swiper-container" id="swiper"> -->
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Carousel',

  // 声明接收属性数据
  props: {
    carouselList: Array, // 轮播的数组数据
    autoplay: Boolean
  },

  watch: {
    // 监视carouselList的回调函数 ==> 当carouselList发生改变时自动调用
    // [] ==> [...]
   /*  carouselList (value) {
      // console.log('carouselList', value)
      // 利用nexTick()延迟到界面更新之后才去创建swiper对象
      this.$nextTick(() => {
        this.initSwiper()
      })
    }, */
    
    carouselList: {
      // 监视的回调
      handler (value) {
        // 如果还没有数据, 直接结束
        if (this.carouselList.length===0) return

        console.log('carouselList---', value)
        // 利用nexTick()延迟到界面更新之后才去创建swiper对象
        this.$nextTick(() => {
          this.initSwiper()
        })
      },
      // immediate: true, // 初始显示就会调用第一次
    }
  },

  /* 
  在初始界面显示之后执行
  */
  mounted () {
    console.log('++++', this.carouselList.length)
    // 如果初始时已经有数据了, 就创建一个对应的swiper对象
    if (this.carouselList.length>0) { // 已经显示了
      this.initSwiper() // 立即创建swiper, 不需要用什么nextTick()/定时器
    }
  },

  // mounted () {

    /* 办法一: 使用setTimeout延迟执行 */
    /* setTimeout(() => { // 一定要用箭头函数
      // 必须在轮播列表显示之后创建才有效
      // new Swiper('.swiper-container', {
      new Swiper(this.$refs.swiper, {
        // direction: 'horizontal', // 水平切换, 默认就是这个值

        loop: true, // 循环模式选项

        autoplay: true, // 是否自动轮播

        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      })
    }, 1000) */
    
  // },

  methods: {
    /* 
    初始化创建swiper对象
    */
    initSwiper () {
      console.log('创建swiper对象')
      new Swiper(this.$refs.swiper, {
        // direction: 'horizontal', // 水平切换, 默认就是这个值

        loop: true, // 循环模式选项

        autoplay: this.autoplay, // 是否自动轮播

        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
