<template>
  <div class="tasks-page__content">
    <section class="tasks-page__header-wrapper">
      <Header />
    </section>
    <section class="tasks__task-list-wrapper">
      <task-list />
    </section>
    <section class="tasks__task-input-wrapper">
      <task-input 
        :page_location="'tasks-page'"
      />
    </section>
  </div>
</template>

<script>
  export default {
    components: {
      TaskList: () => import('~/components/general/TaskList'),
      TaskInput: () => import('~/components/general/TaskInput'),
      Header: () => import('~/components/tasks/Header')
    }
    
  }
</script>