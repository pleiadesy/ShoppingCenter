import request from "@/utils/request";

// 获取商品详情
export const getGoodsDetailApi = (id) => {
  return request({
    url: '/goods',
    method: 'get',
    params: {
      id
    }
  })
}

// 获取热榜商品
export const getHotGoodsApi = ({id, type, limit = 3}) => {
  return request({
    url: '/goods/hot',
    params: {
      id,
      type,
      limit
    }
  })
}
