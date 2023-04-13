<template>
  <section class="task-list">
    <draggable 
      v-model="tasks"
      @start="drag=true" @end="drag=false"
      v-if="tasks.length"
      class="task-list__wrapper"
      @change="updateDraggableTasks"
    >
      <div
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
                <img 
                  src="/images/close-solid.svg" 
                  alt=""
                  class="task-list__close-users"
                  @click="removeActiveSelect()"
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
            class="task-list__icon task-list__icon--trash"
            src="/images/trash-gray.svg"
            alt="delete"
            @click="deleteTask(task)"
          >
        </div>
      </div>
    </draggable>
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
  import draggable from 'vuedraggable'
  export default {
    components: {
      draggable
    },
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
        SET_MODAL: 'modals/SET_MODAL',
        SET_TASKS: 'tasks/SET_TASKS'
      }),
      updateTask(task, field) {
        let updated_task = Object.assign({}, task)
        updated_task[field] = !task[field]

        let message = this.messageBuilder(field, updated_task[field])
        this.$nuxt.$emit('display-swal', ({
          title: 'Success', 
          type: 'success',
          icon: 'success',
          text: message,
          timer: 5000
        }))

        this.$axios.put(`tasks/${task.id}`, updated_task)
        .then(response => {
          this.$nuxt.$emit('fetch-tasks')
        })
        .catch(err => {
          console.log(err)
        })
      },
      messageBuilder(field, value) {
        console.log(field)
        let message = ''
        if(field == 'user') message = 'User has been added successfully'
        else {
          if (field == 'is_done') {
            message = value ? 'Task has been marked as done' : 'Task has been marked as undone'
          }
          else {
            message = value ? 'Task has been marked as important' : 'Task has been marked as unimportant'
          }
        }
        return message
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
        let updated_task = Object.assign({}, ({
          ...this.task_to_update,
          assignee: event
        }))
        this.$nuxt.$emit('display-swal', ({
          title: 'Success', 
          type: 'success',
          icon: 'success',
          text: 'A user as been added successfully',
          timer: 5000
        }))
        this.updateTask(updated_task, 'user')
        setTimeout(() => {
          this.task_to_update = null
          this.active_multi_select_key = null
          this.selected_user = null
        }, 500)
      },
      setActiveMultiSelect (key, task) {
        this.selected_user = null
        this.active_multi_select_key = null

        this.active_multi_select_key = key
        this.task_to_update = task
      },
      removeActiveSelect () {
        this.active_multi_select_key = null
        this.selected_user = null
      },
      /**
       * Not sure if there's an api for updating item order on the server
       */
      updateDraggableTasks (e) {
        let cloned_tasks = []
        let i = -1

        this.tasks.forEach(item => {
          cloned_tasks.push(item)
        })

        //console.log(e)
        let updated_tasks = this.moveArray(cloned_tasks, e.moved.oldIndex, e.moved.newIndex) 
        this.SET_TASKS(updated_tasks)
      },
      moveArray (arr, old_index, new_index) {
        if (new_index >= arr.length) {
            let k = new_index - arr.length + 1
            while (k--) {
                arr.push(undefined)
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
        return arr; 
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
    &__close-users {
      position: absolute;
      z-index: 1000;
      width: 25px;
      top: -9px;
      right: -10px;
      transition: var(--fast-transition);
      cursor: pointer;
      &:hover {
        transform: scale(1.2);
      }
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
        transition: var(--fast-transition);
        &:hover {
          transform: scale(1.2);
        }

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
      transition: var(--fast-transition);
      &:hover {
        transform: scale(1.2);
      }
    }
    &__icon-check {
      margin-right: 10px;
      width: 20px;
      cursor: pointer;
    }
    &__icon-uncheck {
      width: 20px;
      cursor: pointer;
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