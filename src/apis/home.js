import request from '@/utils/request'

// 获取轮播图数据
export const getBannerApi = () => {
  return request.get('/home/banner')
}

// 获取新鲜好物数据
export const getNewGoodsApi = () => {
  return request.get('/home/new')
}

// 获取人气推荐数据
export const getHotGoodsApi = () => {
  return request.get('/home/hot')
}

// 获取产品列表
export const getProductApi = () => {
  return request.get('/home/goods')
}
