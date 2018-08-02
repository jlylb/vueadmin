import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'roles',
    method: 'get',
    params: query
  })
}

export function fetchRoleAlibity(role, query) {
  return request({
    url: 'roles/' + role + '/ability',
    method: 'get',
    params: query
  })
}

export function saveRoleAlibity(role, data) {
  return request({
    url: 'roles/' + role + '/ability',
    method: 'put',
    data
  })
}

export function fetchRole(id) {
  return request({
    url: '/privillege/role/detail',
    method: 'get',
    params: { id }
  })
}

export function createRole(data) {
  return request({
    url: '/privillege/role/create',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/privillege/role/update',
    method: 'putch',
    data
  })
}
