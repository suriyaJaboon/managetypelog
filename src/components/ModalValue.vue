<template>
  <div>
    <div class="modal" v-bind:class="{'is-active': options.isActive}" v-if="options">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title"><i :class="options.actionIcon" aria-hidden="true"></i>&nbsp;{{options.actionName}}</p>
          <button @click="onClose" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div v-if="options.isAction === 'delete'" class="card">
            <p class="title is-5">{{options.message.header}}</p>
            <small>{{options.message.body}}</small>
          </div>
          <div v-if="options.isAction === 'edit' || options.isAction === 'add'">
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Name</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control has-icons-left has-icons-right">
                    <input v-model="options.value.name" class="input" type="text" placeholder="Name">
                    <span class="icon is-small is-left">
                      <i class="fa fa-terminal"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label">Option</label>
              </div>
              <div class="field-body">
                <div class="field is-narrow">
                  <div class="control">
                    <label class="radio">
                      <input type="radio" id="1" v-model="options.value.status" value="1"/>
                      <small class="has-text-success"> enable</small>
                    </label>
                    <label class="radio">
                      <input type="radio" id="0" v-model="options.value.status" value="0"/>
                      <small class="has-text-danger"> disable</small>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">TypeLog</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control has-icons-left has-icons-right">
                    <input v-model="options.value.port" class="input" type="number" placeholder="Port" disabled>
                    <span class="icon is-small is-left">
                      <i class="fa fa-terminal"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button :class="options.actionButton.btn" @click="onAction">
            <i :class="options.actionButton.icon" aria-hidden="true"></i>&nbsp;{{options.actionButton.msg}}
          </button>
          <button @click="onClose" class="button is-small is-danger is-outlined">
            <i class="fa fa-times" aria-hidden="true"></i>&nbsp;Cancel
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import * as ActionsType from '@/stores/types/action-types.js'
import { GET_MANAGEMENT } from '@/stores/types/getter-types.js'
export default {
  name: 'ModalValue',
  data() {
    return {
      typelog: {
        name: null,
        option: null,
        port: null
      },
    }
  },
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters({data: [GET_MANAGEMENT]}),
  },
  mounted() {
    // this.$store.dispatch(ActionsType.FETCH_MANAGEMENT)
  },
  methods: {
    async onAction() {
      if(await this.options) {
        var add_typelog
        switch(this.options.isAction) {
          case 'add':
            add_typelog = {
              name: this.options.value.name,
              port: this.options.value.port,
            }
            await this.$store.dispatch(this.options.actionType, add_typelog)
            this.onAlert(this.data.add_actions.success, this.data.add_actions.message)
            break

          case 'edit':
            add_typelog = {
              name: this.options.value.name,
              status: this.options.value.status,
              port: this.options.value.port
            }
            await this.$store.dispatch(this.options.actionType, {id: this.options.value.id, data: add_typelog})
            this.onAlert(this.data.edit_actions.success, this.data.edit_actions.message)
            break

          case 'delete':
            await this.$store.dispatch(this.options.actionType, this.options.value)
            this.onAlert(this.data.delete_actions.success, this.data.delete_actions.message)
            break

          default:
        }
      }
      this.options.isActive = false
    },
    onClose() {
      this.options.isActive = false
    },
    onAlert(state, message) {
      if(state) {
        this.$vueOnToast.pop("success", `${message} successfully`)                      
      } else {
        this.$vueOnToast.pop("error", `${message} failure`)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
