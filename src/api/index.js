// 当前模块对 API 进行管理
import request from "./request";

// 登录
export const login = (params) => request.post(`/login`, params)

// 获取侧边菜单
export const getMenus = () => request.get('/menus')

// 获取用户管理->用户列表
export const getUserList = (params) => request.get('users', {params})

// 修改用户状态
export const modifyUserStatus = (userInfo) => request.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)

// 创建用户
export const addUser = (params) => request.post('/users', params)

// 查询用户信息
export const queryUser = (id) => request.get(`/users/${id}`)

// 修改用户信息
export const editUser = (params) => request.put(`/users/${params.id}`, {email: params.email, mobile: params.mobile})

// 删除用户
export const deleteUser = (id) => request.delete(`/users/${id}`)
// 分配用户角色
export const allotUserRole = (userId, roleId) => request.put(`users/${userId}/role`, {rid: roleId})


// 获取权限列表
export const getRights = (type) => request.get(`/rights/${type}`)

// 获取角色列表
export const getRoles = () => request.get('/roles')

// 添加角色
export const addRole = (params) => request.post('/roles', params)
// 查询 role 信息
export const getRole = (roleId) => request.get(`/roles/${roleId}`)
// 修改角色
export const editRoleApi = (params) => request.put(`/roles/${params.roleId}`, {
  roleName: params.roleName,
  roleDesc: params.roleDesc
})
// 删除角色
export const deleteRole = (roleId) => request.delete(`/roles/${roleId}`)
// 删除角色制定权限
export const deleteRoleRight = (roleId, rightId) => request.delete(`/roles/${roleId}/rights/${rightId}`)
// 给角色赋予权限
export const setRoleRight = (params) => request.post(`/roles/${params.roleId}/rights`, {rids: params.rids})


// 获取商品分类
export const getCategories = (params) => request.get('/categories', {params})
// 删除分类
export const deleteCategory = (categoryId) => request.delete(`/categories/${categoryId}`)
// 添加分类
export const addCategory = (params) => request.post('/categories', params)
//修改分类
export const editCategory = (cateId, cat_name) => request.put(`/categories/${cateId}`, {cat_name: cat_name})


// 获取参数列表
export const getAttributes = (paras) => request.get(`/categories/${paras.cateId}/attributes`, {params:{sel: paras.sel}})
// 添加属性
export const editAttributes = (catId,paras) => request.post(`categories/${catId}/attributes`, paras)
// 删除属性
export  const deleteAttributes = (paras) => request.delete(`categories/${paras.cat_id}/attributes/${paras.attr_id}`)
// 修改属性
export const updateAttributes = (cateId, attrId, paras) => request.put(`categories/${cateId}/attributes/${attrId}`, {attr_sel: paras.attr_sel, attr_name: paras.attr_name, attr_vals: paras.attr_vals})
