import managetypelog from '@/services/managetype.service'
import * as typeActions from '@/stores/types/action-types'
import * as typeMutations from '@/stores/types/mutation-types'
import * as typeGetters from '@/stores/types/getter-types'

const initialState = {
    managements: null,
    errors: null
}

export const state = Object.assign({}, initialState)
export const actions = {
    async [typeActions.FETCH_MANAGEMENT](context, payload) {
        try {
            const manages = await managetypelog.get(payload)
            return await context.commit(typeMutations.SET_MANAGEMENT_SUCCESS, manages.data)
        } catch(e) {
            return await context.commit(typeMutations.SET_MANAGEMENT_FAILURE, e)
        }
    },
    async [typeActions.DELETE_MANAGEMENT](context, payload) {
        try {
            const manages = await managetypelog.delete(payload)
            return await context.commit(typeMutations.SET_MANAGEMENT_SUCCESS, manages.data)
        } catch(e) {
            return await context.commit(typeMutations.SET_MANAGEMENT_FAILURE, e)
        }
    }
}

export const mutations = {
    [typeMutations.SET_MANAGEMENT_SUCCESS](state, data) {
        return Object.assign(state, {
            managements: data.data,
                errors: null
        })
    },
    [typeMutations.SET_MANAGEMENT_FAILURE](state, error) { 
        return Object.assign(state, {
            managements: null,
            errors: Object.assign({'status': error.response.status, 'message': error.response.statusText, 'url': error.response.config.url})
        })
    }
}

export const getters = {
    [typeGetters.GET_MANAGEMENT](state) {
        return state
    }
}

export default {
    state,
    actions,
    mutations,
    getters
  }