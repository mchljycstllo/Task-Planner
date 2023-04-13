export default {
  fetchAllUsers (context) {
    this.$axios.get(`users`).then(users => {
      console.log(users)
      context.commit('SET_USERS', users.data)
    }).catch(err => {
      console.log(err)
    })
  }
}