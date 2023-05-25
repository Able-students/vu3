import axios from 'axios';
export default {
    namespaced: true,
    state: {
        text: 'hello world',
        list: []
    },
    mutations: {
        setList(state, data){
            state.list = data
        }
    },
    getters: {
        getCount: (state) => {
            return state.text
        }
    },
    actions: {
        loadData(context){
            fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                context.commit('setList', data?.products)
            });
            // let res = await axios.get('https://dummyjson.com/products')
            // context.commit('setList', { val: res.data.products })
        }
    }
}