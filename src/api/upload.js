import request from '@/utils/request'

export function fetchLogo() {
  return request({
    url: '/upload/detail',
    method: 'get'
  })
}

export function createUser(data) {
  return request({
    url: '/upload/create',
    method: 'post',
    data
  })
}
