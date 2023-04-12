<template>
  <section class="tasks-page__header">
    <h2 class="tasks-page__header-title">
      Task Planner
    </h2>
    <ul>
      <li
        v-for="(item, key) in search_items"
        :key="key"
      >
        <span>
          {{ item.value == 'all' ? 'All' : `${tasksCount[item.value]} ${item.value}` }}
        </span>
      </li>
    </ul>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      search_items: [
        {
          label: 'All',
          value: 'all'
        },
        {
          label: 'Important',
          value: 'important'
        },
        {
          label: 'Done',
          value: 'done'
        }
      ]
    }),
    computed: {
      ...mapGetters({
        tasksCount: 'tasks/getTasksCount'
      })
    }
  }
</script>