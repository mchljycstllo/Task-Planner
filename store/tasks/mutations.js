export default {
  SET_TASKS: (state, tasks) => {
    state.tasks = tasks

    let done_tasks = tasks.filter(item => {
      return item.is_done == true
    })
    let important_tasks = tasks.filter(item => {
      return item.is_important == true
    })

    state.tasks_count.done = done_tasks.length
    state.tasks_count.important = important_tasks.length
  },
  ADD_TASK: (state, single_task) => {
    
  },
}