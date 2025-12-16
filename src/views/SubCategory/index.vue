<script setup>
import{ ref } from 'vue'
import { getSubCategoryApi, getSubCateGoodsApi } from '@/apis/category'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
// 二级分类 面包屑导航栏数据
const subCategory = ref({})
const getsubCategory = async (id) => {
  const res = await getSubCategoryApi(id)
  // console.log(res)
  subCategory.value = res.data.result
}

// 页面创建时，发送一次请求
const route = useRoute()
getsubCategory(route.params.id)

// 路由更新时，获取新的数据
onBeforeRouteUpdate((to, from, next)=> {
  if(to.params.id !== from.params.id) getsubCategory(to.params.id)
  next()
})
getsubCategory()

// 请求数据
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
// 获取商品列表数据
const subCateGoodsList = ref([])
const getsubCateGoodsList = async () => {
  const res = await getSubCateGoodsApi(reqData.value)
  // console.log(res)
  subCateGoodsList.value = res.data.result
}
getsubCateGoodsList()

// tab组件切换时，重新获取相应的数据
const tabChange = () => {
  reqData.value.page = 1
  getsubCateGoodsList()
}

// 滚动到底后，加载更多数据
const disabled = ref(false) // 禁用加载
const load = async () => {
  reqData.value.page++
  const res = await getsubCateGoodsList(reqData.value)
  subCateGoodsList.value = [...subCateGoodsList.value, ...res.data.result.items]
  // 没有更多数据时，禁用加载
  if(res.data.result.items.length === 0) disabled.value = true
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${subCategory.parentId}` }">{{subCategory.parentName}}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{subCategory.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
         <!-- 商品列表-->
        <GoodsItem :goods="subCateGoodsList"></GoodsItem>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>
