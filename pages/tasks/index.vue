<template>
  <div class="homepage page">
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
        fetchAllTasks: 'tasks/fetchAllTasks'
      }),
    },
    computed: {
      ...mapGetters({
        tasks: 'tasks/getTasks'
      })
    },
    mounted () {
      this.fetchAllTasks()
      this.$nuxt.$on('fetch-tasks', () => {
        this.fetchAllTasks()
      })
    },
    destroyed () {
      this.$nuxt.$off('fetch-tasks')
    }
  }
</script>