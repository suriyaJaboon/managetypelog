import managetypelog from '@/services/managetype.service'
import * as typeActions from '@/stores/types/action-types'
import * as typeMutations from '@/stores/types/mutation-types'
import * as typeGetters from '@/stores/types/getter-types'

const initialState = {
    managements: null,
    add_actions: null,
    edit_actions: null,
    delete_actions: null,
    errors: null,
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
    async [typeActions.ADD_MANAGEMENT](context, payload) {
        const addManages = await managetypelog.add(payload)
        if((addManages.status === 200) && (addManages.statusText === 'OK')) {
            return await context.commit(typeMutations.ADD_MANAGEMENT_SUCCESS, addManages.data)
        } else {
            return await context.commit(typeMutations.ADD_MANAGEMENT_FAILURE, addManages)
        }
    },
    async [typeActions.EDIT_MANAGEMENT](context, payload) {
        const editManages = await managetypelog.edit(payload.id, payload.data)
        if((editManages.status === 200) && (editManages.statusText === 'OK')) {
            return await context.commit(typeMutations.EDIT_MANAGEMENT_SUCCESS, editManages.data)
        } else {
            return await context.commit(typeMutations.EDIT_MANAGEMENT_FAILURE, editManages)
        }
    },
    async [typeActions.DELETE_MANAGEMENT](context, id) {
        const deleteManages = await managetypelog.delete(id)
        if((deleteManages.status === 200) && (deleteManages.statusText === 'OK')) {
            let data = deleteManages.data.filter(data => data.id != id)
            return await context.commit(typeMutations.DELETE_MANAGEMENT_SUCCESS, data)
        } else {
            return await context.commit(typeMutations.DELETE_MANAGEMENT_FAILURE, deleteManages)
        }
    }
}

export const mutations = {
    [typeMutations.FETCH_MANAGEMENT_SUCCESS](state, datas) {
        return Object.assign(state, {
            managements: datas
        })
    },
    [typeMutations.FETCH_MANAGEMENT_FAILURE](state, errors) {
        return Object.assign(state, {
            errors: Object.assign({'status': errors.status, 'message': errors.statusText, 'url': errors.config.url})
        })
    },
    [typeMutations.ADD_MANAGEMENT_SUCCESS](state, datas) {
        return Object.assign(state, {
            managements: datas,
            add_actions: Object.assign({ 'success': true, 'message': 'Add'})
        })
    },
    [typeMutations.ADD_MANAGEMENT_FAILURE](state, errors) {
        return Object.assign(state, {
            errors: Object.assign({'status': errors.status, 'message': errors.statusText, 'url': errors.config.url})
        })
    },
    [typeMutations.EDIT_MANAGEMENT_SUCCESS](state, datas) {
        return Object.assign(state, {
            managements: datas,
            edit_actions: Object.assign({ 'success': true, 'message': 'Edit'})
        })
    },
    
    [typeMutations.EDIT_MANAGEMENT_FAILURE](state, errors) {
        return Object.assign(state, {
            errors: Object.assign({'status': errors.status, 'message': errors.statusText, 'url': errors.config.url})
        })
    },
    [typeMutations.DELETE_MANAGEMENT_SUCCESS](state, datas) {
        return Object.assign(state, {
            managements: datas,
            delete_actions: Object.assign({ 'success': true, 'message': 'Delete'})
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