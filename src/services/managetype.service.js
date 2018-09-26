import ApiService from '@/services/api.service'

export default {
    async get(payload) {
        return await ApiService.get(payload)
    },

    async delete(payload) {
        return await ApiService.delete(payload)
    }
}