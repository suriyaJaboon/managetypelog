import Vue from 'vue'

const ApiService = {
    async get(resource) {
        try {
            return await Vue.axios.get(resource)
        } catch(e) {
            return e
        }
    },
    
    async getId(path, id) {
        try {
            return await Vue.axios.get(`${path}/${id}`)
        } catch(e) {
            return e
        }
    },

    async post(path, params) {
        try {
            return await Vue.axios.post(`${path}`, params)
        } catch(e) {
            return e
        }
    },
  
    async update(path, id, params) {
        try {
            return await Vue.axios.put(`${path}/${id}`, params)
        } catch(e) {
            return e
        }
    },
  
    async put(path, params) {
        try {
            return await Vue.axios.put(`${path}`, params)
        } catch(e) {
            return e
        }
    },
  
    async delete(path) {
        try {
            return await Vue.axios.delete(path)
        } catch(e) {
            return e
        }
    }
}
export default ApiService