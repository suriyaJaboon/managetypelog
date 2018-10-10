<template>
  <div class="modal" v-bind:class="{'is-active': (onValue) ? onValue.isActive : false}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;{{(onValue) ? onValue.action : null}}</p>
        <button @click="onClose" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <!-- Content ... -->
        {{onValue}}
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success is-small is-outlined">
          <i class="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;Save
        </button>
        <button @click="onClose" class="button is-small is-danger is-outlined">
          <i class="fa fa-times" aria-hidden="true"></i>&nbsp;Cancel
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalValue',
  data() {
    return {}
  },
  props: {
    msg: String,
    onValue: {
      type: Object,
      default: null
    }
  },
  mounted() {
    // this.onValue.isActive = false
  },
  methods: {
    onClose() {
      this.onValue.isActive = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
