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
        <div 
          class="task-list__operation"
        >
          <div>
            <div class="task-list__assignee">
              <img  
                v-if="task.assignee && task.assignee.avatar"
                :src="task.assignee.avatar" 
                alt="avatar"
                class="task-list__item-avatar"
                @click="setActiveMultiSelect(key, task)"
              >
              <img 
                v-else
                src="images/add-user.svg" 
                alt="add-user"
                class="task-list__item-avatar task-list__item-avatar--add"
                @click="setActiveMultiSelect(key, task)"
              >
              <div 
                class="task-list__multiselect-wrapper"
                v-show="key == active_multi_select_key"
              >
                <multiselect
                  v-model="selected_user"
                  :options="users"
                  :preserve-search="true"
                  :close-on-select="true"
                  placeholder="Search Team Member"
                  :select-label="''"
                  label="name" 
                  track-by="id"
                  @input="onSelectedUser"
                >
                <template slot="carret">
                  <div>
                    <div class="multiselect__select">
                      <img src="/images/search.svg" alt="">
                    </div>
                  </div>
                </template>

                  <template slot="option" slot-scope="{ option }">
                    <div class="option__desc">
                      <span class="option__avatar">
                        <img 
                          :src="option.avatar" 
                          alt="avatar"
                        >
                      </span>
                      <span class="option__value">{{ option.name }}</span>
                    </div>
                  </template>
                </multiselect>
              </div>
            </div>
            
          </div>
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
    data: () => ({
      active_multi_select_key: null,
      selected_user: null,
      task_to_update: null
    }),
    computed: {
      ...mapGetters({
        tasks: 'tasks/getTasks',
        users: 'users/getUsers'
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
      },
      onSelectedUser (event) {
        console.log(event)
        console.log(this.task_to_update)
        let updated_task = Object.assign({}, ({
          ...this.task_to_update,
          assignee: event
        }))
        this.updateTask(updated_task)
        setTimeout(() => {
          this.task_to_update = null
          this.active_multi_select_key = null
          this.selected_user = null
        }, 500)
      },
      setActiveMultiSelect (key, task) {
        console.log(key)
        this.selected_user = null
        this.active_multi_select_key = null

        this.active_multi_select_key = key
        this.task_to_update = task
      },
      removeActiveSelect () {
        console.log('asasd')
        this.active_multi_select_key = null
        this.selected_user = null
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

      &-avatar {
        width: 20px;
        border-radius: 100px;
        cursor: pointer;

        &--add {
          border-radius: unset;
        }
      };
    }
    &__operation {
      display: flex;
      align-items: center;
    }
    &__icon {
      width: 20px;
      margin: 0 5px;
      cursor: pointer;
    }
    &__icon-check {
      margin-right: 10px;
      width: 20px;
    }
    &__icon-uncheck {
      width: 20px;
    }

    &__assignee {
      position: relative;
      margin-right: 10px;
    }

    &__multiselect-wrapper {
      position: absolute;
      z-index: 998;
      width: 300px;
      bottom: -70px;
      left: -50px;
      padding: 10px 5px;
      background-color: var(--theme-white);
      border-radius: 5px;
      border: 1px solid var(--border-color);
    }

    .multiselect__tags {
      width: 100%;
    }
    .multiselect__element img {
      width: 30px;
      border-radius: 100px;
      margin-right: 10px;
    }
  }
</style>