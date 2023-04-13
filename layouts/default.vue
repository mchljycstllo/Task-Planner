<template>
  <div>
    <nuxt />
    <modal-parent 
      v-if="modal.opened"
    />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        modal: 'modals/getModal'
      })
    }
  }
</script>

<style>
:root {
  --theme-primary: #E83E8C;
  --theme-white: #FFF;
  --theme-bg-white: #F9FAFC;
  --theme-gray-100: #F3F4F7;
  --theme-gray-200: #E8E9EE;
  --theme-gray-900: #3A3B45;
  --theme-danger: #ff4e66;
  --border-color: #E6E6E6;
  --theme-success: #14A44D;
  --max-width: 980px;
  --content-padding: 0 20px;
  --fast-transition: .2s ease-in-out;
}
.no-outline:focus {
  outline: none;
}


html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

ul {
  padding: 0;
  list-style-type: none;
}

a,
a:hover {
  text-decoration: none;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
