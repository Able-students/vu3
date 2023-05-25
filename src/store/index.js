import { createStore } from 'vuex';
import countModule from './countModule';
import calcModule from './calculatorModule';

const store = createStore({
    modules: {
        calcModule,
        countModule
    }
})

export default store;