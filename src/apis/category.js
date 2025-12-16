import request from "@/utils/request";

// 获取一级分类数据
export const getTopCategoryApi = (id) => {
 return request({
  url: '/category',
  method: 'get',
  params: {
    id
  }
 })
}

// 获取二级分类数据
export const getSubCategoryApi = (id) => {
  return request({
  url: '/category/sub/filter',
  method: 'get',
  params: {
    id
  }
 })
}

// 获取二级分类下的商品列表
export const getSubCateGoodsApi = (data) => {
  return request({
    url: '/category/goods/temporary',
    method: 'post',
    data
  })
}
