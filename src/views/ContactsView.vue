<template>
   <div class="contacts">
        <h4>My contacts</h4>
        <button @click="openModal = true">Add contact</button>
        <AddContact v-show="openModal" @closeModal="openModal = false"/>
        <input placeholder="Search contact" />
        <ol>
            <li v-for="item in contacts" class="contact-card">
                <h3>Name: {{ item.name }}</h3>
                <p>Phone number: {{ item.phone }}</p>
                <p>Address: {{ item.address }}</p>
            </li>
        </ol>
   </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex';
import AddContact from '../components/AddContact.vue'
export default {
    name: 'Contacts',
    components: { AddContact },
    setup(props, {emit}){
        const openModal = ref(false)
        const store = useStore()
        const contacts = computed(() => store.state.contactModule.contacts)
        console.log(contacts);
        onMounted(() => {
            store.dispatch('getContacts')
        })
        return {
            openModal,
            contacts
        }
    }
}
</script>

<style scoped>
.contact-card{
    margin: 20px;
}
</style>