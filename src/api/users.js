import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'users',
    method: 'get',
    params: query
  })
}

export function fetchRoles(id, query) {
  return request({
    url: 'user/roles/' + id,
    method: 'get',
    params: query
  })
}

export function saveRoles(data) {
  return request({
    url: 'user/roles/',
    method: 'put',
    data
  })
}

export function fetchUser(id) {
  return request({
    url: '/privillege/user/detail',
    method: 'get',
    params: { id }
  })
}

export function createUser(data) {
  return request({
    url: '/privillege/user/create',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/privillege/user/update',
    method: 'putch',
    data
  })
}
