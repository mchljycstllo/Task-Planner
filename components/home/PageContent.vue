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
      <task-input 
        :page_location="'homepage'"
      />
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

<style lang="scss">
  .homepage {
    &__page-content {
      height: 100vh;
      width: 100%;
      max-width: var(--max-width);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      padding: var(--content-padding);
    }
    &__texts-wrapper {
      margin: 70px 0;
    }
    &__title,
    &__subtitle {
      text-align: center;
    }
    &__subtitle {
      max-width: 350px;
      margin: 0 auto;
      font-size: 18px;
    }
    &__tasks-input-wrapper {
      width: 100%;
    }
  }
</style>