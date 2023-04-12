<template>
  <div class="homepage__page-content">
    <div class="homepage__texts-wrapper">
      <h3 class="homepage__title">
        {{ title }}
      </h3>
      <p class="homepage__subtitle">
        {{ sub_title }}
      </p>
    </div>
    <div class="homepage__tasks-input-wrapper">
      <task-input />
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      TaskInput: () => import('~/components/general/TaskInput')
    },
    props: {
      tasks: {
        type: Array,
        default: () => []
      }
    },
    data: () => ({
      title: `Welcome to Task Planner`,
      sub_title: `Get things done with your day, a list that refreshes every day.`
    })
  }
</script>