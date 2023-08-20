<template>
  <div class="homepage__page-content">
    <section class="homepage__header-wrapper">
      <div class="homepage__header-wrapper__content">
        <Header 
          :isHome="true"
        />
      </div>
    </section>
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
      TaskInput: () => import('~/components/general/TaskInput'),
      Header: () => import('~/components/general/Header')
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
    &__header-wrapper {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      &__content {
        max-width: var(--max-width);
        margin: 0 auto;
      }
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

    @media(max-width: 980px) {
      &__header-wrapper {
        &__content {
          padding: 0 20px;
        }
      }
    }
  }
</style>