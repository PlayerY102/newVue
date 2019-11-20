import request from '@/utils/request'

const baseURL = 'http://localhost:3000'

// 获取所有申请数据
export function fetchApplyList() {
  return request({
    baseURL: baseURL,
    url: '/apply',
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

// 创建一个申请记录
export function createApply(data) {
// console.log(data)
  return request({
    baseURL: baseURL,
    url: '/apply',
    method: 'post',
    data
  })
}

// 更新申请信息
export function updateApply(data) {
// console.log(`/scholar/${data.id}`)
  return request({
    baseURL: baseURL,
    url: `/apply/${data.id}`,
    method: 'post',
    data
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
