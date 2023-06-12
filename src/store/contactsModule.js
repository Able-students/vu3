export default {
    state: {
        contacts: []
    },
    getters: {
        contacts: (state) => state.contacts
    },
    mutations: {
        setContacts(state, value) {
            state.contacts = value
        }
    },
    actions: {
        getContacts({ commit }) {
            fetch('http://localhost:3000/contacts').then(res => res.json()).then(data => {
                commit('setContacts', data)
            })
        },
        addContacts({ dispatch }, data) {
            fetch('http://localhost:3000/contacts', {
                method: 'post', body: JSON.stringify(data), headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => res.json()).then(data => {
                dispatch('getContacts')
            })
        },
        deleteContacts({ dispatch }, id) {
            fetch('http://localhost:3000/contacts/' + id, { method: 'delete' }).then(res => res.json()).then(data => {
                dispatch('getContacts')
            })
        }
    }
}