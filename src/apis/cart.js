import request from "@/utils/request"

// 向购物车中添加商品
export const addCartApi = ({skuId, count}) => {
  return request({
    url: '/member/cart',
    method: 'post',
    data: {
      skuId,
      count
    }
  })
}

// 获取购物车数据
export const getCartApi = ()=> {
  return request.get('/member/cart')
}

// 删除购物车商品
export const delCartApi = (ids) => {
  return request({
    url: '/member/cart',
    method: 'delete',
    data: {
      ids
    }
  })
}

// 合并购物车
export const mergeCartApi = (data) => {
  return request({
    url: '/member/cart/merge',
    method: 'post',
    data
  })
}
