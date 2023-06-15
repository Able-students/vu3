<template>
    <div class="auth">
        <div class="btns">
            <span class="user" >{{ person?.user ? person?.user : 'User' }}</span>
            <!-- <select v-model="selected">
                <option disabled>Please select one</option>
                <option value="login">Login</option>
                <option value="register">Register</option>
                <option value="logout">Logout</option>
            </select> -->
            <button class="btn" @click="(e)=>modal(e)" v-if="!person.user">Login</button>
            <button class="btn" @click="(e)=>modal(e)" v-if="!person.user">Register</button>
            <button class="btn" @click="logout" v-else>Logout</button>
        </div>

        <div class="login-modal" v-if="loginModal">
            <div class="login-form">
                <input placeholder="Enter email*" v-model="email" type="email"/>
                <input placeholder="Enter pssword*" v-model="password" type="password"/>
                <div class="add-error">
                    <transition name="error">
                        <p v-if="error">{{ text }}</p>
                    </transition>
                </div>
                <button @click="login">Login</button>
                <img src="../assets/close.svg" alt=" close icon" @click="closeAll">
            </div>
            <div class="overlay" @click="closeAll"></div>
        </div>

        <div class="register-modal" v-if="registerModal">
            <div class="login-form">
                <input placeholder="Enter name" v-model="user" type="text"/>
                <input placeholder="Enter email*" v-model="email" type="email"/>
                <input placeholder="Enter pssword*" v-model="password" type="password"/>
                <div class="add-error">
                    <transition name="error">
                        <p v-if="error">{{ text }}</p>
                    </transition>
                </div>
                <button @click="register">Register</button>
                <img src="../assets/close.svg" alt=" close icon" @click="closeAll">
            </div>
            <div class="overlay" @click="closeAll"></div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
    import {useStore} from 'vuex';
    export default{
        name: 'AuthModal',
        setup(){
            const store = useStore();
            // const selected = ref('')
            const loginModal = ref(false)
            const registerModal = ref(false)
            const person = computed(()=>store.getters.getPerson)
            const filt = computed(()=>store.state.authModule.users)
            const error = ref(false);
            const user = ref('')
            const email = ref('');
            const password = ref('')
            let text = ref('')

            function login(){  
                if(email.value.length && password.value.length){
                    const data = {
                        email: email.value,
                        password: btoa(password.value) 
                    }
                    store.dispatch('loginUser',data)
                }else{
                    error.value =  true;
                    text.value = 'please enter email and pass'
                }
            }

            function register(){
                if(email.value.length && password.value.length){
                    console.log(filt.value.find(el=>el.email === email.value));
                    if(filt.value.find(el=>el.email === email.value)){
                        error.value = true
                        text.value = 'Email error'
                    }else{
                        const data = {
                            user: user.value,
                            email: email.value,
                            password: btoa(password.value),
                            id: randomHex() 
                        }  
                        store.dispatch('registerUser',data)
                        closeAll() 
                    }
                }else{
                    error.value =  true;
                    text.value = 'enter email and pass'
                }
            }

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
            }
            // watch(selected,(n)=>{
            //     switch(n){
            //         case 'login':
            //             registerModal.value = false;
            //             loginModal.value = true;
            //             break;
            //         case 'register':
            //             loginModal.value = false;
            //             registerModal.value = true;
            //             break;
            //         default:
            //             logout();
            //     }
            // })

            function closeAll(){
                loginModal.value = false;
                registerModal.value = false;
                error.value = false;
                user.value = '';
                email.value = '';
                password.value = '';
                text.value = '';
                if(error.value){
                    console.log('+');
                    store.commit('setPerson',{})
                }
            }

            watch(person, n=>{
                if(n == 'error'){
                    error.value = true;
                    text.value = 'error password'
                }
                if(n == 'noemail'){
                    error.value = true;
                    text.value = 'email not found' 
                }
                if(typeof n == 'object'){
                    closeAll()
                }          
            })

            function randomHex() {
                let arrHex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
                let arrN = [];
                for (let i = 0; i < 10; i++) {
                    let id = Math.floor(Math.random() * (15));
                    arrN.push(arrHex[id]);
                }
                return arrN.join('');
            }

            onMounted(()=>{
                store.dispatch('getUsers')
            })
            
            return {
                person,
                login,
                register,
                logout,
                modal,
                closeAll,
                randomHex,
                user,
                email,
                password,
                loginModal,
                registerModal,
                error,
                text,
                filt
                // selected
            }    
        }
    }
</script>
<style scoped>
    .login-modal,
    .register-modal{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }
    .overlay{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.457); 
        z-index: 5;
    }
    .login-form{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: grid;
        grid-gap: 10px;
        z-index: 10;
        background-color: aliceblue;
        padding: 40px 30px;
        min-width: 280px;
    }
    input{
        border: none;
        padding: 8px;
        outline: transparent;
    }
    button{
        padding: 12px;
        border: none;
        background-color: cornflowerblue;
        cursor: pointer;
        color: #fff;
        font-size: 18px;
    }
    img{
        position: absolute;
        top: 12px;
        right: 7px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
    .add-error{
        text-align: center;
        color: rgb(233, 53, 89);
        height: 20px;
    }
    .error-enter-active{
        height: 0;
        transition: 0.8s ease-out;
    }
    .error-enter-from{
        transform: translateY(-10px);
        opacity: 0;
    }
</style>