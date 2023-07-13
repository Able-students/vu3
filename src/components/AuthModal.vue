<template>
       <div class="register-modal" >
            <div class="login-form">
                <input placeholder="Enter name" v-if="type === 'register'" v-model="user" type="text"/>

                <input placeholder="Enter email*" v-model="email" type="email"/>
                <input placeholder="Enter pssword*" v-model="password" type="password"/>
                <div class="add-error">
                    <transition name="error">
                        <p v-if="error">{{ text }}</p>
                    </transition>
                </div>
                <button @click="type === 'login' ? login() : register() ">{{ type }}</button>
                <img src="../assets/close.svg" alt=" close icon" @click="closeAll">
            </div>
            <Calculator name="name" />
            <div class="overlay" @click="closeAll"></div>
        </div>
</template>

<script>
import Calculator from './Calculator.vue';
import { ref, computed, watch, inject } from 'vue'
import { useStore } from 'vuex';
import { useTestData } from '../hooks/hooks.js'

export default{
    name: "AuthModal",
    emits: ["close"],
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    components: [Calculator],
    setup(props, { emit }) {
        const type = props.type;
        const store = useStore();
        const { data, printText } = useTestData()
        printText('AuthModal printText')

        const person = computed(() => store.getters.getPerson);
        const filt = computed(() => store.state.authModule.users);
        const error = ref(false);
        const user = ref("");
        const email = ref("");
        const password = ref("");

        const test = inject('testInfo2', 0);
       // console.log(test,'--test');

        let text = ref("");
        function login() {
            if (email.value.length && password.value.length) {
                const data = {
                    email: email.value,
                    password: btoa(password.value)
                };
                store.dispatch("loginUser", data);
            }
            else {
                error.value = true;
                text.value = "please enter email and pass";
            }
        }
        function register() {
            if (email.value.length && password.value.length) {
             
                if (filt.value.find(el => el.email === email.value)) {
                    error.value = true;
                    text.value = "Email error";
                }
                else {
                    const data = {
                        user: user.value,
                        email: email.value,
                        password: btoa(password.value),
                    };
                    store.dispatch("registerUser", data);
                    closeAll();
                }
            }
            else {
                error.value = true;
                text.value = "enter email and pass";
            }
        }
        function closeAll() {
            emit("close");
            error.value = false;
            user.value = "";
            email.value = "";
            password.value = "";
            text.value = "";
            if (error.value) {
                store.commit("setPerson", {});
            }
        }
        watch(person, n => {
            if (n == "error") {
                error.value = true;
                text.value = "error password";
            }
            if (n == "noemail") {
                error.value = true;
                text.value = "email not found";
            }
            if (typeof n == "object") {
                closeAll();
            }
        });
        return {
            type,
            person,
            login,
            register,
            closeAll,
            user,
            email,
            password,
            error,
            text,
            filt
            // selected
        };
    },
    components: { Calculator }
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