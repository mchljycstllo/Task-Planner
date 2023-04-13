<template>
  <section class="task-list">
    <ul 
      v-if="tasks.length"
      class="task-list__wrapper"
    >
      <li
        v-for="(task, key) in tasks"
        :key="key"
        :class="`task-list__item ${task.is_done && 'task-list__item--done'}`"
      >
        <div class="task-list__item-left">
          <img
            class="task-list__icon-check"
            :src="`${task.is_done ? '/images/checked.svg' : '/images/unchecked.svg'}`"
            @click="updateTask(task, 'is_done')"
          />
          <span class="task-list__title">
            {{ task.title }}
          </span>
        </div>
        <div class="task-list__operation">
          <img
            class="task-list__icon task-list__icon--star"
            :src="`${task.is_important ? '/images/star-orange.svg' : '/images/star-gray.svg'}`"
            alt="star"
            @click="updateTask(task, 'is_important')"
          >
          <img
            class="task-list__icon task-list__icon--star"
            src="/images/delete.svg"
            alt="delete"
            @click="deleteTask(task)"
          >
        </div>
      </li>
    </ul>
    <div 
      v-else
      class="task-list__no-result"
    >
      No Result Found
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        tasks: 'tasks/getTasks'
      })
    },
    methods: {
      updateTask(task, field) {
        let updated_task = Object.assign({}, task)
        updated_task[field] = !task[field]

        this.$axios.put(`tasks/${task.id}`, updated_task)
        .then(response => {
          this.$nuxt.$emit('fetch-tasks')
        })
        .catch(err => {
          console.log(err)
        })
      },
      deleteTask(task) {
        this.$axios.delete(`tasks/${task.id}`)
        .then(response => {
          this.$nuxt.$emit('fetch-tasks')
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="scss">
  .task-list {
    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      margin: 10px 0;
      background-color: var(--theme-white);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      &--done {
        .task-list__title {
          text-decoration: line-through;
          opacity: 0.8;
        }
      }
    }
    &__icon-check {
      margin-right: 10px;
      width: 20px;
    }
    &__icon-uncheck {
      width: 20px;
    }
    &__icon {
      width: 20px;
    }
  }
</style>