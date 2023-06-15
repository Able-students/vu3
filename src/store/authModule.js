export default {
    state: {
        users: [],
        person: {}
    },
    getters: {
        getUsers: state => state.users,
        getPerson: state => state.person
    },
    mutations: {
        setUsers(state, value) {
            state.users = value
        },
        setPerson(state) {
            state.person = {}
        }
    },
    actions: {
        getUsers({ commit }) {
            fetch('http://localhost:3000/users')
                .then(res => res.json())
                .then(data => {
                    commit('setUsers', data)
                })
        },
        registerUser({ dispatch }, data) {
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(data => {
                    dispatch('getUsers')
                })
        },
        loginUser({ state }, user) {
            fetch('http://localhost:3000/users?email=' + user.email)
                .then(res => res.json())
                .then(data => {
                    if (data[0].password === user.password) {
                        state.person = data[0];
                    } else {
                        state.person = 'error'
                    }
                }).catch(error => {
                    state.person = 'noemail'
                    return console.log(error)
                })
        }

    }
}