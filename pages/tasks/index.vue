<template>
  <div class="page page-tasks">
    <page-content />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    components: {
      PageContent: () => import('~/components/tasks/PageContent')
    },
    methods: {
      ...mapActions({
        fetchAllTasks: 'tasks/fetchAllTasks',
        filterTasks: 'tasks/filterTasks'
      }),
    },
    computed: {
      ...mapGetters({
        tasks: 'tasks/getTasks',
        filter_params: 'tasks/getFilterParams'
      })
    },
    mounted () {
      this.fetchAllTasks()
      this.$nuxt.$on('fetch-tasks', () => {
        if (this.filter_params) this.filterTasks(this.filter_params)
        else this.fetchAllTasks()
        
      })
      this.$nuxt.$on('execute-search', (filter_params) => {
        this.filterTasks(filter_params)
      })
    },
    destroyed () {
      this.$nuxt.$off('fetch-tasks')
      this.$nuxt.$off('execute-search')
    }
  }
</script>

<style lang="scss">
  .page-tasks {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--content-padding);
  }
</style>