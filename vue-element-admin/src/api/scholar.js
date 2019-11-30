import request from '@/utils/request'

const baseURL = 'http://localhost:3000'

// 根据检索框返回结果
export function fetchList(query) {
  return request({
    baseURL: baseURL,
    url: '/scholar',
    method: 'get',
    params: query
  })
}

// 创建一个专家
export function createScholar(data) {
  return request({
    baseURL: baseURL,
    url: '/scholar',
    method: 'post',
    data
  })
}

// 更新专家信息
export function updateScholar(data) {
// console.log(`/scholar/${data.id}`)
  return request({
    baseURL: baseURL,
    url: `/scholar/${data.id}`,
    method: 'post',
    data
  })
}

// 删除专家信息
export function deleteScholar(id) {
// console.log(id)
  return request({
    baseURL: baseURL,
    url: `/scholar/${id}`,
    method: 'delete'
  })
}
