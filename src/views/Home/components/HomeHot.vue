<script setup>
import { ref } from 'vue'
import { getHotGoodsApi } from '@/apis/home'

import HomePanel from './HomePanel.vue'

// 人气推荐物品数据
const hotGoodsList = ref([])
const getHotGoodsList = async () => {
  const res = await getHotGoodsApi()
  hotGoodsList.value = res.data.result
}
getHotGoodsList()
</script>

<template>
<HomePanel title="人气推荐" subTitle="人气爆款，值得拥有">
  <template #main>
    <ul class="goods-list">
      <li v-for="item in hotGoodsList" :key="item.id">
        <RouterLink to="/">
          <img v-imgLazyLoad="item.picture" alt="">
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </template>
</HomePanel>
</template>

<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
