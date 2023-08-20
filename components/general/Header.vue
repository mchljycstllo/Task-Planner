<template>
  <section class="tasks-page__header">
   <div class="tasks-page__header-top"> 
    <nuxt-link to="/">
      <h2 class="tasks-page__header-title">
        Task Planner
      </h2>
    </nuxt-link>
    <ul v-if="isHome">
      <li>
        <nuxt-link to="/tasks" class="tasks-page__tasks-link"> Tasks </nuxt-link>
      </li>
    </ul>
    <ul class="tasks-page__filter-wrapper" v-if="!isHome">
      <li
        v-for="(item, key) in search_items"
        :key="key"
        @click="setActiveFilter(item)"
        :class="`tasks-page__filter-item ${item.value == active_filter && 'tasks-page__filter-item--active'}`"
      >
        <span class="tasks-page__filter-item-label">
          {{ item.value == 'all' ? 'All' : `${tasksCount[item.value]} ${item.label}` }}
        </span>
      </li>
    </ul>
   </div>

    <form 
      class="tasks-page__search-wrapper"
      @submit.prevent="executeSearch()"
      v-if="!isHome"
    >
      <img 
        class="tasks-page__search-icon"
        src="/images/search.svg" 
        alt="search-icon"
      >
      <input 
        type="text"
        class="tasks-page__search-input no-outline"
        placeholder="Search"
        v-model="filter_params.search"
        @input="textSearch()"
      >
    </form>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: {
      isHome: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      search_items: [
        {
          label: 'All',
          value: 'all'
        },
        {
          label: 'Important',
          value: 'is_important'
        },
        {
          label: 'Done',
          value: 'is_done'
        }
      ],
      active_filter: 'all',
      filter_params: {
        search: '',
        is_important: false,
        is_done: false
      },
      timer: null
    }),
    computed: {
      ...mapGetters({
        tasksCount: 'tasks/getTasksCount'
      })
    },
    methods: {
      setActiveFilter(item) {
        this.active_filter = item.value

        //reset filter params for important and done
        this.filter_params.is_important = false
        this.filter_params.is_done = false

        if (item.value != 'all') {
          this.filter_params[item.value] = true
        }
        this.executeSearch ()
      },
      textSearch (e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.executeSearch()
        }, 1000)
      },
      executeSearch () {
        this.$nuxt.$emit('execute-search', (this.filter_params))
      }
    }
  }
</script>

<style lang="scss">
  .tasks-page {
    &__header {
      padding: 20px 0;
      width: 100%;
      &-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        ul {
          margin-bottom: 8px;
        }
      }
      &-title {
        font-size: 32px;
        color: var(--theme-gray-900);
        transition: var(--fast-transition);
        &:hover {
          color: var(--theme-primary);
        }
      }
    }
    &__tasks-link {
      font-size: 32px;
      color: var(--theme-primary);
    }
    &__filter {
      &-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        border-radius: 10px;
        font-size: 16px;
        cursor: pointer;
        transition: var(--fast-transition);
        &--active {
          background-color: var(--theme-gray-200);
        }
      }
      &-item-label {
        font-size: 16px;
      }
    }
    &__search {
      &-wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 5px 10px;
        background-color: var(--theme-white);
        border: 1px solid var(--border-color);
        border-radius: 100px;
        transition: var(--fast-transition);
        opacity: 0.8;
        &:hover {
          opacity: 1;
        }
      }
      &-icon {
        width: 20px;
      }
      &-input {
        width: 100%;
        padding: 0 10px;
        border: none;
        font-size: 16px;
        background-color: var(--theme-white);
      }
    }
  }
</style>