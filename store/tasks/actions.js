export default {
  fetchAllTasks (context) {
    this.$axios.get(`tasks`).then(tasks => {
      console.log('tasks', tasks.data)
      context.commit('SET_TASKS', tasks.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
}