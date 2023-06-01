import { createStore } from 'vuex';
import countModule from './countModule';
import calcModule from './calculatorModule';
import contactModule from './contactsModule'
const store = createStore({
    modules: {
        calcModule,
        countModule,
        contactModule
    }
})

export default store;