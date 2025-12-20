import { loginApi } from "@/apis/user";
import { defineStore } from "pinia";
import {ref} from 'vue'
import { useCartStore } from "./cart";
import { mergeCartApi } from "@/apis/cart"

export const useUserStore = defineStore('user', ()=>{
  const cartStore = useCartStore()
  const userInfo = ref({})
  // 获取用户信息 / 登录
  const getUserInfo = async (username, password) => {
    const res = await loginApi(username, password)
    userInfo.value = res.data.result
    // 登录时合并购物车
    await mergeCartApi(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    // 重新获取购物车数据
    cartStore.getCartList()
  }

  // 清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
  }

  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  persist: true
})
