import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'admin/menu',
    method: 'get',
    params: query
  })
}

export function fetchNotice(id) {
  return request({
    url: '/notice/detail',
    method: 'get',
    params: { id }
  })
}



export function createMenu(data) {
  return request({
    url: 'admin/menu',
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: 'admin/menu/' + data.id,
    method: 'put',
    data
  })
}

export function deleteMenu(data) {
  return request({
    url: 'admin/menu/' + data.id,
    method: 'delete',
    params: data
  })
}

export function fetchAllMenu() {
  return request({
    url: 'admin/menu/create',
    method: 'get',
  })
}

export function fetchMenu(id) {
  return request({
    url: 'admin/menu/show/' + id,
    method: 'get',
  })
}