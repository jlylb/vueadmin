
import store from '@/store'

export default{
  inserted(el, binding, vnode) {
    // const { value } = binding
    // const abilities = store.getters && store.getters.abilities
    // console.log(value, 99999)
    // const permissionAbility = value
    // let hasPermission
    // if (permissionAbility) {
    //   hasPermission = abilities.indexOf(permissionAbility) > -1
    // } else {
    //   hasPermission = false
    // }
    // // if (!hasPermission) {
    // //   el.parentNode && el.parentNode.removeChild(el)
    // // }
    // el.style.display = hasPermission ? 'inline-block' : 'none'
  },
  update(el, binding) {
    const { value, oldValue } = binding
    console.log(value, oldValue, 888888)
    if (value === oldValue) {
      return false
    }
    const abilities = store.getters && store.getters.abilities
    const permissionAbility = value
    let hasPermission
    if (permissionAbility) {
      hasPermission = abilities.indexOf(permissionAbility) > -1
    } else {
      hasPermission = false
    }
    // if (!hasPermission) {
    //   el.parentNode && el.parentNode.removeChild(el)
    // }
    el.style.display = hasPermission ? 'inline-block' : 'none'
  }
}
