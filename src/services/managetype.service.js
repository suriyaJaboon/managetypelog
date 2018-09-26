import ApiService from '@/services/api.service'
import configMapPath from '@/services/configMapPath'

export default {
    async get() {
        try {
            return await ApiService.get()
        } catch(e) {
            return e.response
        }
    },

    async delete(id) {
        try {
            const delmanagement = await ApiService.delete(id)
            if(delmanagement.status) {
                try {
                    return await Object.assign(await ApiService.get(), {'delete_action' : delmanagement})
                } catch(e) {
                    return e.response
                }
            }
        } catch(e) {
            return e.response
        }
    }
}