import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'permission',
    method: 'get',
    params: query
  })
}

export function fetchPermission(id) {
  return request({
    url: '/privillege/permission/detail',
    method: 'get',
    params: { id }
  })
}

export function createPermission(data) {
  return request({
    url: 'permission',
    method: 'post',
    data
  })
}

export function updatePermission(data) {
  return request({
    url: '/privillege/permission/update',
    method: 'putch',
    data
  })
}

export function getPermissiones(query, data) {
  return request({
    url: 'permission/' + query + '/search',
    method: 'get',
    params: data
  })
}
