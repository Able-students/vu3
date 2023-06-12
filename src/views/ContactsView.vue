<template>
   <main class="contacts">
        <h2 class="title">My contacts</h2>
        <div class="top">
            <input placeholder="Search contact" v-model="searchText"/>
            <button @click="openModal = true">Add contact +</button>
        </div>
        <transition name="modal">
            <AddContact v-show="openModal" :contact="editedContact" @closeModal="closeModal" />
        </transition> 
        <ol @click="e => userId(e.target)" class="list">
            <li v-for="item in contacts" class="contact-card" :data-id='item.id' >
                <h3>Name: {{ item.name }}</h3>
                <p>Phone number: {{ item.phone }}</p>
                <p>Address: {{ item.address }}</p>
            </li>
        </ol>
        <transition name="modal">
           <div class="modal-variant" v-if="variant">
                <div class="modal-inner">
                    <h3 class="title">Edit and delete user</h3>
                    <button class="btn" @click="userDel">Delete</button>
                    <button class="btn" @click="userEdit">Edit</button>
                    <button class="close" @click="closeVariant">x</button>
                </div>
                <div class="overlay" @click="closeVariant"></div>
            </div>  
        </transition>
   </main>
</template>

<script>
import { ref, onMounted, reactive, watch, watchEffect } from 'vue'
import { useStore } from 'vuex';
import AddContact from '../components/AddContact.vue'
export default {
    name: 'Contacts',
    components: { AddContact },
    setup(props, {emit}){
        const openModal = ref(false)
        const variant = ref(false)
        const editedContact = ref({})
        const store = useStore()
        const searchText = ref('')
        const myStoredValue = reactive(localStorage.getItem('contact'))
        const contacts = ref(store.state.contactModule.contacts)
       
        const id = ref('');
        function userId(e) {
            let li = e.closest('li'); 
            if(li){
                id.value = li.dataset.id; 
                variant.value = true;
            }  
        }
        function closeVariant(){
            variant.value = false;
        }
        function userDel() {
            if(id.value.length){
                store.dispatch('deleteContacts',id.value)
                id.value = '' 
                closeVariant()
            }
        }
        function userEdit(){
            closeVariant()
            openModal.value = true
            console.log(id.value);
            editedContact.value = contacts.value.find(elem => elem.id === +id.value)
            localStorage.setItem("contact", JSON.stringify( editedContact.value));
            console.log(editedContact.value);
        }
        function closeModal(){
            openModal.value = false
            editedContact.value = {}
        }
        watch(searchText, (n) => {
            console.log(myStoredValue.value,'--myStoredValue');    
            store.dispatch('searchContacts', searchText.value)
        })
    
        onMounted(() => {
            store.dispatch('getContacts')
            // window.addEventListener('storage', (event) => {
            //     console.log(event,'--event');
            //     if (event.key === 'contact') {
            //         myStoredValue.value = event.newValue;
            //     }
            // })
        })
       
        return {
            userId,
            userDel,
            closeVariant,
            openModal,
            variant,
            contacts,
            userEdit,
            closeModal,
            editedContact,
            searchText,
            id
        }
    }
}
</script>

<style scoped>
.contacts{
    padding: 20px; 

}
.modal-variant{
    position: fixed;
    top: 0;
    left: 0;
    right:0; 
    bottom: 0;
}

.modal-inner{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 20px;
    border: 1px solid;
    z-index: 20;
    background-color: #fff;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px 15px;
}
.modal-inner h3{
    grid-column: 1/3;
}
.overlay{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #8181814d;
    z-index: 10;
}
.close{
    position: absolute;
    top: 10px;
    right: 10px;
}
.top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: cadetblue;
    margin: 0 -20px;
}
.top *{
    padding: 8px 15px;
    border-radius: 10px;
    border: none;
    outline: transparent;
    cursor: pointer;
    font-size: 18px;
}
.top button{
    background-color: bisque;

}
.list{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px,220px));
    list-style: none;
    grid-gap: 20px;
    padding: 0;
    margin: 20px 0;
}
.contact-card{
    border: 1px solid green;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.modal-enter-active{
    transition: all 0.8s ease-in-out;
}
.modal-leave-active{
    transition: all 0.3s ease-out;
}

.modal-enter-from,
.modal-leave-to{
    opacity: 0;
}
.title{
    text-align: center;
    margin: 20px;
}
</style>