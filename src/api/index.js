// 当前模块对 API 进行管理
import request from "./request";

// 登录
export const login = (params) => request.post(`/login`, params)

// 获取侧边菜单
export const getMenus = () => request.get('/menus')

// 获取用户管理->用户列表
export const getUserList = (params) => request.get('users',{params})

// 修改用户状态
export const modifyUserStatus = (userInfo) => request.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)

// 创建用户
export const addUser = (params) => request.post('/users', params)

// 查询用户信息
export const queryUser = (id) => request.get(`/users/${id}`)

// 修改用户信息
export const editUser = (params) => request.put(`/users/${params.id}`, {email: params.email, mobile: params.mobile})

// 删除用户
export  const deleteUser = (id) => request.delete(`/users/${id}`)
