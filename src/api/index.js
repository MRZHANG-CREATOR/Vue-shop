import axios from 'axios'
axios.interceptors.request.use(config => {
  // axios请求拦截器
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
export async function apiLogin({ username, password }) {
  const { data: res } = await axios.post('/api/login', {
    // 解构出data并重命名为res
    username,
    password
  })
  return res
}
export async function apiGetMenuList() {
  const { data: res } = await axios.get('/api/menus')
  return res
}
export async function apiGetUsersList(queryInfo) {
  const { data: res } = await axios.get('/api/users', { params: { queryInfo } })
  return res
}
export async function apiUserStateChange(userInfo) {
  const { data: res } = await axios.put(`/api/users?id=${userInfo._id}&state=${userInfo.mg_state}`)
  return res
}
export async function apiAddUser(io) {
  const { data: res } = await axios.post('/api/users', { username: io.username, password: io.password, email: io.email, mobile: io.mobile })
  return res
}
export async function apiShowUser(id) {
  const res = await axios.get(`/api/usershow?id=${id}`)
  console.log(res)
  return res
}
export async function apiEditUserInfo(id, editUserInfo) {
  const res = await axios.put('/api/useredit?id=' + id, editUserInfo)
  return res
}
export async function apiDeleteUser(id) {
  const res = await axios.delete('/api/userdelete?id=' + id)
  return res
}
export async function apiGetRightsList(type) {
  const res = await axios.get('/api/rights?type=' + type)
  return res
}
export async function apiGetRolesList() {
  const res = await axios.get('/api/roles')
  return res
}
export async function apiEditRoleRight(id, idStr) {
  const res = await axios.post('/api/roles?id=' + id, idStr)
  return res
}
export async function apiGetCateList(type = '3', sel) {
  const res = await axios.get('/api/categories?type=' + type, { params: { sel: sel } })
  return res
}
export async function apiAddCate(addCateForm) {
  const res = await axios.post('/api/categories', addCateForm)
  return res
}
/**
 * @param {number} [id]
 * @param {number} [attrid]
 */
export async function apiDeleteParam(id, attrid) {
  const res = await axios.delete(`/api/categories/${id}/attributes/${attrid}`)
  return res
}
export async function apiAddParamTag(id, attrid, attr) {
  const res = await axios.put(`/api/categories/${id}/attributes/${attrid}`, attr)
  return res
}
export async function apiGetGoodList(queryInfo) {
  const res = await axios.get('/api/goods', { params: queryInfo })
  return res
}
export async function apiDeleteGood(id) {
  const res = await axios.delete('/api/goods/' + id)
  return res
}
export async function apiGetParams(id, sel) {
  const res = await axios.get(`/api/categories/${id}/attributes`, { params: { sel: sel } })
  return res
}
export async function apiUpload(params) {
  const res = await axios.post('/api/upload', params)
  return res
}
export async function apiAddGoods(form) {
  const res = await axios.post('/api/goods', form)
  return res
}
export async function apiGetOrderList(queryInfo) {
  const res = await axios.get('/api/order', { params: queryInfo })
  return res
}
export async function apiGetKuaiDi(order) {
  const res = await axios.get(`/api/kuaidi/${order}`)
  return res
}
