import request from '@/utils/request'

const baseURL = 'http://localhost:3000'

// 一次性取下专家数据
export function fetchScholorList() {
  return request({
    baseURL: baseURL,
    url: '/scholar',
    method: 'get'
  })
}
// 根据检索框返回本机检索的结果
// export function fetchList(query) {
//     console.log(query)
//     const { id, affiliation, country, name, status, page = 1, limit = 20, sort } = query
//     let mockList = List.filter(item => {
//         if (country && item.country !== country) return false
//         // if (title && item.title.indexOf(title) < 0) return false
//         if (affiliation && item.affiliation.indexOf(affiliation) < 0) return false
//         if (name && item.name.indexOf(name) < 0) return false
//         if (id && item.id !== parseInt(id)) return false
//         if (status && item.status !== status) return false
//         return true
//     })
//     if (sort === '-id') {
//         mockList = mockList.reverse()
//     }
//     const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1)) 
//     return {
//         data: {
//             total: mockList.length,
//             items:  pageList,
//         }
//     }
// }
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
