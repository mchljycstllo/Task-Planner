<template>
  <div class="tasks-page__content">
    <section class="tasks-page__header-wrapper">
      <Header />
    </section>
    <section class="tasks__task-list-wrapper">
      <task-list />
    </section>
  </div>
</template>

<script>
  export default {
    components: {
      TaskList: () => import('~/components/general/TaskList'),
      Header: () => import('~/components/tasks/Header')
    }
    
  }
</script>