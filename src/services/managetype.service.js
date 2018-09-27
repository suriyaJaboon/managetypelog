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

    async delete(id) {
        try {
            const delmanagement = await ApiService.delete(`${configMapPath.managements}/${id}`)
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