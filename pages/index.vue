<template>
  <div class="page page--home">
    <page-content />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    components: {
      PageContent: () => import('~/components/home/PageContent')
    },
    mounted () {
      this.$nuxt.$on('display-swal', (swal_payload) => {
        this.$swal(swal_payload)
      })
    },
    destroyed () {
      this.$nuxt.$off('display-swal')
    }
  }
</script>