import request from '@/utils/request'

const baseURL = 'http://localhost:3000'

// 根据检索框返回结果
export function fetchList(query) {
  // console.log(query)
  return request({
    baseURL: baseURL,
    url: '/apply',
    method: 'get',
    params: query
  })
}

// 提交申请信息
export function updateApply(id) {
  // console.log(id)
  return request({
    baseURL: baseURL,
    url: `/apply/${id}`,
    method: 'post'
  })
}

// 删除申请信息
export function deleteApply(id) {
  // console.log(id)
  return request({
    baseURL: baseURL,
    url: `/apply/${id}`,
    method: 'delete'
  })
}
