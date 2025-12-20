import request from "@/utils/request"

// 获取订单结算信息
export const getOrderInfoApi = () => {
  return request.get('/member/order/pre')
}

// 提交订单
export const submitOrderApi = (data) => {
  return request({
    url: '/member/order',
    method: 'post',
    data
  })
}

// 获取付款信息
export const getPayInfoApi = (id) => {
  return request.get(`/member/order/${id}`)
}
