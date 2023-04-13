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
            class="task-list__icon task-list__icon--eye"
            src="/images/show-icon.svg"
            alt="show"
            @click="showTask(task)"
          >
          <img
            class="task-list__icon task-list__icon--edit"
            src="/images/edit-icon.svg"
            alt="edit"
            @click="editTask(task)"
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
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        tasks: 'tasks/getTasks'
      })
    },
    methods: {
      ...mapMutations({
        SET_MODAL: 'modals/SET_MODAL'
      }),
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
        this.SET_MODAL({
          opened: true,
          api: `tasks/${task.id}`,
          title: 'Confirmation',
          type: 'body',
          message: `Do you want to delete ${task.title}?`,
          show_buttons: true
        })
      },
      editTask (task) {
        this.SET_MODAL({
          opened: true,
          api: `tasks/${task.id}`,
          title: `Edit Task`,
          type: 'edit-task',
          data: task,
          show_buttons: true
        })
      },
      showTask (task) {
        this.SET_MODAL({
          opened: true,
          title: `Show Task`,
          type: 'body',
          data: task,
          message: task.title,
          show_buttons: false
        })
      }
    }
  }
</script>

<style lang="scss">
  .task-list {
    &__title {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;  
      overflow: hidden;
    }
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

      &-left {
        display: flex;
        align-items: center;
        max-width: 70%;
      }
    }
    &__icon {
      width: 20px;
      cursor: pointer;
    }
    &__icon-check {
      margin-right: 10px;
      width: 20px;
    }
    &__icon-uncheck {
      width: 20px;
    }
  }
</style>