import ApiService from '@/services/api.service'
import configMapPath from '@/services/configMapPath'

export default {
    async get() {
        try {
            return await ApiService.get(configMapPath.fetchManagement)
        } catch(e) {
            return e.response
        }
    },

    async add(payload) {
        try {
            const addmanagement = await ApiService.post(configMapPath.managements_add, payload)
            if(addmanagement.status) {
                try {
                    return Object.assign(await ApiService.get(configMapPath.fetchManagement))
                } catch(e) {
                    return e.response
                }
            }
        } catch(e) {
            return e.response
        }
    },

    async edit(id, payload) {
        try {
            const editmanagement = await ApiService.put(`${configMapPath.editManagement}/${id}`, payload)
            if(editmanagement.status) {
                try {
                    return Object.assign(await ApiService.get(configMapPath.fetchManagement))
                } catch(e) {
                    return e.response
                }
            }
        } catch(e) {
            return e.response
        }
    },
    async delete(id) {
        try {
            const delmanagement = await ApiService.delete(`${configMapPath.deleteManagement}/${id}`)
            if(delmanagement.status) {
                try {
                    return Object.assign(await ApiService.get(configMapPath.fetchManagement), {'delete_action' : delmanagement})
                } catch(e) {
                    return e.response
                }
            }
        } catch(e) {
            return e.response
        }
    }
}