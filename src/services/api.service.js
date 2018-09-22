import Vue from 'vue'

const ApiService = {
    async get(resource) {
        return await Vue.axios.get(resource)
    },
    
    async getId(path, id) {
        return await Vue.axios.get(`${path}/${id}`)
    },

    async post(path, params) {
        return await Vue.axios.post(`${path}`, params)
    },
  
    async update(path, id, params) {
        return await Vue.axios.put(`${path}/${id}`, params)
    },
  
    async put(path, params) {
        return await Vue.axios.put(`${path}`, params)
    },
  
    async delete(path) {
        return await Vue.axios.delete(path)
    }
}
export default ApiService