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
          <h3 v-if="options.isAction === 'delete'" class="title is-4">{{options.message}}</h3>
          <!-- Add -->
            <!-- <div v-if="options.isAction === 'add'">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input v-model="typelog.name" class="input" type="text" placeholder="Name">
                  <span class="icon is-small is-left">
                    <i class="fa fa-terminal"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fa fa-check"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input v-model="typelog.owner" class="input" type="text" placeholder="Owner">
                  <span class="icon is-small is-left">
                    <i class="fa fa-terminal"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fa fa-check"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input v-model="typelog.port" class="input" type="number" placeholder="Port">
                  <span class="icon is-small is-left">
                    <i class="fa fa-terminal"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fa fa-check"></i>
                  </span>
                </p>
              </div>
            </div> -->
            <!-- Edit -->
            <div v-if="options.isAction === 'edit' || options.isAction === 'add'">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input v-model="options.value.name" class="input" type="text" placeholder="Name">
                  <span class="icon is-small is-left">
                    <i class="fa fa-terminal"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fa fa-check"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input v-model="options.value.owner" class="input" type="text" placeholder="Owner">
                  <span class="icon is-small is-left">
                    <i class="fa fa-terminal"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fa fa-check"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input v-model="options.value.port" class="input" type="number" placeholder="Port">
                  <span class="icon is-small is-left">
                    <i class="fa fa-terminal"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fa fa-check"></i>
                  </span>
                </p>
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
        owner: null,
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
              owner: this.options.value.owner,
              port: this.options.value.port,
            }
            await this.$store.dispatch(this.options.actionType, add_typelog)
            break

          case 'edit':
            add_typelog = {
              name: this.options.value.name,
              owner: this.options.value.owner,
              port: this.options.value.port
            }
            break

          case 'delete':
            await this.$store.dispatch(this.options.actionType, this.options.value)
            this.onAlert(this.data.delete_actions.success, this.data.delete_actions.message_delete)
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
        this.$vueOnToast.pop("success", `${message}`, 'successfully')                      
      } else {
        this.$vueOnToast.pop("error", `${message}`, 'failure')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
