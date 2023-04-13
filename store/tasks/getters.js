export default {
  getTasks: (state) => {
    return state.tasks
  },
  getTasksCount: (state) => {
    return state.tasks_count
  },
  getFilterParams: (state => {
    return state.filter_params
  })
}