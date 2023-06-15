import { createStore } from 'vuex';
import countModule from './countModule';
import calcModule from './calculatorModule';
import contactModule from './contactsModule';
import authModule from './authModule';
const store = createStore({
    modules: {
        calcModule,
        countModule,
        contactModule,
        authModule
    }
})

export default store;