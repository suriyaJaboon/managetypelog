import managetypelog from '@/services/managetype.service'
import * as typeActions from '@/stores/types/action-types'
import * as typeMutations from '@/stores/types/mutation-types'
import * as typeGetters from '@/stores/types/getter-types'

const initialState = {
    managements: null,
    errors: null,
    delete_actions: null
}

export const state = Object.assign({}, initialState)
export const actions = {
    async [typeActions.FETCH_MANAGEMENT](context) {
        const fetchManages = await managetypelog.get()
        if((fetchManages.status === 200) && (fetchManages.statusText === 'OK')) {
            return await context.commit(typeMutations.FETCH_MANAGEMENT_SUCCESS, fetchManages.data)
        } else {
            return await context.commit(typeMutations.FETCH_MANAGEMENT_FAILURE, fetchManages)
        }
    },
    async [typeActions.DELETE_MANAGEMENT](context, id) {
        const deleteManages = await managetypelog.delete(id)
        if((deleteManages.status === 200) && (deleteManages.statusText === 'OK')) {
            return await context.commit(typeMutations.DELETE_MANAGEMENT_SUCCESS, deleteManages.data)
        } else {
            return await context.commit(typeMutations.DELETE_MANAGEMENT_FAILURE, deleteManages)
        }
    }
}

export const mutations = {
    [typeMutations.FETCH_MANAGEMENT_SUCCESS](state, datas) {
        return Object.assign(state, {
            managements: datas.data
        })
    },
    [typeMutations.FETCH_MANAGEMENT_FAILURE](state, errors) {
        return Object.assign(state, {
            errors: Object.assign({'status': errors.status, 'message': errors.statusText, 'url': errors.config.url})
        })
    },
    [typeMutations.DELETE_MANAGEMENT_SUCCESS](state, datas) {
        return Object.assign(state, {
            managements: datas.data
        })
    },
    [typeMutations.DELETE_MANAGEMENT_FAILURE](state, errors) {
        return Object.assign(state, {
            delete_actions: Object.assign({'status': errors.status, 'message': errors.statusText, 'url': errors.config.url})
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