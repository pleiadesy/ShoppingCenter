<script setup>
import { getTopCategoryApi } from '@/apis/category'
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { getBannerApi } from '@/apis/home'

// 面包屑导航中的分类
const category = ref({})
const getCategory = async (id) => {
  const res = await getTopCategoryApi(id)
  category.value = res.data.result
}

// 页面首次加载时，发一次获取面包屑导航分类数据的请求
const route = useRoute()
getCategory(route.params.id)

// 轮播图数据
const bannerList = ref([])
const getBannerList = async () => {
  const res = await getBannerApi({distributionSite: '2'})
  bannerList.value = res.data.result
}
getBannerList()

// 使用 onBeforeRouteUpdate解决路由缓存，更新点击之后的面包屑导航
onBeforeRouteUpdate((to, from, next) => {
  getCategory(to.params.id)
  next()
})

// 当路由参数改变时，xu重新获取数据渲染
// watch(()=> route.params.id, (newId)=>{
//   // 有新id时，才发送请求
//   if(newId) getCategory(newId)
// },{
//   // 组件初始化时立即执行一次
//   immediate: true
// })
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{category.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        <!-- 轮播图 -->
       <div class="home-banner">
          <el-carousel height="500px">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
              <img alt="" :src="item.imgUrl">
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 分类数据 -->
        <div class="sub-list">
           <h3>全部分类</h3>
           <ul>
             <li v-for="i in category.children" :key="i.id">
               <RouterLink :to="`/category/sub/${i.id}`">
                 <img :src="i.picture" />
                 <p>{{ i.name }}</p>
               </RouterLink>
             </li>
           </ul>
        </div>
        <div class="ref-goods" v-for="item in category.children" :key="item.id">
          <div class="head">
            <h3>- {{ item.name }}-</h3>
          </div>
          <div class="body">
            <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
          </div>
        </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }

}

</style>
