<template>
  <div class="page page-tasks">
    <page-content 
      v-if="loaded"
    />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    components: {
      PageContent: () => import('~/components/tasks/PageContent')
    },
    data: () => ({
      loaded: false
    }),
    methods: {
      ...mapActions({
        fetchAllTasks: 'tasks/fetchAllTasks',
        filterTasks: 'tasks/filterTasks',
        fetchAllUsers: 'users/fetchAllUsers'
      }),
    },
    computed: {
      ...mapGetters({
        tasks: 'tasks/getTasks',
        filter_params: 'tasks/getFilterParams'
      })
    },
    async mounted () {
      await this.fetchAllTasks()
      await this.fetchAllUsers()
      this.loaded = true
      this.$nuxt.$on('fetch-tasks', () => {
        if (this.filter_params) this.filterTasks(this.filter_params)
        else this.fetchAllTasks()
        
      })
      this.$nuxt.$on('execute-search', (filter_params) => {
        this.filterTasks(filter_params)
      })
      this.$nuxt.$on('display-swal', (swal_payload) => {
        this.$swal(swal_payload)
      })
    },
    destroyed () {
      this.$nuxt.$off('fetch-tasks')
      this.$nuxt.$off('execute-search')
      this.$nuxt.$off('display_swal')
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