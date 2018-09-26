<template>
  <section class="container is-fluid card">
    <div class="notification">
    <div v-if="data.errors !== null" class="notification is-danger">
      <p><i class="fa fa-lg fa-server" aria-hidden="true"></i>&nbsp; {{ data.errors.message }}</p>
    </div>
      <div v-if="data.errors === null" class="field">
        <div class="card">
          <header class="card-header">
            <div class="card-header-title">
              <div class="is-pulled-left">
                <i class="fa fa-2x fa-cogs" aria-hidden="true"></i> 
                <b> ManageTypeLogs</b>
              </div>
            </div>
            <div class="level-right">
              <button class="button is-small is-success is-outlined" v-tooltip="repo.add">
                <i class="fa fa-lg fa-plus-circle" aria-hidden="true"></i>
              </button>
            </div>
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
                          <th>Name</th>
                          <th>Owner</th>
                          <th>Subscription</th>
                          <th>Number of Source</th>
                          <th>Number of Source Extra</th>
                          <th>EPS</th>
                          <th>EPS Extra</th>
                          <th>Storage (GB)</th>
                          <th>Storage Extra (Gb)</th>
                          <th>Port</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="managements in data.managements" :key="managements.id">
                          <th>{{ managements.name }}</th>
                          <td>{{ managements.owner }}</td>
                          <td>{{ managements.subscription_name }}</td>
                          <td>{{ managements.numofsource }}</td>
                          <td>{{ managements.numofsource_extra }}</td>
                          <td>{{ managements.eps }}</td>
                          <td>{{ managements.eps_extra }}</td>
                          <td>{{ managements.storage }}</td>
                          <td>{{ managements.storage_extra }}</td>
                          <td>{{ managements.port }}</td>
                          <td>
                            <div class="buttons has-addons is-centered">
                              <button class="button is-small is-danger is-outlined" v-tooltip="repo.delete" v-on:click="deleteManagetype(managements.group_id)">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                              </button>
                              <button class="button is-small is-info is-outlined"  v-tooltip="repo.edit">
                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                              </button>
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
  </section>
</template>

<script>
import { mapGetters } from "vuex"
import * as ActionsType from "@/stores/types/action-types.js"
import { GET_MANAGEMENT } from "@/stores/types/getter-types.js"

export default {
  name: "ManageType",
  components: {},
  data() {
    return {
      message: 'Message',
      count : 0,
      repo: {
        url: "/groups",
        total: "",
        delete: '<i class="is-primary fa fa-trash" aria-hidden="true"></i> Delete',
        edit: '<i class="is-info fa fa-pencil-square-o" aria-hidden="true"></i> Edit',
        add: '<i class="fa fa-plus-circle" aria-hidden="true"></i> Add'
      }
    };
  },
  mounted() {
    this.$store.dispatch(ActionsType.FETCH_MANAGEMENT)
  },
  computed: {
    ...mapGetters({
      data: [GET_MANAGEMENT]
    })
  },
  methods: {
    deleteManagetype: function(id) {
      this.$store.dispatch(ActionsType.DELETE_MANAGEMENT, id)
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
