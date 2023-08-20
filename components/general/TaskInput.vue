<template>
  <div class="task-input">
    <validation-observer
      tag="div" 
      ref="form"
      class="'task-input__content-wapper'"
    >
      <form
        @submit.prevent="submitTask()"
        class="task-input__form"
        data-task-input-form
      >
        <validation-provider
          name="task"
          :rules="{ required: true, max: 300 }"
          v-slot="{ errors }"
        >
          <div class="task-input__form-row">
            <img
              :src="`${input_state.icon}`"
              alt="icon"
              class="task-input__icon"
            >
            <input
              class="task-input__text-input no-outline"
              name="title"
              type="text"
              :placeholder="`${input_state.placeholder}`"
              @focus="changePlaceholder('focus')"
              @blur="changePlaceholder('blur')"
              v-model="form_data.title"
            >
          </div>
          <span 
            class="task-input__error"
            v-if="errors.length > 0 && show_error"
          > {{ errors[0] }}</span>
        </validation-provider>
      </form>
      <label
        for="input"
        class="task-input__label"
      >
        Press <b @click="submitTask()" class="hover">enter</b> to {{ edit_task ? 'edit' : 'add' }} task
      </label>
    </validation-observer>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    props: {
      page_location: {
        type: String,
        default: '' //homepage, tasks-page
      },
      edit_task: {
        type: Boolean,
        default: false
      },
      task: {
        type: Object,
        default: () => {}
      }
    },
    data: ({ task }) => ({
      input: {
        original_state: {
          placeholder: `What's your plan today?`,
          icon: `/images/plus-icon.svg`
        },
        focused_state: {
          placeholder: `Try typing "Submit report by Friday 3 PM"`,
          icon: `/images/circle-icon.svg`
        }
      },
      input_state: {
        placeholder: `What's your plan today?`,
        icon: `/images/plus-icon.svg`
      },
      form_data: {
        title: task ? task.title : ''
      },
      show_error: true
    }),
    methods: {
      ...mapMutations({
        SET_MODAL: 'modals/SET_MODAL'
      }),
      submitTask () {
        this.$refs.form.validate().then(success => {
          if (!success) {
            this.show_error = true
            return
          }

          if (this.edit_task) {
            let updated_task = Object.assign({}, ({
              ...this.task,
              title: this.form_data.title
            }))

            this.$axios.put(`tasks/${this.task.id}`, updated_task)
            .then(response => {
              this.$nuxt.$emit('display-swal', ({
                title: 'Success', 
                type: 'success',
                icon: 'success',
                text: 'The task has been updated successfully',
                timer: 5000
              }))
              this.$nuxt.$emit('fetch-tasks')
              this.SET_MODAL({
                opened: false
              })
            })
            .catch(err => {
              console.log(err)
            })
          }
          else {
            this.$axios.post('tasks', this.form_data)
            .then(response => {
              this.$nuxt.$emit('display-swal', ({
                title: 'Success', 
                type: 'success',
                icon: 'success',
                text: 'Task has been added.',
                timer: 5000
              }))
              /**
               * check whether redirect or not
               */
              this.clearForm()
              this.checkLocation()
            }).catch(err => {
              console.log(err)
            })
          }
        })
      },
      clearForm () {
        let form = document.querySelector('[data-task-input-form]')
        form.reset()
        this.form_data.title = ''
        setTimeout(() => {
          this.show_error = false
        }, 0)
        //this.form_data.title = null
      },
      checkLocation () {
        if (this.page_location == 'homepage') this.$router.push('/tasks')
        else this.$nuxt.$emit('fetch-tasks')
      },
      changePlaceholder (status) {
        if(status == 'focus') this.input_state = this.input.focused_state
        else this.input_state = this.input.original_state
      }
    },
    mounted () {
      this.$nuxt.$on('proceed-update-task', () => {
        this.submitTask()
      })
    },
    destroyed () {
      this.$nuxt.$off('proceed-update-task')
    }
  }
</script>

<style lang="scss">
  .task-input {
    &__form-row {
      display: flex;
      padding: 10px 20px;
      margin: 0 0 10px;
      width: 100%;
      background-color: var(--theme-gray-100);
    }
    &__icon {
      margin-right: 15px;
      width: 20px;
    }
    &__text-input {
      width: 100%;
      border: none;
      background-color: var(--theme-gray-100);
    }
    &__error {
      display: block;
      margin-bottom: 10px;
      color: var(--theme-danger);
      font-weight: bold;
    }
    &__label b {
      color: var(--theme-primary);
    }
  }
</style>