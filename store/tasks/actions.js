export default {
  fetchAllTasks (context) {
    this.$axios.get(`tasks`).then(tasks => {
      context.commit('SET_TASKS', tasks.data)
    }).catch(err => {
      console.log(err)
    })
  },
  filterTasks (context, filter_params) {
    //query builder
    let query = ''
    for(let filter in filter_params) {
      let value = filter_params[filter]
      if (value) {  
        query += `&${filter}=${value}`
      }
    }

    //save filter in vuex
    let new_filter_params = Object.assign({}, filter_params)
    context.commit('SET_FILTER_PARAMS', new_filter_params)

    this.$axios.get(`tasks?${query}`).then(tasks => {
      context.commit('SET_TASKS', tasks.data)
    }).catch(err => {
      console.log(err)
    })
  }
}