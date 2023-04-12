<template>
  <div class="task-input">
    <form @submit.prevent="submitTask()">
      <input 
        name="title"
        type="text"
        :placeholder="`${input_state.placeholder}`"
        @focus="changePlaceholder('focus')"
        @blur="changePlaceholder('blur')"
        v-model="form_data.title"
      >
      <label 
        for="input"
      >
        Press <b>enter</b> to add task
      </label>
    </form>
  </div>
</template>

<script>
  export default {
    props: {
      page_location: {
        type: String,
        default: 'homepage' //homepage, tasks-page
      }
    },
    data: () => ({
      input: {
        original_state: {
          placeholder: `What's your plan today?`,
        },
        focused_state: {
          placeholder: `Try typing "Submit report by Friday 3 PM"`
        }
      },
      input_state: {
        placeholder: `What's your plan today?`
      },
      form_data: {
        title: ''
      }
    }),
    methods: {
      submitTask () {
        this.$axios.post('tasks', this.form_data)
        .then(response => {
          /**
           * check whether redirect or not
           */
          this.checkLocation()
        }).catch(err => {
          console.log(err)
        })
      },
      checkLocation () {
        if (this.page_location == 'homepage') this.$router.push('/tasks')
        else this.$nuxt.$emit('fetcha-all-tasks')
      },
      changePlaceholder (status) {
        if(status == 'focus') this.input_state = this.input.focused_state
        else this.input_state = this.input.original_state
      }
    }
  }
</script>