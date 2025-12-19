import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useUserStore } from "./user"

import { addCartApi, delCartApi, getCartApi } from "@/apis/cart"

export const useCartStore = defineStore('cart', ()=> {
  const cartList = ref([])

  const userStore = useUserStore()
  const isLogin = computed(()=>userStore.userInfo.token)

  // 获取购物车数据
  const getCartList = async ()=> {
    const res = await getCartApi()
    cartList.value = res.data.result
  }

  // 向购物车中添加商品
  const addCart = async (goods) => {
    const {skuId, count} = goods
    // 判断是否登录
    if(isLogin.value) {
      await addCartApi({skuId, count})
      // 重新获取购物车数据
      getCartList()
    } else {
      // 未登录，保存在本地
        // 如果已经存在该商品，则数量加一
        const existingGoods = cartList.value.find(item => item.skuId === goods.skuId)
        if(existingGoods) {
          existingGoods.count++
        }else {
          cartList.value.push(goods)  // 不存在，则加入购物车
        }
      }
  }
  // 删除商品
  const delCart = async (skuId) => {
    if(isLogin.value) {
      await delCartApi([skuId])
      getCartList()
    } else {
       cartList.value = cartList.value.filter(item => item.skuId !== skuId)
    }
  }

  // 商品单选功能
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find(item => item.skuId === skuId)
    item.selected = selected
  }
  // 商品全选
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }
  // 根据每个商品选择状态判断是否全选
  const isAllCheck = computed(()=> {
    return cartList.value.every(item => item.selected)
  })

  // 计算购物车中选中的商品数
  const selectedCount = computed(()=> {
    return cartList.value.filter(item => item.selected).reduce((total, item)=>{
      return total + item.count
    }, 0)
  })
  // 计算购物车中选中的商品数的总价
  const selectedPrice = computed(()=> {
    return cartList.value.filter(item => item.selected).reduce((total, item)=>{
      return total + item.count * item.price
    }, 0)
  })

  // 计算购物车中的商品数
  const totalCount = computed(()=> cartList.value.reduce((total, item)=> {
    return total + item.count
  },0))
  // 计算购物车中商品总价
  const totalPrice = computed(()=> cartList.value.reduce((total, item)=> {
    return total + item.count * item.price
  },0))

  return {
    cartList,
    addCart,
    delCart,
    singleCheck,
    allCheck,
    isAllCheck,
    selectedCount,
    selectedPrice,
    totalCount,
    totalPrice
  }
}, {
  persist: true
})
