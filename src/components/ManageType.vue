<template>
  <section class="container is-fluid card">
    <div class="notification">
      <div class="is-pulled-left">
        <i class="fa fa-2x fa-cogs" aria-hidden="true"></i> 
        <b> ManageTypeLogs</b>
      </div>
      <div class="is-clearfix"></div>
      <div class="field" v-for="managements in data.managements" :key="managements.id">
        <div class="card">
          <header class="card-header">
            <div class="card-header-title"> Component &nbsp;
              <span class="tag is-black"> {{ managements.login }} </span>
            </div>
            <div class="level-right">
              <button class="button is-small is-danger is-outlined" v-tooltip="repo.delete">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
              <button class="button is-small is-info is-outlined"  v-tooltip="repo.edit">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
            </div>
            &nbsp;
          </header>
          <div class="card-content">
            <div class="content">
              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>{{ managements.login}}</strong>
                      <br>
                      <small>Repository </small>
                      <a  v-bind:href="managements.repos_url">{{ managements.repos_url }}</a>
                    </p>
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
import { mapGetters } from 'vuex'
import { FETCH_MANAGEMENT } from '@/stores/types/action-types.js'
import { GET_MANAGEMENT } from '@/stores/types/getter-types.js'

export default {
  name: 'ManageType',
  components: {},
  data() {
    return {
      repo: {
        name: '/users',
        url: '',
        total: '',
        delete: '<span class="is-primary"><i class="fa fa-lg fa-trash" aria-hidden="true"></i></span',
        edit: '<i class="is-info fa fa-lg fa-pencil-square-o" aria-hidden="true"></i>'
      }
    }
  },
  mounted () {
    this.$store.dispatch(FETCH_MANAGEMENT, `${this.repo.name}`)
  },
  computed: {
    ...mapGetters({
      data: [GET_MANAGEMENT]
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
