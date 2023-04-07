// 当前模块对 API 进行管理
import request from "./request";

export const login = (params) => request.post(`/login`, params)
