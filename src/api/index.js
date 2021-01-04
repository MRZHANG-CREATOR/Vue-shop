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
