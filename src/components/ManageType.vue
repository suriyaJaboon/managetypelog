<template>
  <section class="">
    <div style="">
    <div v-if="data.errors !== null" class="notification is-danger">
      <p><i class="fa fa-lg fa-server" aria-hidden="true"></i>&nbsp; {{ data.errors.message }}</p>
    </div>
      <div v-if="data.errors === null" class="field">
        <div class="card">
          <header class="card-header">
            <div class="card-header-title">
              <div class="is-pulled-left">
                <i class="fa fa-2x fa-cogs" aria-hidden="true"></i> 
                <b> Channel Managements</b>
              </div>
            </div>
            <!-- <div class="level-right">
              <button @click="onAdd" class="button is-small is-success is-outlined" v-tooltip="repo.add">
                <i class="fa fa-lg fa-plus-circle" aria-hidden="true"></i>
              </button>
            </div> -->
            &nbsp;
          </header>
          <div class="card-content">
            <div class="content">
              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <table class="table">
                      <thead>
                        <tr>
                          <th style="width:50%">Name</th>
                          <th style="width:20%">Port</th>
                          <th style="width:20%">Option</th>
                          <th class="buttons has-addons is-centered">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="managements in data.managements" :key="managements.id">
                          <th>{{ managements.name }}</th>
                          <td>{{ managements.port }}</td>
                          <td>
                            <a v-if="managements.status === '1'" class="button is-small is-success is-outlined is-rounded" v-tooltip="repo.disable" @click="deleteAction(managements.id)">
                              <i class="fa fa-check" aria-hidden="true"></i>&nbsp; Enable
                            </a>
                            <a v-if="managements.status === '0'" class="button is-small is-danger is-outlined is-rounded" v-tooltip="repo.enable" @click="deleteAction(managements.id)">
                              <i class="fa fa-times" aria-hidden="true"></i>&nbsp; Disable
                            </a>
                          </td>
                          <td>
                            <div class="buttons has-addons is-centered">
                              <button class="button is-small is-info is-outlined"  v-tooltip="repo.edit" @click="onEdit(managements.id)">
                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                              </button>
                              <!-- <button class="button is-small is-danger is-outlined" v-tooltip="repo.delete" @click="onDelete(managements.id)">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                              </button> -->
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalValue :options="action_Options"> </ModalValue>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import * as ActionsType from '@/stores/types/action-types.js'
import { GET_MANAGEMENT } from '@/stores/types/getter-types.js'
import ModalValue from '@/components/ModalValue'

export default {
  name: "ManageType",
  components: { 
    ModalValue  
  },
  data() {
    return {
      datatable: null,
      action_Options: null, 
      repo: {
        total: "",
        delete: '<i class="is-primary fa fa-trash" aria-hidden="true"></i> Delete',
        edit: '<i class="is-info fa fa-pencil-square-o" aria-hidden="true"></i> Edit',
        add: '<i class="fa fa-plus-circle" aria-hidden="true"></i> Add',
        enable: '<i class="fa fa-check" aria-hidden="true"></i> Enable',
        disable: '<i class="fa fa-times" aria-hidden="true"></i> Disable'
      }
    };
  },
  mounted() {
    this.$store.dispatch(ActionsType.FETCH_MANAGEMENT)
    // this.fetch()
  },
  computed: {
    ...mapGetters({data: [GET_MANAGEMENT]}),
  },
  methods: {
    // async fetch() {
    //   const {data:{data}} = await ApiService.get(configMapPath.fetchManagement)
    //   this.datatable = data
    // },
    onAdd: async function(id) {
      this.action_Options = Object.assign({
        isActive: true,
        isAction: 'add',
        actionType: `${ActionsType.ADD_MANAGEMENT}`,
        actionIcon: 'fa fa-plus-circle',
        actionButton: {
          btn: 'button is-success is-small is-outlined',
          icon: 'fa fa-plus-circle',
          msg: 'Add'
        },
        message: 'Add TypeLogs',
        actionName: 'Add TypeLogs', 
        value: id
      })
    },
    onDelete: async function(id) {
      this.action_Options = Object.assign({
        isActive: true,
        isAction: 'delete',
        actionType: `${ActionsType.DELETE_MANAGEMENT}`,
        actionIcon: 'fa fa-trash',
        actionButton: {
          btn: 'button is-success is-small is-outlined',
          icon: 'fa fa-trash',
          msg: 'Delete'
        },
        message: {
          header: 'Are you sure ?',
          body: 'Removing direcotry logs'
        },
        actionName: 'Delete TypeLogs', 
        value: id
      })
    },
    onEdit: function(id) {
      let action_edit = this.data.managements.filter(data => data.id === id)
      this.action_Options = Object.assign({
        isActive: true,
        isAction: 'edit',
        actionType: `${ActionsType.EDIT_MANAGEMENT}`,
        actionIcon: 'fa fa-pencil-square-o',
        actionButton: {
          btn: 'button is-success is-small is-outlined',
          icon: 'fa fa-floppy-o',
          msg: 'Save'
        },
        actionName: 'Edit TypeLogs', 
        value: action_edit[0]
      })
    },
    deleteAction: async function(id) {
      await this.$store.dispatch(ActionsType.DELETE_MANAGEMENT, id)
      this.onAlert(this.data.delete_actions.success, this.data.delete_actions.message)
    },
    onAlert(state, message) {
      if(state) {
        this.$vueOnToast.pop("success", `${message} successfully`)                      
      } else {
        this.$vueOnToast.pop("error", `${message} failure`)
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .tooltip {
    display: block !important;
    z-index: 10000;
  }
  
  .tooltip .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }
  
  .tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }
  
  .tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }
  
  .tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }
  
  .tooltip[x-placement^="bottom"] {
    margin-top: 5px;
  }
  
  .tooltip[x-placement^="bottom"] .tooltip-arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }
  
  .tooltip[x-placement^="right"] {
    margin-left: 5px;
  }
  
  .tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent !important;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }
  
  .tooltip[x-placement^="left"] {
    margin-right: 5px;
  }
  
  .tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }
  
  .tooltip.popover .popover-inner {
    background: #f9f9f9;
    color: black;
    padding: 24px;
    border-radius: 5px;
    box-shadow: 0 5px 30px rgba(black, .1);
  }
  
  .tooltip.popover .popover-arrow {
    border-color: #f9f9f9;
  }
  
  .tooltip[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }
  
  .tooltip[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
</style>
