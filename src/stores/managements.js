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
        return await context.commit(typeMutations.SET_MANAGEMENT, await managetypelog.get(payload))
    }
}

export const mutations = {
    [typeMutations.SET_MANAGEMENT](initialState, data) {
        if(data.status === 200 && data.data.length > 0) {
            return Object.assign(state, {
                managements: data.data,
                errors: null
            })
        } else {
            return Object.assign(state, {
                managements: null,
                errors: Object.assign(data.response.data, {'status': data.response.status})
            })
        }
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