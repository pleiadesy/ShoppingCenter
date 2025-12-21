import request from "@/utils/request"

// 猜你喜欢
export const getUserLikeApi = ({limit = 4}) => {
  return request({
    url: '/goods/relevant',
    method: 'get',
    params: {
      limit
    }
  })
}

// 个人订单
export const getUserOrderApi = (params) => {
  return request({
    url: '/member/order',
    method: 'get',
    params
  })
}
