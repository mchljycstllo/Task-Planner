export default {
  SET_TASKS: (state, tasks) => {
    state.tasks = tasks

    let done_tasks = tasks.filter(item => {
      return item.is_done == true
    })
    let important_tasks = tasks.filter(item => {
      return item.is_important == true
    })

    state.tasks_count.is_done = done_tasks.length
    state.tasks_count.is_important = important_tasks.length
  },
  SET_FILTER_PARAMS: (state, filter_params) => {
    state.filter_params = filter_params
  }
}