<template>
    <div class="auth">
        <div class="btns">
            {{ surname }}
            <span class="user" >{{ person?.user ? person?.user : 'User' }}</span>
            <button class="btn" @click="(e)=>modal(e)" v-if="!person.user">Login</button>
            <button class="btn" @click="(e)=>modal(e)" v-if="!person.user">Register</button>
            <button class="btn" @click="logout" v-else>Logout</button>
        </div>

        <AuthModal type="login" name="able" v-if="loginModal" @close="closeAll" />
        <AuthModal type="register" v-if="registerModal" @close="closeAll" />
        <Options />
    </div>
</template>

<script>
import AuthModal from './AuthModal.vue'
import { ref, onMounted, computed, provide } from 'vue'
import {useStore} from 'vuex';
import { useTestData } from './hooks.js'

    export default{
        name: 'Auth',
        components: { AuthModal },

        setup(){        
            const { data, printText } = useTestData()
            console.log(data,'--data');
            printText('Test data info')
            
            const store = useStore();
            const person = computed(()=>store.getters.getPerson)
            const loginModal = ref(false)
            const registerModal = ref(false)
            const able = ref('')
            provide('testInfo', {test: 'able'})
            provide('testInfo2', {test: 'able2'})

            function logout(){
                store.commit('setPerson')
                closeAll()
            }

            function modal(e){
             
                if(e.target.innerText === 'Login'){
                    loginModal.value = true;
                } 
                if(e.target.innerText === 'Register'){
                    registerModal.value = true;
                }
                console.log( loginModal.value, registerModal.value );
            }

            function closeAll(){
                loginModal.value = false;
                registerModal.value = false;
            }
    
            onMounted(()=>{
                store.dispatch('getUsers')
            })
            
            return {
                person,
                logout,
                modal,
                closeAll,
                loginModal,
                registerModal,
                able
            }    
        }
    }
</script>
<style scoped>
    button{
        padding: 12px;
        border: none;
        background-color: cornflowerblue;
        cursor: pointer;
        color: #fff;
        font-size: 18px;
    }
</style>