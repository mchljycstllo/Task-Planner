<template>
  <div class="modal-body">
    <p>
      {{ modal.message }}
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      modal: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>

<style lang="scss">
  .modal-body {
    opacity: 1;
  }
</style>