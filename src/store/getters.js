const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  version: state => 'v1.0.0'
}
export default getters
