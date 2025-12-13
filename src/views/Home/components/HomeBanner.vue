<script setup>
import { ref } from 'vue'
import { getBannerApi } from '@/apis/home'

// 轮播图数据
const bannerList = ref([])
const getBannerList = async () => {
  const res = await getBannerApi()
  bannerList.value = res.data.result
}
getBannerList()
</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img alt="" :src="item.imgUrl">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
