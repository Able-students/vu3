export default {
    namespaced: true,
    state: {
        count: 10000,
        text: 'hello world'
    },
    mutations: {
        increaseCount(state){
            state.count++
        },
        decreaseCount(state){
            state.count--
        },
        setCount(state, value){
            state.count = value
        }
    },
    getters: {
        getCount: (state) => {
            return state.count 
        }
    },
    actions: {
        setCountAndGet(context, value){
            context.commit('setCount', value);
            return context.state.count // context.getters.getCount
        }
    }
}