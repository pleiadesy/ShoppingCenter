import { loginApi } from "@/apis/user";
import { defineStore } from "pinia";
import {ref} from 'vue'

export const useUserStore = defineStore('user', ()=>{
  const userInfo = ref({})
  // 获取用户信息
  const getUserInfo = async (username, password) => {
    const res = await loginApi(username, password)
    userInfo.value = res.data.result
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
