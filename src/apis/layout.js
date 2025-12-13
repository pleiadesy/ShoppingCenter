import request from '@/utils/request'

// 获取首页一级分类导航列表
export const getCategoryApi = () => {
  return request.get('/home/category/head')
}

