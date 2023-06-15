export default {
    state: {
        users: [],
        person: {}
    },
    getters: {
        getUsers: state => state.users,
        getPerson: state => state.person,
        randomHex: () => {
            let arrHex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
            let arrN = [];
            for (let i = 0; i < 10; i++) {
                let id = Math.floor(Math.random() * (15));
                arrN.push(arrHex[id]);
            }
            return arrN.join('');
        },
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
        registerUser({ dispatch, getters }, data) {
            data.id = getters.randomHex
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