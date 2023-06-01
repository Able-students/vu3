<template>
    <div class="modal">
        <div class="modal-content">
            <div class="add-contact">
                <input placeholder="Enter name" v-model="name" />
                <input placeholder="Enter phone" v-model="phone" />
                <input placeholder="Enter address" v-model="address" />
                <button @click="addContact">Add</button>
            </div>
        </div>
        <div class="overlay"></div>
    </div>
  
 </template>
 
 <script>
 import { ref } from 'vue';
 import { useStore } from 'vuex';
 export default {
     name: 'AddContact',
     setup(props, { emit }){
        const name = ref('')
        const phone = ref('')
        const address = ref('')
        const store = useStore()
        function addContact(){
            let data = {
                name: name.value,
                phone: phone.value,
                address: address.value
            }
            console.log(data);
            store.dispatch('addContacts',data)
            emit('closeModal')
        }
         return {
            addContact,
            name,
            phone,
            address
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
    background-color: rgba(0, 0, 0, 0.457); 
}
.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: aliceblue;
    padding: 30px;
    width: 20%;
}
.add-contact {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
input {
    border: none;
    padding: 8px;
}
button {
    padding: 12px;
    border: none;
    background-color: cornflowerblue;
}
</style>