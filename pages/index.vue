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
    }
  }
</script>