<template>
  <div class="edit-task-modal">
    <task-input 
      :edit_task="true"
      :task="modal.data"
    />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
import TaskInput from '../TaskInput.vue'
  export default {
	components: { TaskInput },
    computed: {
      ...mapGetters({
        modal: 'modals/getModal'
      })
    },
    methods: {
      submit () {
        console.log('submit')
      }
    }
  }
</script>

<style lang="scss">
  .edit-task-modal {
   padding: 10px 20px;
  }
</style>