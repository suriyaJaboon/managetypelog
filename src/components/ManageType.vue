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
                <i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;Add
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
                                <i class="fa fa-trash" aria-hidden="true"></i> &nbsp; Delete
                              </button>
                              <button class="button is-small is-info is-outlined"  v-tooltip="repo.edit">
                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp; Edit
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
import { mapGetters } from "vuex";
// import VueOnToast from 'vue-on-toast'
import * as ActionsType from "@/stores/types/action-types.js";
import { GET_MANAGEMENT } from "@/stores/types/getter-types.js";

export default {
  name: "ManageType",
  components: {},
  data() {
    return {
      repo: {
        url: "/groups",
        total: "",
        delete:
          '<span class="is-primary"><i class="fa fa-lg fa-trash" aria-hidden="true"></i></span',
        edit:
          '<i class="is-info fa fa-lg fa-pencil-square-o" aria-hidden="true"></i>',
        add: '<i class="fa fa-lg fa-plus-circle" aria-hidden="true"></i>'
      }
    };
  },
  mounted() {
    this.$vueOnToast.pop("success", "Toast Title", "Popped from Vue instance");
    this.$store.dispatch(
      ActionsType.FETCH_MANAGEMENT,`${this.repo.url}?_dc=1537930816282`
    );
  },
  computed: {
    ...mapGetters({
      data: [GET_MANAGEMENT]
    })
  },
  methods: {
    deleteManagetype: function(id) {
      // this.$store.dispatch(ActionsType.DELETE_MANAGEMENT, `${this.repo.url}/${id}`)
      console.log('id', id)
      const del = this.data.managements.filter(management => {
        if (management.group_id !== id) {
          console.log(management.group_id)
          this.$vueOnToast.pop('success', 'Toast Title', 'Popped from Vue instance');
        } else {
          this.$vueOnToast.pop('error', 'Toast Title', 'Popped from Vue instance');
        }
      });
      console.log(del)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
