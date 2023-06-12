<template>
    <div class="modal">
        <div class="modal-content">
            <div class="add-contact">
                <input placeholder="Enter name*" v-model="name" />
                <input placeholder="Enter phone*" v-model="phone" />
                <input placeholder="Enter address" v-model="address" />
                <div class="add-error">
                    <transition name="error">
                        <p v-if="error">Plese enter name and phone</p>
                    </transition>
                </div>
                <button @click="addContact">Add</button>
                <img src="https://www.iconarchive.com/download/i45224/kyo-tux/delikate/Close.ico" alt=" close icon" @click="closeAll">
            </div>
        </div>
        <div class="overlay" @click="closeAll"></div>
    </div>
 </template>
 
 <script>
 import { ref } from 'vue';
 import { useStore } from 'vuex';
 export default {
     name: 'AddContact',
     setup(props, { emit }){
        let error = ref(false)
        const name = ref('')
        const phone = ref('')
        const address = ref('')
        const store = useStore()
        
        function addContact(){
            if(name.value.length && phone.value.length){
                let data = {
                    name: name.value,
                    phone: phone.value,
                    address: address.value
                }
                // console.log(data);
                store.dispatch('addContacts',data)
                closeAll()
            }else{
                error.value =  true;
            }
        }
        function closeAll() {
            emit('closeModal')
            name.value=''
            phone.value=''
            address.value=''
            error.value = false
        }
         return {
            addContact,
            closeAll,
            name,
            phone,
            address,
            error
         }
     }
 }
 </script>
 
 <style scoped>
.modal{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    
}
.overlay{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.457);  
}
.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: aliceblue;
    padding: 40px 30px;
    width: 20%;
    z-index: 2;
}

.add-contact {
    display: flex;
    flex-direction: column;
    gap: 20px;
    
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
input {
    border: none;
    padding: 8px;
}
button {
    padding: 12px;
    border: none;
    background-color: cornflowerblue;
    cursor: pointer;
}
img{
    position: absolute;
    top: 12px;
    right: 7px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
</style>