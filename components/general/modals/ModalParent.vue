<template>
  <div class="popup">
    <div class="popup__backdrop"></div>
    <div class="popup__content">
      <div class="popup__main-body">
        <div class="popup__header">
          <span class="popup__title">
            {{ modal.title }}
          </span>

          <img 
            class="popup__close-button"
            src="/images/close-red.svg" 
            alt="close-button"
            @click="closeModal"
          >
        </div>
        <div class="popup__body">
          <body-modal 
            v-show="modal.type == 'body'"
            :modal="modal"
          />
          <edit-task-modal 
            v-show="modal.type == 'edit-task'"
          />
        </div>
        <div 
          class="popup__footer"
          v-if="modal.show_buttons"
        >
          <button 
            @click="closeModal"
            class="popup__button popup__button--cancel"
          >
            CANCEL
          </button>
          <button
            @click="proceed"
            class="popup__button popup__button--proceed"
          >
            PROCEED
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        modal: 'modals/getModal'
      })
    },
    methods: {
      ...mapMutations({
        SET_MODAL: 'modals/SET_MODAL'
      }),
      setModalStatus (modal) {
        this.SET_MODAL(modal)
      },
      closeModal () {
        let new_modal = Object.assign({}, ({
          ...this.modal,
          opened: false
        }))
        this.setModalStatus(new_modal)
      },
      proceed () {
        switch (this.modal.type) {
          case 'body':
            this.delete()
            break
          case 'edit-task':
            this.update()
            break
          default:
            break
        }
      },
      delete () {
        this.$axios.delete(`${this.modal.api}`)
        .then(response => {
          this.$nuxt.$emit('display-swal', ({
            title: 'Success', 
            type: 'success',
            icon: 'success',
            text: 'The task has been deleted successfully',
            timer: 5000
          }))
          this.closeModal()
          setTimeout(() => {
            this.$nuxt.$emit('fetch-tasks')
          }, 200)
        }).catch(err => {
          console.log(err)
        })
      },
      update () {
        this.$nuxt.$emit('proceed-update-task')
      }
    }
  }
</script>

<style lang="scss">
  .popup {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    
    &__backdrop {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      background-color: var(--theme-gray-900);
      opacity: 0.8;
      z-index: 1;
    }

    &__content {
      position: relative;
      z-index: 9999;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      border-bottom: 1px solid var(--border-color);
    }

    &__close-button {
      width: 40px;
      cursor: pointer;
      transition: var(--fast-transition);
      &:hover {
        transform: scale(1.2);
      }
    }

    &__main-body {
      width: 500px;
      background-color: var(--theme-white);
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 10px 20px;
      border-top: 1px solid var(--border-color);
    }

    &__button {
      padding: 10px 20px;
      text-align: center;
      transition: var(--fast-transition);
      border: 1px solid transparent;
      color: var(--theme-white);

      &--cancel {
        margin-right: 20px;
        background-color: var(--theme-danger);
        &:hover {
          background-color: var(--theme-white);
          color: var(--theme-danger);
          border: 1px solid var(--theme-danger);
        }
      }
      &--proceed {
        background-color: var(--theme-success);
        &:hover {
          color: var(--theme-success);
          background-color: var(--theme-white);
          border: 1px solid var(--theme-success);
        }
      }
    }
  }
</style>