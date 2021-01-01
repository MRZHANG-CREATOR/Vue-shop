import axios from 'axios'
export async function apiLogin ({
  username,
  password
}) {
  const {
    data: res
  } = await axios.post('/api/login', { // 解构出data并重命名为res
    username,
    password
  })
  return res
}
